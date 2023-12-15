<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\service\core\addon;

use app\model\addon\AddonDevelop;
use app\service\core\niucloud\CoreCloudBaseService;
use app\service\core\niucloud\CoreModuleService;
use core\exception\CommonException;
use core\util\niucloud\CloudService;
use GuzzleHttp\Client;
use GuzzleHttp\RequestOptions;
use think\facade\Cache;

/**
 */
class CoreAddonCloudService extends CoreCloudBaseService
{
    /**
     * 云编译
     * @param $addon
     * @return void
     */
    public function cloudBuild(string $addon) {
        // 上传任务key
        $task_key = uniqid();
        // 此次上传任务临时目录
        $temp_dir = runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'cloud_build' . DIRECTORY_SEPARATOR . $task_key . DIRECTORY_SEPARATOR;
        $package_dir = $temp_dir . 'package' . DIRECTORY_SEPARATOR;
        dir_mkdir($package_dir);

        $compile = (new CoreAddonService())->getAddonConfig($addon)['compile'] ?? [];

        $need_build = false;
        // 拷贝composer文件
        $composer_file = $this->addonPath($addon) . 'package' .  DIRECTORY_SEPARATOR . 'composer.json';
        if (file_exists($composer_file)) {
            file_put_contents($package_dir . 'composer.json', file_get_contents(root_path() . 'composer.json'));
            $need_build = true;
        }
        // 拷贝手机端文件
        if (!in_array('wap', $compile)) {
            dir_copy($this->root_path . 'uni-app', $package_dir . 'uni-app', exclude_dirs:['node_modules', 'unpackage', 'dist']);
            $need_build = true;
        }
        // 拷贝admin端文件
        if (!in_array('admin', $compile)) {
            dir_copy($this->root_path . 'admin', $package_dir . 'admin', exclude_dirs:['node_modules', 'dist', '.vscode', '.idea']);
            $need_build = true;
        }
        // 拷贝web端文件
        if (!in_array('web', $compile)) {
            dir_copy($this->root_path . 'web', $package_dir . 'web', exclude_dirs:['node_modules', '.output', '.nuxt']);
            $need_build = true;
        }

        if ($need_build) {
            // 将临时目录下文件生成压缩包
            $zip_file = $temp_dir . DIRECTORY_SEPARATOR . 'build.zip';
            (new CoreAddonDevelopDownloadService(''))->compressToZip($package_dir, $zip_file);

            $install_task = Cache::get('install_task');
            $query = [
                'authorize_code' => $this->auth_code,
                'timestamp' => $install_task['timestamp']
            ];
            $response = (new CloudService())->httpPost('cloud/build?' . http_build_query($query), [
                'multipart' => [
                    [
                        'name'     => 'file',
                        'contents' => fopen($zip_file, 'r'),
                        'filename' => 'build.zip'
                    ]
                ],
                'timeout' => 50.0
            ]);
            if (isset($response['code']) && $response['code'] == 0) throw new CommonException($response['msg']);

            // 删除临时文件
            del_target_dir($temp_dir, true);

            Cache::set('build_success_' . $addon, null);
        } else {
            (new CoreAddonInstallService($addon))->handleAddonInstall();
        }
        return true;
    }

    /**
     * 获取编译结果
     * @param string $addon
     * @return void
     */
    public function getBuildLog(string $addon) {
        try {
            $install_task = Cache::get('install_task');
            if (empty($install_task) || !isset($install_task['timestamp'])) return true;

            $query = [
                'authorize_code' => $this->auth_code,
                'timestamp' => $install_task['timestamp']
            ];
            $build_log = (new CloudService())->httpGet('cloud/get_build_logs?' . http_build_query($query));

            if (isset($build_log['data']) && isset($build_log['data'][0]) && is_array($build_log['data'][0])) {
                $last = end($build_log['data'][0]);
                if ($last['percent'] == 100 && $last['code'] == 0) {
                    (new CoreAddonInstallService($addon))->installExceptionHandle();
                    throw new CommonException('ADDON_INSTALL_FAIL');
                }
                if ($last['percent'] == 100) {
                    $build_log['data'][0] = $this->buildSuccess($addon, $build_log['data'][0], $install_task['timestamp']);
                }
            }
            return $build_log;
        } catch (\Exception $e) {
            $install_task = Cache::get('install_task');
            $install_task['error'] = $e->getMessage();
            Cache::set('install_task', $install_task, 10);
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 云编译成功
     * @param string $addon
     * @return void
     */
    public function buildSuccess(string $addon, array $log, $timestamp) {
        $query = [
            'authorize_code' => $this->auth_code,
            'timestamp' => $timestamp
        ];
        $chunk_size = 1 * 1024 * 1024;

        $cache = Cache::get('build_success_' . $addon);

        if (is_null($cache)) {
            $response = (new CloudService())->request('HEAD','cloud/build_download?' . http_build_query($query), [
                'headers' => ['Range' => 'bytes=0-']
            ]);
            $length = $response->getHeader('Content-range');
            $length = (int)explode("/", $length[0])[1];
            $step = (int)ceil($length / $chunk_size);

            // 下载任务key
            $task_key = uniqid();
            // 此次下载任务临时目录
            $temp_dir = runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'cloud_build' . DIRECTORY_SEPARATOR . $task_key . DIRECTORY_SEPARATOR;
            dir_mkdir($temp_dir);

            Cache::set('build_success_' . $addon, ['step' => $step, 'index' => 0, 'length' => $length, 'task_key' => $task_key]);
        } else {
            $temp_dir = runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'cloud_build' . DIRECTORY_SEPARATOR . $cache['task_key'] . DIRECTORY_SEPARATOR;
            $zip_file = $temp_dir . 'build.zip';
            $zip_resource = fopen($zip_file, 'a');

            if (($cache['index'] + 1) <= $cache['step']) {
                $start = $cache['index'] * $chunk_size;
                $end = ($cache['index'] + 1) * $chunk_size;
                $end = min($end, $cache['length']);

                $response = (new CloudService())->request('GET','cloud/build_download?' . http_build_query($query), [
                    'headers' => ['Range' => "bytes={$start}-{$end}"]
                ]);
                fwrite($zip_resource, $response->getBody());
                fclose($zip_resource);

                $cache['index'] += 1;
                Cache::set('build_success_' . $addon, $cache);

                $log[] = ['action' => '编译包下载中,已下载' . round($cache['index'] / $cache['step'] * 100) . '%', 'percent' => '100' ];
            } else {
                // 解压文件
                $zip = new \ZipArchive();
                if ($zip->open($zip_file) === true) {
                    dir_mkdir($temp_dir . 'build');
                    $zip->extractTo($temp_dir . 'build');
                    $zip->close();

                    if (is_dir($temp_dir . 'build' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'admin')) {
                        del_target_dir(public_path() .'admin', true);
                    }
                    if (is_dir($temp_dir . 'build' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'web')) {
                        del_target_dir(public_path() .'web', true);
                    }
                    if (is_dir($temp_dir . 'build' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'wap')) {
                        del_target_dir(public_path() .'wap', true);
                    }

                    dir_copy($temp_dir . 'build', root_path());

                    // 安装插件
                    (new CoreAddonInstallService($addon))->handleAddonInstall();

                    // 处理编译之后的文件
                    (new CoreAddonInstallService($addon))->handleBuildFile();

                    // 删除临时文件
                    @del_target_dir($temp_dir, true);

                    Cache::set('build_success_' . $addon, null);
                } else {
                    Cache::set('build_success_' . $addon, null);
                    // 调用插件安装异常处理
                    (new CoreAddonInstallService($addon))->installExceptionHandle();
                    throw new CommonException('Zip decompression failed');
                }
            }
        }
        return $log;
    }

    /**
     * 下载插件
     * @param string $addon
     * @param string $version
     * @return void
     */
    public function downloadAddon(string $addon, string $version) {
        $action_token = (new CoreModuleService())->getActionToken('download', ['data' => ['app_key' => $addon, 'version' => $version]]);
        if (isset($action_token['code']) && $action_token['code'] != 1) {
            if ($action_token['code'] == 401) $action_token = (new CoreModuleService())->getActionToken('download', ['data' => ['app_key' => $addon, 'version' => $version]]);
            if ($action_token['code'] != 1) throw new CommonException($action_token['msg']);
        }

        $query = [
            'authorize_code' => $this->auth_code,
            'addon_name' => $addon,
            'addon_version' => $version,
            'token' => $action_token['data']['token'] ?? ''
        ];
        // 获取文件大小
        $response = (new CloudService())->request('HEAD','cloud/download?' . http_build_query($query), [
            'headers' => ['Range' => 'bytes=0-']
        ]);
        $length = $response->getHeader('Content-range');
        $length = (int)explode("/", $length[0])[1];

        $temp_dir = runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'addon_download' . DIRECTORY_SEPARATOR . uniqid() . DIRECTORY_SEPARATOR;
        dir_mkdir($temp_dir);

        $zip_file = $temp_dir . $addon . '.zip';
        $zip_resource = fopen($zip_file, 'w');

        $response = (new CloudService())->request('GET','cloud/download?' . http_build_query($query), [
            'headers' => ['Range' => "bytes=0-{$length}"]
        ]);
        fwrite($zip_resource, $response->getBody());
        fclose($zip_resource);

        return $zip_file;
    }
}
