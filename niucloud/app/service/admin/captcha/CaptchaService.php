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

namespace app\service\admin\captcha;

use app\service\core\captcha\CoreCaptchaImgService;
use core\base\BaseAdminService;

/**
 * 验证码服务层
 */
class CaptchaService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();

    }

    /**
     * 创建验证码
     * @return array|null
     */
    public function create(){
        return (new CoreCaptchaImgService())->create();
    }

    /**
     * 核验验证码
     * @return true
     */
    public function check(){
        return (new CoreCaptchaImgService())->check();
    }

    public function verification(){
        return (new CoreCaptchaImgService())->verification();
    }


}