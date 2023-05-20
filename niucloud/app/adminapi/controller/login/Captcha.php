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

use app\service\admin\captcha\CaptchaService;
use core\base\BaseAdminController;
use think\Response;

class Captcha extends BaseAdminController
{


    /**
     * 创建验证码
     * @return Response
     */
    public function create(){
        return success((new CaptchaService())->create());
    }

    /**
     * 一次校验验证码
     * @return Response
     */
    public function check(){
        return success((new CaptchaService())->check());
    }

    /**
     * 二次校验验证码
     * @return Response
     */
    public function verification(){
        return success((new CaptchaService())->verification());
    }

}
