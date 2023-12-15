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

use app\dict\sys\MenuTypeDict;
use app\model\sys\SysMenu;
use app\service\admin\addon\AddonService;
use core\base\BaseAdminService;
use core\exception\AdminException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Cache;
use think\Model;

/**
 * 用户服务层
 * Class BaseService
 * @package app\service
 */
class MenuService extends BaseAdminService
{

    public static $cache_tag_name = 'menu_cache';
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysMenu();
    }

    /**
     * 新增菜单接口
     * @param array $data
     * @return SysMenu|Model
     */
    public function add(array $data)
    {
        $menu = $this->find($data['menu_key'], $data['app_type']);
        if(!$menu->isEmpty()) throw new AdminException('validate_menu.exit_menu_key');//创建失败

        $res = $this->model->create($data);
        if(!$res) throw new AdminException('ADD_FAIL');//创建失败

        Cache::tag(self::$cache_tag_name)->clear();
        return $res;
    }


    /**
     * 更新菜单
     * @param string $menu_key
     * @param array $data
     * @return SysMenu
     */
    public function edit(string $app_type, string $menu_key, array $data)
    {
        $where = array(
            ['app_type', '=', $app_type],
            ['menu_key', '=', $menu_key]
        );
        $res = $this->model->update($data, $where);
        Cache::tag(self::$cache_tag_name)->clear();
        return $res;
    }

    /**
     * 获取信息
     * @param string $menu_key
     * @return array
     */
    public function get(string $app_type, string $menu_key){
        return $this->model->where([['app_type', '=', $app_type],['menu_key', '=', $menu_key]])->findOrEmpty()->toArray();
    }

    /**
     * @param string $menu_key
     * @param string $app_type
     * @return SysMenu|array|mixed|Model
     */
    public function find(string $menu_key, string $app_type = ''){
        $where = array(
            ['menu_key', '=', $menu_key]
        );
        if(!empty($app_type)){
            $where[] = ['app_type', '=', $app_type];
        }
        $menu = $this->model->where($where)->findOrEmpty();
        if ($menu->isEmpty())
            throw new AdminException('MENU_NOT_EXIST');
        return $menu;
    }

    /**
     * 菜单删除
     * @param string $menu_key
     * @return bool
     * @throws DbException
     */
    public function del(string $app_type, string $menu_key){
        //查询是否有下级菜单或按钮
        $menu = $this->find($menu_key, $app_type);
        if($this->model->where([['parent_key', '=', $menu_key], ['app_type', '=', $app_type]])->count() > 0)
            throw new AdminException('MENU_NOT_ALLOW_DELETE');

        $res = $menu->delete();
        Cache::tag(self::$cache_tag_name)->clear();
        return  $res;
    }

    /**
     * 通过菜单menu_key获取
     * @param int $site_id
     * @param array $menu_keys
     * @param string $app_type
     * @param int $is_tree
     * @param  $addon 用于检测插件筛选
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getMenuListByMenuKeys(int $site_id, array $menu_keys, string $app_type, int $is_tree = 0, $addon = 'all')
    {
        sort($menu_keys);
        $cache_name = 'menu' . md5(implode("_", $menu_keys)) . $is_tree.$addon.$site_id;
        $menu_list = cache_remember(
            $cache_name,
            function () use ($site_id, $menu_keys, $app_type, $is_tree, $addon) {
                $where = [
                    ['menu_key', 'in', $menu_keys],
                ];
                $addons = ( new AddonService() )->getAddonKeysBySiteId($site_id);
                $addons[] = '';
                if($addon != 'all'){
                    $where[] = ['addon', '=', $addon];
                } else {
                    $where[] = ['addon', 'in', $addons];
                }
                if(!empty($app_type)){
                    $where[] = ['app_type', '=', $app_type];
                }
                return $this->model->where($where)->order('sort', 'desc')->select()->toArray();
            },
            self::$cache_tag_name
        );
        foreach ($menu_list as &$v)
        {
            $lang_menu_key = "dict_menu_". $v['app_type']. '.'. $v['menu_key'];
            $lang_menu_name = get_lang("dict_menu_". $v['app_type']. '.'. $v['menu_key']);
            //语言已定义
            if($lang_menu_key != $lang_menu_name)
            {
                $v['menu_name'] = $lang_menu_name;
            }
            //首页加载
            if($v['menu_key'] == 'overview' && $v['app_type'] == 'site')
            {
                $view_path = (new ConfigService())->getSiteIndexConfig();
                $v['view_path'] = $view_path;
            }

            if($v['menu_key'] == 'overview' && $v['app_type'] == 'admin')
            {
                $view_path = (new ConfigService())->getAdminIndexConfig();
                $v['view_path'] = $view_path;
            }

        }

        return $is_tree ? $this->menuToTree($menu_list, 'menu_key', 'parent_key', 'children', 'auth', '', 1) : $menu_list;

    }

    /**
     * 获取所有接口菜单
     */
    public function getAllMenuList($app_type = '', $status = 'all', $is_tree = 0, $is_button = 0)
    {
        $cache_name = 'menu_api_' .$app_type.'_'. $status . '_' . $is_tree . '_' . $is_button;
        $menu_list = cache_remember(
            $cache_name,
            function () use ($status, $is_tree, $is_button, $app_type) {
                $where = [
//                ['menu_type', 'in', [0,1]]
                    ['app_type', '=', $app_type],
                ];
                if ($status != 'all') {
                    $where[] = ['status', '=', $status];
                }
                return $this->model->where($where)->order('sort desc')->select()->toArray();
            },
            self::$cache_tag_name
        );
        foreach ($menu_list as &$v)
        {
            $lang_menu_key = "dict_menu_". $v['app_type']. '.'. $v['menu_key'];
            $lang_menu_name = get_lang("dict_menu_". $v['app_type']. '.'. $v['menu_key']);
            //语言已定义
            if($lang_menu_key != $lang_menu_name)
            {
                $v['menu_name'] = $lang_menu_name;
            }
            //首页加载
            if($v['menu_key'] == 'overview' && $v['app_type'] == 'site')
            {
                $view_path = (new ConfigService())->getSiteIndexConfig();
                $v['view_path'] = $view_path;
            }

            if($v['menu_key'] == 'overview' && $v['app_type'] == 'admin')
            {
                $view_path = (new ConfigService())->getAdminIndexConfig();
                $v['view_path'] = $view_path;
            }

        }

        return $is_tree ? $this->menuToTree($menu_list, 'menu_key', 'parent_key', 'children', 'auth', '', $is_button) : $menu_list;

    }


    /**
     * 通过菜单menu_key组获取接口数组
     * @param array $menu_keys
     * @param string $app_type
     * @return mixed|string
     */
    public function getApiListByMenuKeys(array $menu_keys, string $app_type = '')
    {
        sort($menu_keys);
        $cache_name = 'api' . md5(implode("_", $menu_keys));
        return cache_remember(
            $cache_name,
            function () use ($menu_keys, $app_type) {
                $where = [
                    ['menu_key', 'in', $menu_keys]
                ];
                if(!empty($app_type)){
                    $where[] = ['app_type', '=', $app_type];
                }
                $menu_list = (new SysMenu())->where($where)->order('sort', 'desc')->column('api_url,methods');
                foreach ($menu_list as $v) {
                    $auth_menu_list[$v['methods']][] = $v['api_url'];
                }
                return $auth_menu_list ?? [];
            },
            self::$cache_tag_name
        );
    }


    /**
     * 通过菜单menu_key组获取按钮数组
     * @param array $menu_keys
     * @param string $app_type
     * @return mixed
     */
    public function getButtonListBuMenuKeys(array $menu_keys, string $app_type = '')
    {
        sort($menu_keys);
        $cache_name = 'button' . md5(implode("_", $menu_keys));
        return cache_remember(
            $cache_name,
            function () use ($menu_keys, $app_type) {
                $where = [
                    ['menu_key', 'in', $menu_keys],
                    ['menu_type', '=', MenuTypeDict::BUTTON]
                ];
                if(!empty($app_type)){
                    $where[] = ['app_type', '=', $app_type];
                }
                return $this->model->where($where)->order('sort', 'desc')->column('menu_key');
            },
            self::$cache_tag_name
        );
    }

    /**
     * 获取所有接口菜单权限
     * @param $app_type
     * @param $status
     * @return mixed
     */
    public function getAllApiList($app_type = '', $status = 'all')
    {
        $cache_name = 'all_api'  .$app_type.'_'. $status;
        return cache_remember(
            $cache_name,
            function () use ($status, $app_type) {
                $where = [
                    ['api_url', '<>', ''],
                    ['app_type', '=', $app_type],
                ];
                if ($status != 'all') {
                    $where[] = ['status', '=', $status];
                }
                $menu_list = $this->model->where($where)->order('sort', 'desc')->column('methods, api_url');
                $auth_menu_list = [];
                foreach ($menu_list as $v) {
                    $auth_menu_list[$v['methods']][] = $v['api_url'];
                }
                return $auth_menu_list;
            },
            self::$cache_tag_name
        );
    }

    /**
     * 通过站点端口获取菜单id
     * @param string $app_type
     * @param $status
     * @return mixed|string
     */
    public function getAllMenuIdsByAppType(string $app_type, $status = 'all'){
        $cache_name = 'menu_id_by_app_type_' .$app_type;
        return cache_remember(
            $cache_name,
            function () use ($app_type, $status) {
                $where = [
//
                    ['app_type', '=', $app_type],
                ];
                if ($status != 'all') {
                    $where[] = ['status', '=', $status];
                }
                return $this->model->where($where)->order('sort desc')->column('menu_key');
            },
            self::$cache_tag_name
        );
    }



    /**
     * 获取所有按钮菜单
     */
    public function getAllButtonList($app_type = '', $status = 'all', $is_tree = 0)
    {
        $cache_name = 'menu_api_' .$app_type.'_' . $status . '_' . $is_tree;
        return cache_remember(
            $cache_name,
            function () use ($status, $is_tree, $app_type) {
                $where = [
                    ['menu_type', '=', MenuTypeDict::BUTTON],
                    ['app_type', '=', $app_type],
                ];
                if ($status != 'all') {
                    $where[] = ['status', '=', $status];
                }
                return $this->model->where($where)->order('sort', 'desc')->column('menu_key');
            },
            self::$cache_tag_name
        );
    }

    /**
     * 把返回的数据集转换成Tree(专属于)
     * @param $list 要转换的数据集
     * @param string $pk
     * @param string $pid
     * @param string $child
     * @param int $root
     * @return array
     */
    public function menuToTree($list, $pk = 'id', $pid = 'pid', $child = 'child', $button_name = 'auth', $root = '', $is_button = 0)
    {
        // 创建Tree
        $tree = array();
        if (is_array($list)) {
            // 创建基于主键的数组引用
            $refer = array();
            foreach ($list as $key => $data) {
                $refer[$data[$pk]] =& $list[$key];
            }
            foreach ($list as $key => $data) {
                // 判断是否存在parent
                $parent_id = $data[$pid];
                if ($root == $parent_id) {
                    $tree[] =& $list[$key];
                } else {
                    if (isset($refer[$parent_id])) {
                        $parent =& $refer[$parent_id];
                        if ($list[$key]['menu_type'] == 2 && $is_button == 1) {
                            $parent[$button_name][] =& $list[$key]['menu_key'];
                        } else {
                            $parent[$child][] =& $list[$key];
                        }

                    }
                }
            }
        }
        return $tree;

    }

    /**
     * 获取完整的路由地址
     * @param $menu_key
     * @return string
     */
    public function getFullRouterPath($menu_key){
        $menu = $this->model->where([['menu_key', '=', $menu_key]])->findOrEmpty($menu_key);
        if($menu->isEmpty()) return '';
        $parents = [];
        $this->getParentDirectory($menu, $parents);
        $parents = array_reverse($parents);
        $router_path = implode('/', $parents);
        if(!empty($router_path)){
            $router_path .= '/'.$menu['router_path'];
        }else{
            $router_path = $menu['router_path'];
        }
        return $router_path;
    }

    /**
     * 递归查询模板集合
     * @param SysMenu $menu
     * @param $parents
     * @return void
     */
    public function getParentDirectory(SysMenu $menu, &$parents){
        if(!$menu->isEmpty() && !empty($menu['parent_key'])){
            $parent_menu = $this->model->where([['menu_key', '=', $menu['parent_key']]])->findOrEmpty();
            if(!empty($parent_menu)){
                if(!empty($parent_menu['router_path'])) $parents[] = $parent_menu['router_path'];
                $this->getParentDirectory($parent_menu, $parents);
            }
        }

    }

    /**
     * 获取系统菜单(站点权限api极限)
     * @param string $app_type
     * @param string $addons
     * @return mixed|string
     */
    public function getApiListBySystem(string $app_type = '', array $addons = [])
    {
        sort($addons);
        $cache_name = 'system_menu_api_' . $app_type.implode("_", $addons);
        return cache_remember(
            $cache_name,
            function () use ($app_type, $addons) {
                $addons[] = '';
                $where = [
                    ['addon', 'in', $addons]
                ];
                if(!empty($app_type)){
                    $where[] = ['app_type', '=', $app_type];
                }
                $menu_list = (new SysMenu())->where($where)->order('sort', 'desc')->column('api_url,methods');
                foreach ($menu_list as $v) {
                    $auth_menu_list[$v['methods']][] = $v['api_url'];
                }
                return $auth_menu_list ?? [];
            },
            self::$cache_tag_name
        );
    }

    /**
     * 站点所拥有的菜单极限
     * @param string $app_type
     * @param array $addons
     * @param int $is_tree
     * @return array|mixed|string
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getMenuListBySystem(string $app_type, array $addons, int $is_tree = 0, int $is_button = 1)
    {
        sort($addons);
        $cache_name = 'menu' . md5(implode("_", $addons)) . $is_tree;
        $menu_list = cache_remember(
            $cache_name,
            function () use ($addons, $app_type, $is_tree) {
                $where = [
                    ['addon', 'in', $addons]
                ];
                if(!empty($app_type)){
                    $where[] = ['app_type', '=', $app_type];
                }
                return $this->model->where($where)->order('sort', 'desc')->select()->toArray();

            },
            self::$cache_tag_name
        );

        foreach ($menu_list as &$v)
        {
            $lang_menu_key = "dict_menu_". $v['app_type']. '.'. $v['menu_key'];
            $lang_menu_name = get_lang("dict_menu_". $v['app_type']. '.'. $v['menu_key']);
            //语言已定义
            if($lang_menu_key != $lang_menu_name)
            {
                $v['menu_name'] = $lang_menu_name;
            }
            //首页加载
            if($v['menu_key'] == 'overview' && $v['app_type'] == 'site')
            {
                $view_path = (new ConfigService())->getSiteIndexConfig();
                $v['view_path'] = $view_path;
            }

            if($v['menu_key'] == 'overview' && $v['app_type'] == 'admin')
            {
                $view_path = (new ConfigService())->getAdminIndexConfig();
                $v['view_path'] = $view_path;
            }
        }
        return $is_tree ? $this->menuToTree($menu_list, 'menu_key', 'parent_key', 'children', 'auth', '', $is_button) : $menu_list;

    }

    /**
     * 通过站点的应用配置获取所有的keys
     * @param string $app_type
     * @param array $addons
     * @return mixed|string
     */
    public function getMenuKeysBySystem(string $app_type, array $addons){
        sort($addons);
        $cache_name = 'menu_keys_' . $app_type.implode("_", $addons);
        return cache_remember(
            $cache_name,
            function () use ($app_type, $addons) {
                $addons[] = '';
                $where = [
                    ['addon', 'in', $addons]
                ];
                if(!empty($app_type)){
                    $where[] = ['app_type', '=', $app_type];
                }
                return (new SysMenu())->where($where)->order('sort', 'desc')->column('menu_key');
            },
            self::$cache_tag_name
        );
    }

    public function getSystemMenu($status = 'all', $is_tree = 0, $is_button = 0)
    {

        if($is_button == 0)
        {
            $where = [
                ['menu_type', 'in', [0,1]]
            ];
        }

        if ($status != 'all') {
            $where[] = ['status', '=', $status];
        }
        $where[] = [ 'addon', '=',''];
        $menu_list = (new SysMenu())->where($where)->order('sort desc')->select()->toArray();
        foreach ($menu_list as &$v)
        {
            $lang_menu_key = 'dict_menu_admin' . '.'. $v['menu_key'];
            $lang_menu_name = get_lang($lang_menu_key);
            //语言已定义
            if($lang_menu_key != $lang_menu_name)
            {
                $v['menu_name'] = $lang_menu_name;
            }
        }
        return $is_tree ? $this->menuToTree($menu_list, 'menu_key', 'parent_key', 'children', 'auth', '', $is_button) : $menu_list;
    }

    public function getAddonMenu($app_key,$status = 'all', $is_tree = 0, $is_button = 0)
    {

        if($is_button == 0)
        {
            $where = [
                ['menu_type', 'in', [0,1]]
            ];
        }

        if ($status != 'all') {
            $where[] = ['status', '=', $status];
        }
        $where[] = [ 'addon', '=',$app_key];
        $menu_list = (new SysMenu())->where($where)->select()->toArray();
        return $is_tree ? $this->menuToTree($menu_list, 'menu_key', 'parent_key', 'children', 'auth', '', $is_button) : $menu_list;
    }
}
