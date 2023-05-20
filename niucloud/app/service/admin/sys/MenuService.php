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

use app\enum\sys\MenuTypeEnum;
use app\model\sys\SysMenu;
use core\base\BaseAdminService;
use core\exception\AdminException;
use think\Exception;
use think\facade\Cache;

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
     * @param $params
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
     * @param int $menu_key
     * @param array $data
     * @return SysMenu
     */
    public function edit(string $menu_key, array $data)
    {
        $where = array(
            ['menu_key', '=', $menu_key]
        );
        $res = $this->model->update($data, $where);
        Cache::tag(self::$cache_tag_name)->clear();
        return $res;
    }

    /**
     * 获取信息
     * @param int $menu_key
     * @return array
     */
    public function get(string $menu_key){
        return $this->model->where([['menu_key', '=', $menu_key]])->findOrEmpty()->toArray();
    }

    /**
     * @param int $menu_key
     * @return SysMenu|array|mixed|\think\Model
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
     * @param int $menu_key
     * @throws Exception
     */
    public function del(string $menu_key){
        //查询是否有下级菜单或按钮
        $menu = $this->find($menu_key);
        if($this->model::where([['parent_key', '=', $menu_key]])->count() > 0)
            throw new AdminException('MENU_NOT_ALLOW_DELETE');

        $res = $menu->delete();
        Cache::tag(self::$cache_tag_name)->clear();
        return  $res;
    }

    /**
     * 通过菜单menu_key获取
     * @param array $menu_keys
     * @param int $is_tree
     * @return mixed
     */
    public function getMenuListByMenuKeys(array $menu_keys, string $app_type, int $is_tree = 0)
    {
        sort($menu_keys);
        $cache_name = 'menu' . md5(implode("_", $menu_keys)) . $is_tree;
        return Cache::tag(self::$cache_tag_name)->remember($cache_name, function () use ($menu_keys, $app_type, $is_tree) {
            $where = [
                ['menu_key', 'in', $menu_keys],
//                ['menu_type', 'in', [0,1]]
            ];
            if(!empty($app_type)){
                $where[] = ['app_type', '=', $app_type];
            }
            $menu_list = $this->model->where($where)->order('sort', 'desc')->select()->toArray();
            return $is_tree ? $this->menuToTree($menu_list, 'menu_key', 'parent_key', 'children', 'auth', '', 1) : $menu_list;

        });
    }

    /**
     * 通过菜单menu_key组获取接口数组
     * @param array $menu_keys
     */
    public function getApiListByMenuKeys(array $menu_keys, string $app_type = '')
    {
        sort($menu_keys);
        $cache_name = 'api' . md5(implode("_", $menu_keys));
        return Cache::tag(self::$cache_tag_name)->remember($cache_name, function () use ($menu_keys, $app_type) {
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
        });
    }



    /**
     * 通过菜单menu_key组获取按钮数组
     * @param array $menu_keys
     * @return mixed
     */
    public function getButtonListBuMenuKeys(array $menu_keys, string $app_type = '')
    {
        sort($menu_keys);
        $cache_name = 'button' . md5(implode("_", $menu_keys));
        return Cache::tag(self::$cache_tag_name)->remember($cache_name, function () use ($menu_keys, $app_type) {
            $where = [
                ['menu_key', 'in', $menu_keys],
                ['menu_type', '=', MenuTypeEnum::BUTTON]
            ];
            if(!empty($app_type)){
                $where[] = ['app_type', '=', $app_type];
            }
            $menu_list = $this->model->where($where)->order('sort', 'desc')->column('menu_key');
            return $menu_list;

        });
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
        return Cache::tag(self::$cache_tag_name)->remember($cache_name, function () use ($status, $app_type) {
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
        });
    }

    /**
     * 获取所有接口菜单
     */
    public function getAllMenuList($app_type = '', $status = 'all', $is_tree = 0, $is_button = 0)
    {
        $cache_name = 'menu_api_' .$app_type.'_'. $status . '_' . $is_tree . '_' . $is_button;
        return Cache::tag(self::$cache_tag_name)->remember($cache_name, function () use ($status, $is_tree, $is_button, $app_type) {
            $where = [
//                ['menu_type', 'in', [0,1]]
                ['app_type', '=', $app_type],
            ];
            if ($status != 'all') {
                $where[] = ['status', '=', $status];
            }
            $menu_list = $this->model->where($where)->order('sort desc')->select()->toArray();
            return $is_tree ? $this->menuToTree($menu_list, 'menu_key', 'parent_key', 'children', 'auth', '', $is_button) : $menu_list;
        });

    }



    /**
     * 获取所有按钮菜单
     */
    public function getAllButtonList($app_type = '', $status = 'all', $is_tree = 0)
    {
        $cache_name = 'menu_api_' .$app_type.'_' . $status . '_' . $is_tree;
        return Cache::tag(self::$cache_tag_name)->remember($cache_name, function () use ($status, $is_tree, $app_type) {
            $where = [
                ['menu_type', '=', MenuTypeEnum::BUTTON],
                ['app_type', '=', $app_type],
            ];
            if ($status != 'all') {
                $where[] = ['status', '=', $status];
            }
            $menu_list = $this->model->where($where)->order('sort', 'desc')->column('menu_key');
            return $menu_list;
        });
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



}