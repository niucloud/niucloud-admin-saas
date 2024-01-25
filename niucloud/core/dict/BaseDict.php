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

namespace core\dict;

use app\service\core\addon\CoreAddonBaseService;
use app\service\core\site\CoreSiteService;
use core\loader\Storage;
use think\facade\Cache;
use think\facade\Db;

/**
 * Class BaseAddon
 * @package
 */
abstract class BaseDict extends Storage
{
    //插件整体缓存标识
    public static $cache_tag_name = 'addon_cash';

    /**
     * 初始化
     * @param array $config
     * @return void
     */
    protected function initialize(array $config = [])
    {
    }

    /**
     * 获取本地插件目录(已安装)
     */
    protected function getLocalAddons()
    {
        if (!file_exists(root_path() . "install.lock")) {
            //尚未安装不加载插件
            return [];
        }

        $headers = request()->header();
        $admin_site_id_name = system_name('admin_site_id_name');
        $api_site_id_name = system_name('admin_site_id_name');
        $site_id = $headers[$admin_site_id_name] ?? $headers[$api_site_id_name] ?? 0;

        if ($site_id) {
            $addons = Cache::get("local_install_addons_{$site_id}");
            if (!is_null($addons)) return $addons;

            $prefix = config('database.connections.mysql.prefix');
            $site = Db::name('site')->alias('s')->join(["{$prefix}site_group" => 'sg'], 's.group_id = sg.group_id')
                ->where([['s.site_id', '=', $site_id]])
                ->field('s.app,s.addons,sg.app as site_group_app,sg.addon as site_group_addon')->find();

            $addons = array_unique(array_merge(
                (empty($site['app']) ? [] : json_decode($site['app'], true)),
                (empty($site['addons']) ? [] : json_decode($site['addons'], true)),
                (empty($site['site_group_app']) ? [] : json_decode($site['site_group_app'], true)),
                (empty($site['site_group_addon']) ? [] : json_decode($site['site_group_addon'], true))
            ));

            Cache::tag(CoreSiteService::$cache_tag_name . $site_id)->set("local_install_addons_{$site_id}", $addons);
        } else {
            $addons = Cache::get("local_install_addons");
            if (!is_null($addons)) return $addons;

            $addons = Db::name("addon")->column("key");
            Cache::tag(CoreAddonBaseService::$cache_tag_name)->set("local_install_addons", $addons);
        }

        return $addons;
    }

    /**
     * 获取插件目录
     * @param string $addon
     * @return string
     */
    protected function getAddonPath(string $addon)
    {
        return root_path() . 'addon' . DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR;

    }

    /**
     * 获取系统整体app目录
     * @return string
     */
    protected function getAppPath()
    {
        return root_path() . "app" . DIRECTORY_SEPARATOR;
    }

    /**
     * 获取插件对应app目录
     * @param string $addon
     * @return string
     */
    protected function getAddonAppPath(string $addon)
    {
        return $this->getAddonPath($addon) . "app" . DIRECTORY_SEPARATOR;
    }

    /**
     *获取系统dict path
     */
    protected function getDictPath()
    {
        return root_path() . 'app' . DIRECTORY_SEPARATOR . 'dict' . DIRECTORY_SEPARATOR;
    }

    /**
     *获取插件对应的dict目录
     * @param string $addon
     * @return string
     */
    protected function getAddonDictPath(string $addon)
    {
        return $this->getAddonPath($addon) . 'app' . DIRECTORY_SEPARATOR . 'dict' . DIRECTORY_SEPARATOR;
    }

    /**
     *获取插件对应的config目录
     * @param string $addon
     * @return string
     */
    protected function getAddonConfigPath(string $addon)
    {
        return $this->getAddonPath($addon) . 'config' . DIRECTORY_SEPARATOR;
    }

    /**
     * 加载文件数据
     * @param $files
     * @return array
     */
    protected function loadFiles($files)
    {
        $default_sort = 100000;
        $files_data = [];
        if (!empty($files)) {
            foreach ($files as $file) {
                $config = include $file;
                if (!empty($config)) {
                    if (isset($config['file_sort'])) {
                        $sort = $config['file_sort'];
                        unset($config['file_sort']);
                        $sort = $sort * 10;
                        while (array_key_exists($sort, $files_data)) {
                            $sort++;
                        }
                        $files_data[$sort] = $config;
                    } else {
                        $files_data[$default_sort] = $config;
                        $default_sort++;
                    }
                }
            }
        }
        ksort($files_data);
        return $files_data;
    }

    /**
     * 加载
     * @return mixed
     */
    abstract public function load(array $data);
}
