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

namespace app\service\admin\home;


use app\dict\sys\AppTypeDict;
use app\dict\sys\MenuTypeDict;
use app\model\site\Site;
use app\model\sys\SysMenu;
use app\model\sys\SysUserRole;
use app\service\admin\auth\AuthService;
use app\service\admin\site\SiteService;
use app\service\admin\sys\RoleService;
use core\base\BaseAdminService;
use core\exception\HomeException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

/**
 * 用户服务层
 * Class BaseService
 * @package app\service
 */
class AuthSiteService extends BaseAdminService
{
    public static $role_cache_name = 'user_site_cache';
    public function __construct()
    {
        parent::__construct();
        $this->model = new Site();
    }

    /**
     * 获取授权当前的站点信息
     */
    public function getSiteInfo($site_id){
        $this->checkSite($site_id);
        //通过用户id获取
        $field = 'site_id, site_name, front_end_name, front_end_logo, app_type, keywords, logo, icon, `desc`, status, latitude, longitude, province_id, city_id, 
        district_id, address, full_address, phone, business_hours, create_time, expire_time, group_id, app';
        return $this->model->where([ [ 'site_id', '=', $site_id ] ])->with(['groupName', 'addon'])->field($field)->append([ 'status_name' ])->findOrEmpty()->toArray();
    }

    /**
     * 获取授权账号下的站点列表
     * @param array $where
     * @return array
     * @throws DbException
     */
    public function getSitePage(array $where = [])
    {
        $field = 'site_id, site_name, front_end_name, front_end_logo, app_type, keywords, logo, icon, `desc`, status, latitude, longitude, province_id, city_id, 
        district_id, address, full_address, phone, business_hours, create_time, expire_time, group_id, app';
        $condition = [
            ['site_id', '<>', request()->defaultSiteId()],
        ];
        if (!AuthService::isSuperAdmin()) $condition[] = ['site_id', 'in', $this->getSiteIds()];
        $search_model = $this->model->where($condition)->withSearch([ 'create_time', 'expire_time', 'keywords', 'status', 'group_id', 'app' ], $where)->with(['groupName'])->field($field)->append([ 'status_name' ])->order('create_time desc');
        return $this->pageQuery($search_model);
    }

    /**
     * 查询用户角色类表
     * @param int $uid
     * @return mixed|string
     */
    public function getSiteIds(){
        $cache_name = 'user_role_list_'.$this->uid;
        return cache_remember(
            $cache_name,
            function(){
                $user_role_model = new SysUserRole();
                $where = array(
                    ['uid', '=', $this->uid],
                    ['site_id', '<>', request()->defaultSiteId()],
                    ['status', '=', 1]
                );
                $list = $user_role_model->where($where)->select()->toArray();
                return array_column($list, 'site_id');
            },
            [self::$role_cache_name]
        );
    }

    /**
     * 编辑站点信息
     * @param int $site_id
     * @param array $data
     * @return true
     */
    public function editSite(int $site_id, array $data){
        $this->checkSite($site_id);
        $this->model->where([['site_id', '=', $site_id]])->update($data);
        return true;
    }

    /**
     * 校验是否合法
     * @param $site_id
     * @return void
     */
    public function checkSite($site_id){
        $site_ids = $this->getSiteIds();
        if(!in_array($site_id, $site_ids)) throw new HomeException('USER_ROLE_NOT_HAS_SITE');//无效的站点
    }
}
