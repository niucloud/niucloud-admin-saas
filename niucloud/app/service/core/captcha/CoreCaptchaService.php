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

namespace app\service\core\captcha;

use app\Request;
use core\base\BaseCoreService;
use core\exception\CaptchaException;
use think\captcha\facade\Captcha;
use think\facade\Cache;

/**
 * 验证码服务层
 * Class CoreCaptchaService
 * @package app\service\core\captcha;
 */
class CoreCaptchaService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 创建验证码
     * @param int $site_id
     * @param array|null $data
     * @return array
     */
    public function create(int $site_id = 0, ?array $data = []){
        $captcha_data = Captcha::create(null, true);

        $captcha_key   = md5(uniqid('', true));
        // 验证码10分钟有效
        Cache::set($captcha_key, $captcha_data['code'], 600);
        return [
            'captcha_key' => $captcha_key,
            'img' => $captcha_data['img'],
        ];
    }

    /**
     * 核验验证码
     * @return true
     */
    public function check(){
        $captcha_key = request()->param('captcha_key', '');
        $captcha_code = request()->param('captcha_code', '');
        if(empty($captcha_key) || empty($captcha_code)) throw new CaptchaException('CAPTCHA_ERROR');
        $captcha = Cache::pull($captcha_key);
        if (empty($captcha)) throw new CaptchaException('CAPTCHA_ERROR');

        if ($captcha_code != $captcha) throw new CaptchaException('CAPTCHA_ERROR');

        return true;
    }
}