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

use app\model\site\Site;
use app\model\site\SiteGroup;
use app\service\admin\BaseAdminService;
use app\service\admin\sys\MenuService;
use extend\exception\AdminException;
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
     * @return \think\model\relation\HasOne
     */
    public function getPage(array $where = [])
    {
        $field = 'group_id, group_name, group_desc, group_roles, app_type, create_time, update_time';
        $search_model = $this->model->withSearch(['keywords'],$where)->field($field)->order('create_time desc');
        $data = $this->pageQuery($search_model);
        return $data;
    }

    /**
     * 获取所有分组
     * @return array
     */
    public function getAll()
    {
        $field = 'group_id, group_name, group_desc, group_roles, app_type, create_time, update_time';
        return $this->model->field($field)->select()->toArray();

    }
    /**
     * 分组详情
     * @param int $group_id
     * @return array
     */
    public function getInfo(int $group_id)
    {
        $field = 'group_id, group_name, group_desc, group_roles, app_type, create_time, update_time';
        return $this->model->where([['group_id', '=', $group_id]])->field($field)->findOrEmpty()->toArray();

    }

    /**
     * 添加站点分组
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {

        $res = $this->model->create($data);
        return $res->group_id;
    }

    /**
     * 修改站点分组
     * @param int $group_id
     * @param array $data
     * @return SiteGroup
     */
    public function update(int $group_id, array $data){
        $this->model->update($data, [['group_id', '=', $group_id]]);
        //删除缓存
        $cache_name = self::$cache_name . $group_id;
        Cache::delete($cache_name);
        return true;
    }

    /**
     * 删除分组
     * @param int $group_id
     * @return bool
     */
    public function del(int $group_id)
    {
        $count = (new Site())->where([['group_id', '=', $group_id]])->count();
        if($count > 0)
        {
            throw new AdminException(600001);
        }
        $res = $this->model->where([['group_id', '=', $group_id]])->delete();

        $cache_name = self::$cache_name . $group_id;
        Cache::delete($cache_name);
        return $res;
    }

    /**
     * 通过站点分组获取站点权限菜单
     * @param $group_id
     * @return void
     */
    public function getMenuIdsByGroupId($group_id){
        $cache_name = self::$cache_name . $group_id;
        return Cache::tag([MenuService::$cache_tag_name,self::$cache_tag_name])->remember($cache_name, function () use ($group_id) {
            return $this->model->findOrEmpty($group_id)?->group_roles ?? [];
        });
    }
}