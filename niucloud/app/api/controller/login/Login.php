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

namespace app\api\controller\login;

use app\BaseController;
use app\service\api\captcha\CaptchaService;
use app\service\api\login\LoginService;
use app\service\api\scan\ScanService;
use think\Response;

class Login extends BaseController
{
    /**
     * 登录
     * @return Response
     */
    public function login(){

        $data = $this->request->params([
            ['username', ''],
            ['password', ''],
        ]);
        //参数验证
        //验证码验证
        $result = (new LoginService())->account($data['username'], $data['password']);
        if(!$result){
            //账号密码错误...., 重置验证码
            return fail(301003);
        }
        return success($result);

    }

    /**
     * 登出
     * @return Response
     */
    public function logout(){
        (new LoginService)->logout();
        return success(301006);
    }

    /**
     * 创建验证码
     * @return Response
     */
    public function captcha(){
        return success((new CaptchaService())->create());
    }

    /**
     * 发送手机验证码
     * @return void
     */
    public function sendMobileCode($type){
        $data = $this->request->params([
            ['mobile',  ''],
        ]);
        return success((new LoginService())->sendMobileCode($data['mobile'], $type));
    }

    /**
     * 手机号登录
     * @return void
     */
    public function mobile(){
        $data = $this->request->params([
            ['mobile',  ''],
        ]);
        return success((new LoginService())->mobile($data['mobile']));
    }

    /**
     * 重置密码
     * @return Response
     */
    public function resetPassword(){
        $data = $this->request->params([
            ['mobile',  ''],
            ['password', '']
        ]);
        //参数验证
        $this->validate($data, 'app\validate\member\Member.reset_password');
        (new LoginService())->resetPassword($data['mobile'], $data['password']);
        return success(301017);
    }
}
