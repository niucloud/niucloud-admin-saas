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

use app\dict\site\SiteDict;
use app\Request;
use app\service\admin\site\SiteUserService;
use app\service\admin\sys\MenuService;
use app\service\admin\sys\RoleService;
use app\service\admin\user\UserRoleService;
use app\service\admin\user\UserService;
use app\service\core\site\CoreSiteService;
use core\base\BaseAdminService;
use core\exception\AuthException;
use Exception;

/**
 * 用户服务层
 * Class AuthService
 * @package app\service\admin\auth
 */
class AuthService extends BaseAdminService
{
    /**
     * 校验用户和传入站点是否存在从属关系
     * @param Request $request
     * @return true
     */
    public function checkSiteAuth(Request $request){
        $site_id = $request->adminSiteId();
        //todo  将站点编号转化为站点id
        $site_info = (new CoreSiteService())->getSiteCache($site_id);
        //站点不存在
        if(empty($site_info)) throw new AuthException('SITE_NOT_EXIST');
        //没有当前站点的信息
        if(!$this->getAuthRole($site_id)) throw new AuthException('NO_SITE_PERMISSION');

        $request->siteId($site_id);
        $request->appType($site_info['app_type']);
        return true;
    }



    /**
     * 校验权限
     * @param Request $request
     * @return bool
     * @throws Exception
     */
    public function checkRole(Request $request){

        $rule = strtolower(trim($request->rule()->getRule()));
        $method = strtolower(trim($request->method()));
        $site_info = (new AuthSiteService())->getSiteInfo();
        if($method != 'get'){
            if($site_info['status'] == SiteDict::EXPIRE) throw new AuthException('SITE_EXPIRE_NOT_ALLOW');
            if($site_info['status'] == SiteDict::CLOSE) throw new AuthException('SITE_CLOSE_NOT_ALLOW');
        }

        $menu_service = new MenuService();
        $all_menu_list = $menu_service->getAllApiList($this->app_type);
        //先判断当前访问的接口是否收到权限的限制
        $method_menu_list = $all_menu_list[$method] ?? [];
        if(!in_array($rule, $method_menu_list))
            return true;

        $auth_role_list = $this->getAuthApiList();
        if(!empty($auth_role_list[$method]) && in_array($rule, $auth_role_list[$method]))
            return true;

        throw new AuthException('NO_PERMISSION');

    }

    /**
     * 获取授权用户的权限信息
     * @return mixed
     */
    public function getAuthRole(int $site_id){
        $user_role_service = new UserRoleService();
        return $user_role_service->getUserRole($site_id, $this->uid);
    }

    /**
     * 当前授权用户接口权限
     * @return array
     */
    public function getAuthApiList(){
        $user_role_info = $this->getAuthRole($this->site_id);
        if(empty($user_role_info))
            return [];

        $is_admin = $user_role_info['is_admin'];//是否是超级管理员组
        $menu_service = new MenuService();
        if($is_admin){//查询全部启用的权限
            //获取站点信息
            return  (new AuthSiteService())->getApiList(1);
        }else{
            $user_role_ids = $user_role_info['role_ids'];
            $role_service = new RoleService();
            $menu_keys = $role_service->getMenuIdsByRoleIds($this->site_id, $user_role_ids);

            return $menu_service->getApiListByMenuKeys($menu_keys, $this->app_type);
        }

    }

    /**
     * 当前授权用户菜单权限
     * @return array
     */
    public function getAuthMenuList(int $is_tree = 0){
        $user_role_info = $this->getAuthRole($this->site_id);
        if(empty($user_role_info))
            return [];
        $is_admin = $user_role_info['is_admin'];//是否是超级管理员组
        $menu_service = new MenuService();
        if($is_admin){//查询全部启用的权限
            return (new AuthSiteService())->getMenuList($is_tree, 1);
//            return $menu_service->getAllMenuList($this->app_type, 1, $is_tree, 1);
        }else{
            $user_role_ids = $user_role_info['role_ids'];
            $role_service = new RoleService();
            $menu_keys = $role_service->getMenuIdsByRoleIds($this->site_id, $user_role_ids);
            return $menu_service->getMenuListByMenuKeys($menu_keys, $this->app_type, $is_tree);
        }
    }

    /**
     * 获取授权用户信息
     */
    public function getAuthInfo(){
        return (new SiteUserService())->getInfo($this->uid);
    }

    /**
     * 修改用户权限
     * @param string $field
     * @param $data
     * @return bool
     */
    public function modifyAuth(string $field, $data){
        return (new SiteUserService())->modify($this->uid, $field, $data);
    }

    /**
     * 修改用户
     * @param array $data
     * @return true
     */
    public function editAuth(array $data){
        if(!empty($data['password'])){
            //检测原始密码是否正确
            $user = (new UserService())->find($this->uid);
            if(!check_password($data['original_password'], $user->password))
                throw new AuthException('OLD_PASSWORD_ERROR');

        }
        return (new UserService())->edit($this->uid, $data);
    }

}