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

namespace app\service\core\weapp;

use app\dict\addon\AddonDict;
use app\dict\sys\CloudDict;
use app\model\addon\Addon;
use app\model\weapp\WeappVersion;
use app\service\core\addon\CoreAddonDevelopDownloadService;
use app\service\core\addon\WapTrait;
use app\service\core\niucloud\CoreCloudBaseService;
use app\service\core\site\CoreSiteService;
use core\exception\CommonException;
use core\util\niucloud\CloudService;

/**
 * 微信小程序云服务
 * Class CoreWeappAuthService
 * @package app\service\core\weapp
 */
class CoreWeappCloudService extends CoreCloudBaseService
{
    private $site_id;

    private $addon;

    private $addon_path;

    use WapTrait;

     public function __construct()
     {
         parent::__construct();
         $this->root_path = dirname(root_path()) . DIRECTORY_SEPARATOR;
         $this->addon_path = root_path() . 'addon' . DIRECTORY_SEPARATOR;
     }

    /**
     * 上传小程序
     * @param $addon
     * @return void
     */
    public function uploadWeapp(array $data) {
        if (!request()->isSsl()) throw new CommonException('CURR_SITE_IS_NOT_OPEN_SSL');

        $this->site_id = $data['site_id'];
        $config = (new CoreWeappConfigService())->getWeappConfig($data['site_id']);
        if (empty($config['app_id'])) throw new CommonException('WEAPP_APPID_EMPTY');
        if (empty($config['upload_private_key'])) throw new CommonException('UPLOAD_KEY_EMPTY');
        if (!file_exists($config['upload_private_key'])) throw new CommonException('UPLOAD_KEY_NOT_EXIST');

        $compile_addon = (new Addon())->where([ ['compile', 'like', "%weapp%"] ])->field('key')->findOrEmpty();
        // 上传任务key
        $task_key = uniqid();
        // 此次上传任务临时目录
        $temp_dir = runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'weapp' . DIRECTORY_SEPARATOR . $task_key;
        // 小程序源码存放路径
        $package_dir = $temp_dir . DIRECTORY_SEPARATOR . 'package' . DIRECTORY_SEPARATOR;
        // uni
        $uni_dir = $package_dir . 'uni-app';

        // 如果不存在编译版小程序
        if ($compile_addon->isEmpty()) {
            dir_copy($this->root_path . 'uni-app', $uni_dir, exclude_dirs:['node_modules', 'unpackage', 'dist']);
            $this->handleUniapp($uni_dir);
            // 替换env文件
            $this->weappEnvReplace($uni_dir . DIRECTORY_SEPARATOR . '.env.production');
        } else {
            $compile_dir = $this->addonPath($compile_addon->key) . 'compile' . DIRECTORY_SEPARATOR . 'weapp';
            if (!is_dir($compile_dir)) throw new CommonException('CLOUD_WEAPP_COMPILE_NOT_EXIST');
            dir_copy($compile_dir, $uni_dir);
            $this->weappCompileReplace($uni_dir);
        }
        file_put_contents($package_dir . 'private.key', file_get_contents($config['upload_private_key']));

        // 将临时目录下文件生成压缩包
        $zip_file = $temp_dir . DIRECTORY_SEPARATOR . 'weapp.zip';
        (new CoreAddonDevelopDownloadService(''))->compressToZip($package_dir, $zip_file);

        $query = [
            'compile' => $compile_addon->isEmpty() ? 0 : 1,
            'authorize_code' => $this->auth_code,
            'appid' => $config['app_id'],
            'version' => $data['version'] ?? '',
            'desc' => $data['desc'] ?? '',
            'do' => 1,
            'timestamp' => time()
        ];
        $response = (new CloudService())->httpPost('cloud/weapp?' . http_build_query($query), [
            'multipart' => [
                [
                    'name'     => 'file',
                    'contents' => fopen($zip_file, 'r'),
                    'filename' => 'weapp.zip'
                ]
            ],
        ]);

        // 删除临时文件
        del_target_dir(runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'weapp', true);

        if (isset($response['code']) && $response['code'] == 0) throw new CommonException($response['msg']);

        return ['key' => $query['timestamp'] ];
    }

    /**
     * 处理uniapp 查询出站点没有的插件进行移除
     * @param string $dir
     * @return void
     */
    private function handleUniapp(string $dir) {
        $site_addon = (new CoreSiteService())->getAddonKeysBySiteId($this->site_id);
        $local_addon = (new Addon())->where([['status', '=', AddonDict::ON]])->column('key');

        // 移除uniapp中该站点没有的插件
        $diff_addon = array_filter(array_map(function ($key) use ($site_addon) {
            if (!in_array($key, $site_addon)) return $key;
        }, $local_addon));

        if (!empty($diff_addon) ) {
            foreach ($diff_addon as $addon) {
                $this->addon = $addon;

                $addon_dir = $dir . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . $addon;
                if (is_dir($addon_dir)) del_target_dir($addon_dir, true);

                // 编译 diy-group 自定义组件代码文件
                $this->compileDiyComponentsCode($dir . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $addon);
                // 编译 fixed-group 固定模板组件代码文件
                $this->compileFixedComponentsCode($dir . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $addon);
                // 编译 pages.json 页面路由代码文件
                $this->uninstallPageCode($dir . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR);
                // 编译 加载插件标题语言包
                $this->compileLocale($dir . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $addon);
            }
        }
    }

    /**
     * 小程序上传env文件处理
     * @param string $env_file
     * @return void
     */
    private function weappEnvReplace(string $env_file) {
        $env = file_get_contents($env_file);
        $env = str_replace("VITE_APP_BASE_URL=''", "VITE_APP_BASE_URL='" . (string)url('/api/', [], '', true) . "'", $env);
        $env = str_replace("VITE_IMG_DOMAIN=''", "VITE_IMG_DOMAIN='" . (string)url('/', [], '', true) . "'", $env);
        $env = str_replace("VITE_SITE_ID = ''", "VITE_SITE_ID='" . $this->site_id . "'", $env);
        file_put_contents($env_file, $env);
    }

    /**
     * 小程序上传vendor文件处理
     * @param string $vendor_file
     * @return void
     */
    private function weappCompileReplace(string $path) {
        // 替换request.js
        $request_file = $path . DIRECTORY_SEPARATOR . 'utils' . DIRECTORY_SEPARATOR . 'request.js';
        $content = file_get_contents($request_file);
        $content = str_replace('{{$baseUrl}}',  (string)url('/api/', [], '', true), $content);
        $content = str_replace('{{$siteId}}',  $this->site_id, $content);
        file_put_contents($request_file, $content);

        // 替换common.js
        $common_file = $path . DIRECTORY_SEPARATOR . 'utils' . DIRECTORY_SEPARATOR . 'common.js';
        $content = file_get_contents($common_file);
        $content = str_replace('{{$imgUrl}}',  (string)url('/', [], '', true), $content);
        file_put_contents($common_file, $content);
    }

    /**
     * 获取微信小程序预览码
     * @return void
     */
    public function getWeappPreviewImage() {
        $query = [
            'authorize_code' => $this->auth_code,
        ];
        $preview_url = (new CloudService())->getUrl('cloud/get_weapp_preview?' . http_build_query($query));

        try {
            $path = runtime_path() . uniqid() . '.jpg';
            file_put_contents($path, file_get_contents($preview_url));
            return image_to_base64($path, true);
        } catch (\Exception $e) {
            return '';
        }
    }

    /**
     * 获取小程序编译日志
     * @param string $timestamp
     * @return void
     */
    public function getWeappCompileLog(string $timestamp) {
        $query = [
            'authorize_code' => $this->auth_code,
            'timestamp' => $timestamp
        ];
        $build_log = (new CloudService())->httpGet('cloud/get_weapp_logs?' . http_build_query($query));

        if (isset($build_log['data']) && isset($build_log['data'][0]) && is_array($build_log['data'][0])) {
            $last = end($build_log['data'][0]);
            if ($last['code'] == 0) {
                (new WeappVersion())->update(['status' => CloudDict::APPLET_UPLOAD_FAIL, 'fail_reason' => $last['msg'] ?? '', 'update_time' => time() ], ['task_key' => $timestamp]);
                return $build_log;
            }
            if ($last['percent'] == 100) {
                (new WeappVersion())->update(['status' => CloudDict::APPLET_UPLOAD_SUCCESS, 'update_time' => time() ], ['task_key' => $timestamp]);
            }
        }
        return $build_log;
    }

    /**
     * 获取插件定义的package目录
     * @param string $addon
     * @return string
     */
    public function geAddonPackagePath(string $addon)
    {
        return $this->addon_path . $addon . DIRECTORY_SEPARATOR . 'package' . DIRECTORY_SEPARATOR;
    }
}
