<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud-admin.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\service\core\niucloud;

use app\model\addon\Addon;
use app\service\core\addon\CoreAddonDevelopDownloadService;
use app\service\core\addon\CoreAddonInstallService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use core\util\niucloud\CloudService;
use think\facade\Cache;

/**
 * 应用管理服务层
 */
class CoreCloudBuildService extends BaseCoreService
{
    private $cache_key = 'cloud_build_task';

    private $build_task;

    public function __construct()
    {
        parent::__construct();
        $this->root_path = project_path();
        $this->build_task = Cache::get($this->cache_key);
        $this->auth_code = (new CoreNiucloudConfigService())->getNiucloudConfig()['auth_code'] ?? '';
    }

    /**
     * 编译前环境检测
     * @return array|array[]
     */
    public function buildPreCheck() {
        $niucloud_dir = $this->root_path . 'niucloud' . DIRECTORY_SEPARATOR;
        $admin_dir = $this->root_path . 'admin' . DIRECTORY_SEPARATOR;
        $web_dir = $this->root_path . 'web' . DIRECTORY_SEPARATOR;
        $wap_dir = $this->root_path . 'uni-app' . DIRECTORY_SEPARATOR;

        try {
            if (!is_dir($admin_dir)) throw new CommonException('ADMIN_DIR_NOT_EXIST');
            if (!is_dir($web_dir)) throw new CommonException('WEB_DIR_NOT_EXIST');
            if (!is_dir($wap_dir)) throw new CommonException('UNIAPP_DIR_NOT_EXIST');
        } catch (\Exception $e) {
            if (strpos($e->getMessage(), 'open basedir') !== false) {
                throw new CommonException('OPEN_BASEDIR_ERROR');
            }
            throw new CommonException($e->getMessage());
        }

        $data = [
            // 目录检测
            'dir' => [
                // 要求可读权限
                'is_readable' => [],
                // 要求可写权限
                'is_write' => []
            ]
        ];

        $data['dir']['is_readable'][] = ['dir' => str_replace(project_path(), '', $niucloud_dir), 'status' => is_readable($niucloud_dir)];
        $data['dir']['is_readable'][] = ['dir' => str_replace(project_path(), '', $admin_dir), 'status' => is_readable($admin_dir)];
        $data['dir']['is_readable'][] = ['dir' => str_replace(project_path(), '', $web_dir), 'status' => is_readable($web_dir)];
        $data['dir']['is_readable'][] = ['dir' => str_replace(project_path(), '', $wap_dir), 'status' => is_readable($wap_dir)];

        $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $niucloud_dir), 'status' => is_write($niucloud_dir) ];
        $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $admin_dir), 'status' => is_write($admin_dir) ];
        $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $web_dir), 'status' => is_write($web_dir) ];
        $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $wap_dir), 'status' => is_write($wap_dir) ];

        $check_res = array_merge(
            array_column($data['dir']['is_readable'], 'status'),
            array_column($data['dir']['is_write'], 'status')
        );

        // 是否通过校验
        $data['is_pass'] = !in_array(false, $check_res);
        return $data;
    }

    /**
     * 云编译
     * @param $addon
     * @return void
     */
    public function cloudBuild() {
        if ($this->build_task) throw new CommonException('CLOUD_BUILD_TASK_EXIST');

        // 上传任务key
        $task_key = uniqid();
        // 此次上传任务临时目录
        $temp_dir = runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'cloud_build' . DIRECTORY_SEPARATOR . $task_key . DIRECTORY_SEPARATOR;
        $package_dir = $temp_dir . 'package' . DIRECTORY_SEPARATOR;
        dir_mkdir($package_dir);

        // 拷贝composer文件
        file_put_contents($package_dir . 'composer.json', file_get_contents(root_path() . 'composer.json'));
        // 拷贝手机端文件
        $wap_is_compile = (new Addon())->where([ ['compile', 'like', '%wap%'] ])->field('id')->findOrEmpty();
        if ($wap_is_compile->isEmpty()) {
            dir_copy($this->root_path . 'uni-app', $package_dir . 'uni-app', exclude_dirs:['node_modules', 'unpackage', 'dist']);
        }
        // 拷贝admin端文件
        $admin_is_compile = (new Addon())->where([ ['compile', 'like', '%admin%'] ])->field('id')->findOrEmpty();
        if ($admin_is_compile->isEmpty()) {
            dir_copy($this->root_path . 'admin', $package_dir . 'admin', exclude_dirs:['node_modules', 'dist', '.vscode', '.idea']);
        }
        // 拷贝web端文件
        $web_is_compile = (new Addon())->where([ ['compile', 'like', '%web%'] ])->field('id')->findOrEmpty();
        if ($web_is_compile->isEmpty()) {
            dir_copy($this->root_path . 'web', $package_dir . 'web', exclude_dirs:['node_modules', '.output', '.nuxt']);
        }

        $zip_file = $temp_dir . DIRECTORY_SEPARATOR . 'build.zip';
        (new CoreAddonDevelopDownloadService(''))->compressToZip($package_dir, $zip_file);

        $query = [
            'authorize_code' => $this->auth_code,
            'timestamp' => time()
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

        $this->build_task = [
            'task_key' => $task_key,
            'timestamp' => $query['timestamp']
        ];
        Cache::set($this->cache_key, $this->build_task);

        return $this->build_task;
    }

    /**
     * 获取编译任务
     * @return mixed
     */
    public function getBuildTask() {
        return $this->build_task;
    }

    /**
     * 获取编译执行日志
     * @return void
     */
    public function getBuildLog() {
        if (!$this->build_task) return;

        $query = [
            'authorize_code' => $this->auth_code,
            'timestamp' => $this->build_task['timestamp']
        ];
        $build_log = (new CloudService())->httpGet('cloud/get_build_logs?' . http_build_query($query));

        if (isset($build_log['data']) && isset($build_log['data'][0]) && is_array($build_log['data'][0])) {
            $last = end($build_log['data'][0]);
            if ($last['percent'] == 100 && $last['code'] == 1) {
                $build_log['data'][0] = $this->buildSuccess($build_log['data'][0]);
            }
        }
        return $build_log;
    }

    /**
     * 编译完成
     * @param array $log
     * @return array
     */
    public function buildSuccess(array $log) {
        try {
            $query = [
                'authorize_code' => $this->auth_code,
                'timestamp' => $this->build_task['timestamp']
            ];
            $chunk_size = 1 * 1024 * 1024;
            $temp_dir = runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'cloud_build' . DIRECTORY_SEPARATOR . $this->build_task['task_key'] . DIRECTORY_SEPARATOR;

            if (!isset($this->build_task['index'])) {
                $response = (new CloudService())->request('HEAD','cloud/build_download?' . http_build_query($query), [
                    'headers' => ['Range' => 'bytes=0-']
                ]);
                $length = $response->getHeader('Content-range');
                $length = (int)explode("/", $length[0])[1];
                $step = (int)ceil($length / $chunk_size);

                $this->build_task = array_merge($this->build_task, ['step' => $step, 'index' => 0, 'length' => $length]);
                Cache::set($this->cache_key, $this->build_task);
            } else {
                $zip_file = $temp_dir . 'download.zip';
                $zip_resource = fopen($zip_file, 'a');

                if (($this->build_task['index'] + 1) <= $this->build_task['step']) {
                    $start = $this->build_task['index'] * $chunk_size;
                    $end = ($this->build_task['index'] + 1) * $chunk_size;
                    $end = min($end, $this->build_task['length']);

                    $response = (new CloudService())->request('GET','cloud/build_download?' . http_build_query($query), [
                        'headers' => ['Range' => "bytes={$start}-{$end}"]
                    ]);
                    fwrite($zip_resource, $response->getBody());
                    fclose($zip_resource);

                    $this->build_task['index'] += 1;
                    Cache::set($this->cache_key, $this->build_task);

                    $log[] = [ 'code' => 1, 'action' => '编译包下载中,已下载' . round($this->build_task['index'] / $this->build_task['step'] * 100) . '%', 'percent' => '100' ];
                } else {
                    // 解压文件
                    $zip = new \ZipArchive();

                    if ($zip->open($zip_file) === true) {
                        dir_mkdir($temp_dir . 'download');
                        $zip->extractTo($temp_dir . 'download');
                        $zip->close();

                        if (is_dir($temp_dir . 'download' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'admin')) {
                            del_target_dir(public_path() .'admin', true);
                        }
                        if (is_dir($temp_dir . 'download' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'web')) {
                            del_target_dir(public_path() .'web', true);
                        }
                        if (is_dir($temp_dir . 'download' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'wap')) {
                            del_target_dir(public_path() .'wap', true);
                        }

                        dir_copy($temp_dir . 'download', root_path());

                        // 处理编译之后的文件
                        (new CoreAddonInstallService(''))->handleBuildFile();

                        $this->clearTask();
                    } else {
                        $log[] = [ 'code' => 0, 'msg' => '编译包解压失败', 'action' => '编译包解压', 'percent' => '100' ];
                    }
                }
            }
        } catch (\Exception $e) {
            $log[] = [ 'code' => 0, 'msg' => $e->getMessage(), 'action' => '', 'percent' => '100' ];
            $this->clearTask();
        }
        return $log;
    }

    /**
     * 清除任务
     * @return void
     */
    public function clearTask() {
        if (!$this->build_task) return;
        $temp_dir = runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'cloud_build' . DIRECTORY_SEPARATOR . $this->build_task['task_key'] . DIRECTORY_SEPARATOR;;
        @del_target_dir($temp_dir, true);
        Cache::set($this->cache_key, null);
    }
}
