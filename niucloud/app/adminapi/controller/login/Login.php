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

namespace app\adminapi\controller\login;

use app\service\admin\auth\ConfigService;
use app\service\admin\auth\LoginService;
use app\service\admin\upgrade\UpgradeService;
use app\service\core\addon\CoreAddonDevelopBuildService;
use app\service\core\menu\CoreMenuService;
use core\base\BaseAdminController;
use think\Response;

class Login extends BaseAdminController
{
    /**
     * 登录
     * @return Response
     */
    public function login($app_type)
    {

        $data = $this->request->params([
            ['username', ''],
            ['password', ''],
        ]);
        //参数验证
        //验证码验证
        $result = (new LoginService())->login($data['username'], $data['password'], $app_type);
        if (!$result) {
            //账号密码错误...., 重置验证码
            return fail('USER_ERROR');
        }
        return success($result);

    }

    /**
     * 登出
     * @return Response
     */
    public function logout()
    {
        (new LoginService)->logout();
        return success('LOGOUT');
    }


    /**
     * 获取登录设置
     * @return Response
     */
    public function getConfig()
    {
        return success((new ConfigService())->getConfig());
    }

    public function test(){
        (new CoreMenuService())->refreshAddonMenu('shop');
//        (new CoreAddonDevelopBuildService())->build('shop');
    }
}
