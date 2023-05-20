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

namespace app\service\api\captcha;

use app\service\core\captcha\CoreCaptchaService;
use core\base\BaseApiService;

/**
 * 验证码服务层
 */
class CaptchaService extends BaseApiService
{

    public function __construct()
    {
        parent::__construct();

    }

    /**
     * 创建验证码
     * @param array|null $data
     * @return array|null
     */
    public function create(?array $data = []){
        return (new CoreCaptchaService())->create(0);
    }

    /**
     * 核验验证码
     * @return true
     */
    public function check(){
        return (new CoreCaptchaService())->check(0);
    }

}