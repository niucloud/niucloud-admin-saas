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

namespace app\adminapi\controller\auth;

use app\adminapi\controller\BaseAdminController;
use app\service\admin\auth\AuthService;
use app\service\admin\auth\AuthSiteService;
use app\service\admin\site\SiteUserService;


class Auth extends BaseAdminController
{

    /**
     * 登录用户菜单列表的接口
     */
    public function authMenuList(){
        return success((new AuthService())->getAuthMenuList(1));
    }

    /**
     * 获取登录用户信息
     * @return \think\Response
     */
    public function get(){
        return success((new AuthService())->getAuthInfo());
    }


    /**
     * 修改登录用户信息
     * @param $field
     * @return \think\Response
     */
    public function modify($field){
        $data = $this->request->params([
            ['value', ''],
            ['field', $field]
        ]);
//        $this->validate($data, 'app\validate\sys\User.modify');
        (new AuthService())->modifyAuth($field, $data['value']);
        return success(100004);
    }


    /**
     * 更新用户
     */
    public function update(){
        $data = $this->request->params([
            ['real_name', ''],
            ['head_img', ''],
            ['password', ''],
            ['original_password', '']
        ]);
//        $this->validate($data, 'app\validate\sys\User.update');
        (new AuthService())->updateAuth($data);
        return success(100004);
    }

    /**
     * 获取当前登录站点信息
     * @return \think\Response
     */
    public function site(){
        return success((new AuthSiteService())->getSiteInfo());
    }
}
