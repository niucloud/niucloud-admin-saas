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

namespace app\service\admin\sys;

use app\job\sys\CheckJob;
use app\service\core\sys\CoreConfigService;
use core\base\BaseAdminService;
use core\exception\CommonException;
use think\facade\Db;
use Throwable;

/**
 * 系统信息服务层
 * Class SystemService
 * @package app\service\admin\sys
 */
class SystemService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 获取版权信息(网站整体，不按照站点设置)
     * @return array
     */
    public function getInfo()
    {
        return [
            'os' => PHP_OS,
            'environment' => $_SERVER[ 'SERVER_SOFTWARE' ],
            'php_v' => PHP_VERSION,
            'version' => config('version')
        ];
    }

    /**
     * 获取域名配置
     */
    public function getUrl()
    {
        $wap_domain = !empty(env("system.wap_domain")) ? preg_replace('#/$#', '', env("system.wap_domain")) : request()->domain();
        $web_domain = !empty(env("system.web_domain")) ? preg_replace('#/$#', '', env("system.web_domain")) : request()->domain();

        return [
            'wap_domain' => env("system.wap_domain"),
            'wap_url' => $wap_domain . "/wap/" . $this->site_id,
            'web_url' => $web_domain . "/web/" . $this->site_id,
        ];
    }

    /**
     * 获取系统信息
     * @return array
     */
    public function getSystemInfo()
    {
        $server = [];
        $server[] = [ "name" => get_lang('dict_setting.server_system'), "server" => PHP_OS ];
        $server[] = [ "name" => get_lang('dict_setting.server_setting'), "server" => PHP_SAPI ];
        $server[] = [ "name" => get_lang('dict_setting.php_version'), "server" => PHP_VERSION];

        //环境权限
        $system_variables = [];
        //pdo
        $pdo = extension_loaded('pdo') && extension_loaded('pdo_mysql');
        $system_variables[] = [ "name" => "pdo", "need" => get_lang('dict_setting.php_authority_ask'), "status" => $pdo ];
        //curl
        $curl = extension_loaded('curl') && function_exists('curl_init');
        $system_variables[] = [ "name" => "curl", "need" => get_lang('dict_setting.php_authority_ask'), "status" => $curl ];
        //openssl
        $openssl = extension_loaded('openssl');
        $system_variables[] = [ "name" => "openssl", "need" => get_lang('dict_setting.php_authority_ask'), "status" => $openssl ];
        //gd
        $gd = extension_loaded('gd');
        $system_variables[] = [ "name" => "GD库", "need" => get_lang('dict_setting.php_authority_ask'), "status" => $gd ];
        //fileinfo
        $fileinfo = extension_loaded('fileinfo');
        $system_variables[] = [ "name" => "fileinfo", "need" => get_lang('dict_setting.php_authority_ask'), "status" => $fileinfo ];
        //目录权限
        $root_path = str_replace("\\", DIRECTORY_SEPARATOR, dirname(__FILE__, 5));
        $root_path = str_replace("../", DIRECTORY_SEPARATOR, $root_path);


        $dirs_list = [
            [ "path" => $root_path . DIRECTORY_SEPARATOR . 'runtime' . DIRECTORY_SEPARATOR, "need" => get_lang('dict_setting.file_authority_ask'), "path_name" => "/runtime", "name" => "runtime" ],
            [ "path" => $root_path . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'upload' . DIRECTORY_SEPARATOR, "need" => get_lang('dict_setting.file_authority_ask'), "path_name" => "/public/upload", "name" => "upload" ],
        ];
        //目录 可读 可写检测
        foreach ($dirs_list as $k => $v) {
            $is_readable = is_readable($v[ "path" ]);
            $is_write = is_write($v[ "path" ]);
            if ($is_readable && $is_write) {
                $dirs_list[ $k ][ "status" ] = true;
            } else {
                $dirs_list[ $k ][ "status" ] = false;
            }
        }
        $system_variables = array_merge($system_variables, $dirs_list);

        //获取环境版本
        $server_version = [];
        $row = (array) Db::query("select VERSION() as verson");
        $server_version[] = [ "name" => get_lang('dict_setting.php_version'), "demand" => get_lang('dict_setting.php_ask'), "server" => PHP_VERSION];
        $server_version[] = [ "name" => get_lang('dict_setting.mysql_version'), "demand" => get_lang('dict_setting.mysql_ask'), "server" => $row[ 0 ][ 'verson' ] ];

        // 进程
        $process[] = [ "name" => "php think queue:listen", "need" => get_lang('dict_setting.php_authority_ask'), "status" => ( new SystemService() )->checkJob() ];

        return [ "server" => $server, "dirs_list" => $dirs_list, 'system_variables' => $system_variables, 'server_version' => $server_version, 'process' => $process ];
    }

    /**
     * 清理缓存
     */
    public function schemaCache()
    {

        if (is_dir(dirname($_SERVER[ 'DOCUMENT_ROOT' ]) . '/runtime/schema')) {
            rmdirs(dirname($_SERVER[ 'DOCUMENT_ROOT' ]) . '/runtime/schema');
        }
        return 'CLEAR_MYSQL_CACHE_SUCCESS';
    }

    /**
     *校验消息队列是否正常运行
     * @return bool
     */
    public function checkJob()
    {
        $secret = uniqid('', true);
        $file = root_path('runtime') . $secret . '.job';
        try {
            CheckJob::invoke([ 'file' => $file ]);
        } catch ( Throwable $e) {
            return false;
        }
        sleep(3);
        if (file_exists($file)) {
            @unlink($file);
            return true;
        }
        return false;
    }

    /**
     * 校验计划任务是否正常运行
     * @return bool
     */
    public function checkSchedule()
    {
        $file = root_path('runtime') . '.schedule';
        if (file_exists($file)) {
            $time = file_get_contents($file);
            if (!empty($time) && abs($time - time()) < 90) {
                return true;
            }
        }
        return false;
    }

    /**
     * 设置布局
     * @param string $key
     * @return void
     */
    public function setLayout(string $key) {
        $layouts = array_column(event('SiteLayout'), 'key');
        if (!in_array($key, $layouts)) throw new CommonException('LAYOUT_NOT_EXIST');
        (new CoreConfigService())->setConfig($this->site_id, 'SITE_LAYOUT', [ 'key' => $key ]);
        return true;
    }
}