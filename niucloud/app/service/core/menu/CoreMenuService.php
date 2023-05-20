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

namespace app\service\core\menu;

use app\enum\sys\AppTypeEnum;
use app\model\addon\Addon;
use app\model\sys\SysMenu;
use app\service\admin\sys\MenuService;
use core\addon\AddonLoader;
use core\base\BaseCoreService;
use think\facade\Cache;

/**
 * 系统菜单
 */
class CoreMenuService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysMenu();
    }
    /**
     * 安装菜单
     * @param array $menu_list
     * @return true
     */
    public function install(array $menu_list)
    {
        $this->model->replace()->insertAll($menu_list);
        // 清除缓存
        Cache::tag(MenuService::$cache_tag_name)->clear();
        return true;
    }

    /**
     * 加载菜单
     * @return array
     */
    public function loadMenu(array $menu_tree, string $app_type, string $addon = '')
    {
        //加载系统
        $menu_list = [];
        $this->menuTreeToList($menu_tree, '',$app_type, $addon, $menu_list);
        return $menu_list;
    }

    /**
     * 菜单数转为列表
     * @param array $tree
     * @param string $parent_key
     * @param string $app_type
     */
    private function menuTreeToList(array $tree, string $parent_key = '', string $app_type = AppTypeEnum::ADMIN, string $addon = '', array &$menu_list= [])
    {
        if (is_array($tree)) {
            foreach ($tree as $key => $value) {
                $item = [
                    'menu_name' => $value['menu_name'],
                    'menu_key' => $value['menu_key'],
                    'app_type' => $app_type,
                    'addon' => $addon,
                    'parent_key' => $value['parent_key'] ?? $parent_key,
                    'menu_type' => $value['menu_type'],
                    'icon' => $value['icon'] ?? '',
                    'api_url' => $value['api_url'] ?? '',
                    'router_path' => $value['router_path'] ?? '',
                    'view_path' => $value['view_path'] ?? '',
                    'methods' => $value['methods'] ?? '',
                    'sort' => $value['sort'] ?? '',
                    'status' => 1,
                    'is_show' => $value['is_show'] ?? 1,
                    'en_menu_name' => $value['en_menu_name'] ?? '',
                ];
                $refer = $value;
                if (isset($refer[ 'children' ])) {
                    unset($refer[ 'children' ]);
                    array_push($menu_list, $item);
                    $p_key = $refer[ 'menu_key' ];
                    $this->menuTreeToList($value[ 'children' ],$p_key, $app_type, $menu_list);
                } else {
                    array_push($menu_list, $item);
                }
            }
        }
    }

    /**
     * 删除插件菜单
     * @param string $addon
     * @return true
     */
    public function deleteByAddon(string $addon){
        $this->model->where([['addon', '=', $addon]])->delete();
        return true;
    }

    /**
     * 安装或者刷新插件菜单
     * @param $addon
     * @return bool
     */
    public function refreshAddonMenu($addon)
    {
        $addon_loader = new AddonLoader("Menu");
        $addon_admin_tree = $addon_loader->load(["addon" => $addon, "app_type" => "admin"]);
        $menu = [];
        if(!empty($addon_admin_tree))
        {
            $menu = $this->loadMenu($addon_admin_tree, "admin", $addon);
        }
        $addon_site_tree = $addon_loader->load(["addon" => $addon, "app_type" => "site"]);
        if(!empty($addon_site_tree))
        {
            $site_menu = $this->loadMenu($addon_site_tree, "site", $addon);
            $menu = array_merge($menu, $site_menu);
        }
        $this->deleteByAddon($addon);
        $this->install($menu);
        return true;

    }

    /**
     * 刷新所有插件菜单
     */
    public function refreshAllAddonMenu()
    {

        $addons  = (new Addon())->field("title")->select()->toArray();
        foreach ($addons as $k => $v)
        {
            $this->refreshAddonMenu($v["title"]);
        }
        return true;
    }
}