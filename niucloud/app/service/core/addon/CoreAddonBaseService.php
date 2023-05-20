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

namespace app\service\core\addon;

use core\base\BaseCoreService;
use core\exception\CommonException;

/**
 * 插件基类
 * Class CoreAddonBaseService
 * @package app\service\core\addon
 */
class CoreAddonBaseService extends BaseCoreService
{
    //系统整体根目录
    protected $root_path;
    //插件整体目录
    protected $addon_path;
    //插件整体缓存标识
    public static $cache_tag_name = 'addon_cash';
    public function __construct()
    {
        parent::__construct();
        $this->root_path = dirname(root_path()) . DIRECTORY_SEPARATOR;
        $this->addon_path = root_path() . 'addon' . DIRECTORY_SEPARATOR;
    }

    /**
     * 获取插件基础配置信息
     * @param string $addon
     * @return array|mixed
     */
    public function getAddonConfig(string $addon)
    {
        $path = $this->addon_path . $addon . DIRECTORY_SEPARATOR . 'info.json';
        if (is_file($path)) {
            $json_string = file_get_contents($path);
            // 用参数true把JSON字符串强制转成PHP数组
            $info = json_decode($json_string, true);
            $info['icon'] = '';
        }
        return $info ?? [];
    }

    /**
     * 获取插件配置文件目录
     * @param string $addon
     * @return string
     */
    public function getAddonConfigPath(string $addon)
    {
        return $this->addon_path . $addon . DIRECTORY_SEPARATOR . 'config'. DIRECTORY_SEPARATOR;
    }

    /**
     * 读取json文件转化成数组返回
     * @param $json_file_path  //json文件目录
     */
    protected function jsonFileToArray(string $json_file_path)
    {
        if (file_exists($json_file_path)) {
            $content_json = @file_get_contents($json_file_path);
            $content_array = json_decode($content_json, true);
            return $content_array;
        }else
            return [];
    }

    /**
     * 读取json文件转化成数组返回
     * @param $json_file_path  //json文件目录
     */
    protected function writeArrayToJsonFile(array $content, string $file_path)
    {
        $content_json = json_encode($content, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
        $result  = @file_put_contents($file_path, $content_json);
        if (!$result) {
            throw new CommonException($file_path.'文件不存在或者权限不足');
        }
        return true;
    }

}