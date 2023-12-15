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

namespace app\service\admin\site;

use app\model\addon\Addon;
use app\model\site\Site;
use app\model\site\SiteGroup;
use app\model\sys\SysMenu;
use app\service\admin\sys\MenuService;
use app\service\core\addon\CoreAddonService;
use core\base\BaseAdminService;
use core\exception\AdminException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Cache;

/**
 * 站点分组服务层
 * Class SiteGroupService
 * @package app\service\admin\site
 */
class SiteGroupService extends BaseAdminService
{
    public static $cache_tag_name = 'site_group_cache';
    public static $cache_name = 'site_group_menu_ids';
    public function __construct()
    {
        parent::__construct();
        $this->model = new SiteGroup();
    }

    /**
     * 站点分组列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'group_id, group_name, group_desc, app, addon, create_time, update_time';
        $search_model = $this->model->withSearch(['keywords'],$where)->field($field)->order('create_time desc');
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取所有分组
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getAll()
    {
        $field = 'group_id, group_name, group_desc, create_time, update_time, app';
        return $this->model->field($field)->select()->toArray();
    }

    /**
     * 分组详情
     * @param int $group_id
     * @return array
     */
    public function getInfo(int $group_id)
    {
        $field = 'group_id, group_name, group_desc, app, addon, create_time, update_time';
        return $this->model->where([['group_id', '=', $group_id]])->field($field)->findOrEmpty()->toArray();

    }

    /**
     * 添加站点分组
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        //判断应用是否全部是有效的已安装应用
        $this->checkAddon(array_merge($data['addon'], [ $data['app'] ] ));
        $res = $this->model->create($data);
        return $res->group_id;
    }

    /**
     * 修改站点分组
     * @param int $group_id
     * @param array $data
     * @return true
     */
    public function edit(int $group_id, array $data){
        //判断应用是否全部是有效的已安装应用
        $this->checkAddon($data['addon']);
        $this->model->update($data, [['group_id', '=', $group_id]]);
        //删除缓存
        $cache_name = self::$cache_name . $group_id;
        Cache::delete($cache_name);
        return true;
    }

    public function checkAddon($group_roles){
        $install_addon_list = (new CoreAddonService())->getInstallAddonList();
        $install_addon_keys = array_column($install_addon_list, 'key');
        if(count(array_intersect($install_addon_keys, $group_roles)) != count($group_roles)) throw new AdminException('SITE_GROUP_APP_NOT_EXIST');
        return true;
    }
    /**
     * 删除分组
     * @param int $group_id
     * @return bool
     * @throws DbException
     */
    public function del(int $group_id)
    {
        $count = (new Site())->where([['group_id', '=', $group_id]])->count();
        if($count > 0)
        {
            throw new AdminException('SITE_GROUP_IS_EXIST');
        }
        $res = $this->model->where([['group_id', '=', $group_id]])->delete();

        $cache_name = self::$cache_name . $group_id;
        Cache::delete($cache_name);
        return $res;
    }

    /**
     * 通过站点分组获取站点包含的权限和应用
     * @param $group_id
     * @return void
     */
    public function getGroupAddon($group_id){
        $cache_name = self::$cache_name . $group_id;
        return cache_remember(
            $cache_name,
            function () use ($group_id) {
                $group = $this->model->findOrEmpty($group_id);
                $addon = [];
                if (!$group->isEmpty()) {
                    $addon = array_merge([ $group['app'] ], $group['addon']);
                }
                return $addon;
            },
            [MenuService::$cache_tag_name,self::$cache_tag_name]
        );
    }

    /**
     * 创建所有权限的菜单
     */
    public function addAllMenuGroup()
    {
//        $menus = (new SysMenu())->where([['app_type', '=', 'site']])->column("menu_key");
        $data = [
            'group_name' => "默认套餐",
            'group_desc' => '',
            'app' => '',
            'addon' => []
        ];
        return $this->add($data);
    }
}
