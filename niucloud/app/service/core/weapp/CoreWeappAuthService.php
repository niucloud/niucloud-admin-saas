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

namespace app\service\core\weapp;

use core\base\BaseCoreService;
use EasyWeChat\Kernel\Exceptions\DecryptException;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use EasyWeChat\Kernel\Exceptions\InvalidConfigException;
use EasyWeChat\Kernel\Support\Collection;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Http\Message\ResponseInterface;

/**
 * 微信小程序服务提供
 * Class CoreWeappAuthService
 * @package app\service\core\weapp
 */
class CoreWeappAuthService extends BaseCoreService
{


    /**
     * 网页授权
     * @param int $site_id
     * @param string|null $code
     * @return string
     * @throws InvalidConfigException
     */
    public function session(int $site_id, ?string $code)
    {
        return CoreWeappService::app($site_id)->auth->session($code);
    }

    /**
     * 开发者后台校验与解密开放数据
     * @param int $site_id
     * @param string $session
     * @param string $iv
     * @param string $encrypted_data
     * @return array
     * @throws DecryptException
     */
    public function decryptData(int $site_id, string $session, string $iv, string $encrypted_data){
        return CoreWeappService::app($site_id)->encryptor->decryptData($session, $iv, $encrypted_data);
    }

    /**
     * 获取小程序手机号
     * @param int $site_id
     * @param string $code
     * @return array|Collection|object|ResponseInterface|string
     * @throws InvalidConfigException
     * @throws GuzzleException
     */
    public function getUserPhoneNumber(int $site_id,string $code){
        return CoreWeappService::app($site_id)->phone_number->getUserPhoneNumber($code);
    }
}