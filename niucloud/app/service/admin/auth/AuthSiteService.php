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

namespace app\service\admin\auth;


use app\model\site\Site;
use app\service\admin\site\SiteService;
use core\base\BaseAdminService;
use think\facade\Cache;

/**
 * 用户服务层
 * Class BaseService
 * @package app\service
 */
class AuthSiteService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Site();
    }

    /**
     * 获取授权当前的站点信息
     */
    public function getSiteInfo(){
        //通过用户id获取
        return (new SiteService())->getSiteCache($this->site_id);
    }

    /**
     * 获取授权用户旗下的站点列表
     */
    public function getSiteList(){
        //通过用户id获取
        $cache_name = 'site_list'.'_'.$this->uid;
        return Cache::tag(SiteService::$cache_tag_name)->remember($cache_name, function (){
            $auth_service = new AuthService();
            $user_role_list = $auth_service->getAuthSiteRoleList();
            $site_ids = array_column($user_role_list, 'site_id');
            $site_list = $this->model->where([['site_id', 'in', $site_ids]])->field('app_type,site_name,logo')->column('site_id, site_name, logo, app_type');
            return $site_list;
        });
    }

    /**
     * 通过站点id获取菜单列表
     * @param int $site_id
     * @return mixed
     */
    public function getMenuList(int $is_tree, int|string $status){
        return (new SiteService())->getMenuList($this->site_id, $is_tree, $status);
    }

    /**
     * 通过站点id获取菜单列表
     * @param int $site_id
     * @return mixed
     */
    public function getApiList(int|string $status){
        return (new SiteService())->getApiList($this->site_id, $status);
    }


}