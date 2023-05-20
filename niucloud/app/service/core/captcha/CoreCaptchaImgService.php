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
use core\exception\AuthException;
use core\exception\CaptchaException;
use Fastknife\Exception\ParamException;
use Fastknife\Service\BlockPuzzleCaptchaService;
use Fastknife\Service\ClickWordCaptchaService;

/**
 * 验证码服务层
 * Class CoreCaptchaService
 * @package app\service\core\captcha;
 */
class CoreCaptchaImgService extends BaseCoreService
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
    public function create(){
        $captcha_type = 'blockPuzzle';
        $service = $this->getCaptchaService($captcha_type);
        return $service->get();
    }

    /**
     * 一次验证验证码
     * @param Request $request
     * @return true
     */
    public function check(){
        try {
            [$captcha_key, $captcha_code] = $this->validate();
            $service = $this->getCaptchaService();
            $service->check($captcha_key, $captcha_code);
            return true;
        } catch (\Exception $e) {
            throw new CaptchaException('CAPTCHA_ERROR');
        }
    }

    /**
     * 一次验证验证码
     * @param Request $request
     * @return true
     */
    public function verification(){
        try {
            [$captcha_key, $captcha_code] = $this->validate();
            $service = $this->getCaptchaService();
            $service->verificationByEncryptCode($captcha_code);
            return true;
        } catch (ParamException $e) {
            throw new CaptchaException('CAPTCHA_ERROR');
        }
    }

    /**
     * 验证验证码参数
     * @return true
     */
    protected function validate(){
        $captcha_key = request()->param('captcha_key', '');
        $captcha_code = request()->param('captcha_code', '');
        if(empty($captcha_code)) throw new CaptchaException('CAPTCHA_ERROR');
        return [$captcha_key, $captcha_code];
    }
    protected function getCaptchaService($captcha_type = 'blockPuzzle')
    {
        $config = config('imgcaptcha');
        switch ($captcha_type) {
            case 'clickWord':
                $service = new ClickWordCaptchaService($config);
                break;
            case 'blockPuzzle':
                $service = new BlockPuzzleCaptchaService($config);
                break;
            default:
                throw new AuthException('');
        }
        return $service;
    }
}