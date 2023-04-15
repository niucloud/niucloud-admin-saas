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

use app\service\api\BaseApiService;
use app\service\core\captcha\CoreCaptchaService;

/**
 * 文章服务层
 * Class ArticleService
 * @package app\service\api\article
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
        return (new CoreCaptchaService())->create($this->site_id);
    }

    /**
     * 核验验证码
     * @return true
     */
    public function check(){
        return (new CoreCaptchaService())->check($this->site_id);
    }

}