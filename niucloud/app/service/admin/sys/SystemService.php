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

use core\base\BaseAdminService;
use think\facade\Db;

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
     * @return array|mixed
     */
    public function getInfo()
    {
        $data = [
            'os' => PHP_OS,
            'environment' => $_SERVER[ 'SERVER_SOFTWARE' ],
            'php_v' => PHP_VERSION,
            'version' => config('version')
        ];
        return $data;
    }

    /**
     * 获取域名配置
     */
    public function getUrl()
    {
        $site_tag = $this->site_id == 30 ? '' : '/s' . $this->site_id;
        $data = [
            'wap_url' => ( !empty(env("system.wap_domain")) ? env("system.wap_domain") : request()->domain() ) . "/wap" . $site_tag,
            'web_url' => ( !empty(env("system.web_domain")) ? env("system.web_domain") : request()->domain() ) . "/web" . $site_tag,
        ];
        return $data;
    }

    /**
     * 获取系统信息
     * @return void
     */
    public function getSystemInfo(){
        $server = [];
        $server[] = [ "name" => "服务器操作系统", "server" => PHP_OS ];
        $server[] = [ "name" => "服务器web环境", "server" => PHP_SAPI ];
        $server[] = [ "name" => "PHP版本", "server" => phpversion() ];

        //环境权限
        $system_variables = [];
        //pdo
        $pdo = extension_loaded('pdo') && extension_loaded('pdo_mysql');
        $system_variables[] = [ "name" => "pdo", "need" => "开启", "status" => $pdo ];
        //curl
        $curl = extension_loaded('curl') && function_exists('curl_init');
        $system_variables[] = [ "name" => "curl", "need" => "开启", "status" => $curl ];
        //openssl
        $openssl = extension_loaded('openssl');
        $system_variables[] = [ "name" => "openssl", "need" => "开启", "status" => $openssl ];
        //gd
        $gd = extension_loaded('gd');
        $system_variables[] = [ "name" => "GD库", "need" => "开启", "status" => $gd ];
        //fileinfo
        $fileinfo = extension_loaded('fileinfo');
        $system_variables[] = [ "name" => "fileinfo", "need" => "开启", "status" => $fileinfo ];
        //目录权限
        $root_path = str_replace("\\", DIRECTORY_SEPARATOR, dirname(dirname(dirname(dirname(dirname(__FILE__))))));
        $root_path = str_replace("../", DIRECTORY_SEPARATOR, $root_path);

        $dirs_list = [
            [ "path" => $root_path . DIRECTORY_SEPARATOR . 'runtime'.DIRECTORY_SEPARATOR, "demand" => "可读可写", "path_name" => "/runtime", "name" => "runtime" ],
            [ "path" => $root_path . DIRECTORY_SEPARATOR . 'public'.DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR, "demand" => "可读可写", "path_name" => "/public/upload", "name" => "upload" ],
       ];
        //目录 可读 可写检测
        foreach ($dirs_list as $k => $v) {
            $is_readable = is_readable($v[ "path" ]);
            $is_write = is_write($v[ "path" ]);
            $dirs_list[ $k ][ "is_readable" ] = $is_readable;
            $dirs_list[ $k ][ "is_write" ] = $is_write;
        }

        //获取环境版本
        $server_version = [];
        $row = (array)Db::query("select VERSION() as verson");
        $server_version[] = [ "name" => "PHP版本", "demand" => "大于等于8.0.0", "server" => phpversion() ];
        $server_version[] = [ "name" => "mysql版本", "demand" => "大于等于5.7", "server" => $row[0]['verson']];

        $data = ["server" => $server, "dirs_list" => $dirs_list, 'system_variables' => $system_variables, 'server_version' => $server_version];
        return $data;
    }

}