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

use app\service\core\menu\CoreMenuService;
use think\facade\Cache;
use think\facade\Db;

/**
 * 安装服务层
 * Class CoreInstallService
 * @package app\service\core\install
 */
class CoreAddonConfigService extends CoreAddonBaseService
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 获取本地插件目录(已安装)
     */
    private function getLocalAddons()
    {
        $cache_name = "local_install_addons";
        return Cache::tag(self::$cache_tag_name)->remember($cache_name, function ()  {
            $list = Db::name("addon")->column("key");
            return $list;
        });
    }

    /**
     * 加载语言包
     * @param $lang_type
     */
    public function loadAddonLang($lang_type)
    {

        $addons  = $this->getLocalAddons();
        $lang_files = [];

        foreach ($addons as $k => $v)
        {
            $lang_path = $this->getAddonConfigPath($v)."lang". DIRECTORY_SEPARATOR. $lang_type.DIRECTORY_SEPARATOR;

            $api_path = $lang_path."api.php";
            $enum_path = $lang_path."enum.php";
            $validate_path = $lang_path."validate.php";
            if(is_file($api_path))
            {
                $lang_files[] = $api_path;

            }
            if(is_file($enum_path))
            {
                $lang_files[] = $enum_path;
            }
            if(is_file($validate_path))
            {
                $lang_files[] = $validate_path;
            }
        }
        $files_data = $this->loadFiles($lang_files);
        $lang = [];
        foreach ($files_data as $data) {
            $lang = array_merge($lang, $data);
        }
        return $lang;
    }

    /**
     * 加载插件事件
     * @return array|mixed
     */
    public function loadAddonEvent($system_event)
    {

        $addons  = $this->getLocalAddons();
        $event_files = [];

        foreach ($addons as $k => $v)
        {
            $event_path = $this->getAddonConfigPath($v)."event.php";
            if(is_file($event_path))
            {
                $event_files[] = $event_path;
            }
        }
        $files_data = $this->loadFiles($event_files);

        $files_data[1] = $system_event;

        $events = [];
        foreach ($files_data as $data) {
            $events = empty($events) ? $data : array_merge2($events, $data);
        }
        return $events;

    }

    /**
     * 加载插件路由
     * @param $app_type
     */
    public function loadAddonRoute($app_type)
    {
        $addons  = $this->getLocalAddons();

        foreach ($addons as $k => $v)
        {
            $route_path = $this->getAddonConfigPath($v)."route".DIRECTORY_SEPARATOR. $app_type. ".php";
            if(is_file($route_path))
            {
                include $route_path;
            }
        }
        return true;
    }

    /**
     * 加载整合插件components数据
     * @param array $system_components //系统components数据
     * @return array
     */
    public function loadAddonUniappComponent($system_components = [])
    {
        $addons  = $this->getLocalAddons();
        $components_files = [];
        foreach ($addons as $k => $v)
        {
            $components_path = $this->getAddonConfigPath($v). "diy". DIRECTORY_SEPARATOR. "components.php";
            if(is_file($components_path))
            {
                $components_files[] = $components_path;
            }
        }
        $components_files_data = $this->loadFiles($components_files);
        $components = $system_components;
        foreach ($components_files_data as $file_data)
        {
            $components = empty($components) ? $file_data : array_merge2($components, $file_data);
        }
        return $components;
    }

    /**
     * 加载整合插件uniapp link数据
     * @param array $system_links //系统link数据
     * return array
     */
    public function loadAddonUniappLink($system_links = [])
    {
        $addons  = $this->getLocalAddons();
        $link_files = [];
        foreach ($addons as $k => $v)
        {
            $link_path = $this->getAddonConfigPath($v). "diy". DIRECTORY_SEPARATOR. "links.php";
            if(is_file($link_path))
            {
                $link_files[] = $link_path;
            }
        }
        $link_files_data = $this->loadFiles($link_files);
        $links = $system_links;
        foreach ($link_files_data as $file_data)
        {
            if(empty($links))
            {
                $links = $file_data;
            }else
                $links = array_merge($links, $file_data);
        }
        return $links;
    }

    /**
     * 加载整合插件uniapp pages数据
     * @param array $system_pages //系统page数据
     * return array
     */
    public function loadAddonUniappPages($system_pages = [])
    {
        $addons  = $this->getLocalAddons();
        $page_files = [];
        foreach ($addons as $k => $v)
        {
            $page_path = $this->getAddonConfigPath($v). "diy". DIRECTORY_SEPARATOR. "pages.php";
            if(is_file($page_path))
            {
                $page_files[] = $page_path;
            }
        }
        $page_files_data = $this->loadFiles($page_files);
        $pages = $system_pages;
        foreach ($page_files_data as $file_data)
        {
            if(empty($pages))
            {
                $pages = $file_data;
            }else
                $pages = array_merge($pages, $file_data);
        }
        return $pages;
    }
    /**
     * 加载插件菜单返回数组
     * @param $addon
     * @param $app_type
     * @return array|mixed
     */
    private function loadAddonMenu($addon, $app_type)
    {
        $menu_path = $this->getAddonConfigPath($addon)."menu".DIRECTORY_SEPARATOR. $app_type. ".php";
        if(is_file($menu_path))
        {
            return include $menu_path;
        }
        return [];
    }

    /**
     * 安装或者刷新插件菜单
     * @param $addon
     * @return bool
     */
    public function refreshAddonMenu($addon)
    {
        $addon_admin_tree = $this->loadAddonMenu($addon, "admin");
        $menu = [];
        $menu_service = new CoreMenuService();
        if(!empty($addon_admin_tree))
        {
            $menu = $menu_service->loadMenu($addon_admin_tree, "admin", $addon);
        }
        $addon_site_tree = $this->loadAddonMenu($addon, "site");
        if(!empty($addon_site_tree))
        {
            $site_menu = $menu_service->loadMenu($addon_site_tree, "site", $addon);
            $menu = array_merge($menu, $site_menu);
        }
        $menu_service->deleteByAddon($addon);
        $menu_service->install($menu);
        return true;

    }

    /**
     * 刷新所有插件菜单
     */
    public function refreshAllAddonMenu()
    {

        $addons  = $this->getLocalAddons();
        foreach ($addons as $k => $v)
        {
            $this->refreshAddonMenu($v);
        }
        return true;
    }

    /**
     * 加载整体消息模板
     * @param $type  //模板类型  template weapp, wechat,sms
     * @return array|mixed
     */
    public function loadNotice($type)
    {
        $template_files = [];
        $system_path = root_path(). "app". DIRECTORY_SEPARATOR. "enum". DIRECTORY_SEPARATOR. "notice". DIRECTORY_SEPARATOR. $type. ".php";
        if(is_file($system_path))
        {
            $template_files[] = $system_path;
        }
        $addons  = $this->getLocalAddons();
        foreach ($addons as $k => $v)
        {
            $template_path = $this->getAddonConfigPath($v). "notice". DIRECTORY_SEPARATOR. $type. ".php";
            if(is_file($template_path))
            {
                $template_files[] = $template_path;
            }
        }

        $template_files_data = $this->loadFiles($template_files);

        $template_data_array = [];
        foreach ($template_files_data as $file_data)
        {
            if(empty($template_data_array))
            {
                $template_data_array = $file_data;
            }else
                $template_data_array = array_merge($template_data_array, $file_data);
        }
        return $template_data_array;

    }

    /**
     * 加载文件数据
     * @param $files
     * @return array
     */
    private function loadFiles($files)
    {
        $default_sort = 100000;
        $files_data = [];
        if (!empty($files)) {
            foreach ($files as $file) {
                $config = include $file;
                if (!empty($config)) {
                    if (isset($config[ 'file_sort' ])) {
                        $sort = $config[ 'file_sort' ];
                        unset($config[ 'file_sort' ]);
                        $sort = $sort * 10;
                        while (array_key_exists($sort, $files_data)) {
                            $sort++;
                        }
                        $files_data[ $sort ] = $config;
                    } else {
                        $files_data[ $default_sort ] = $config;
                        $default_sort++;
                    }
                }
            }
        }
        ksort($files_data);
        return $files_data;
    }
}