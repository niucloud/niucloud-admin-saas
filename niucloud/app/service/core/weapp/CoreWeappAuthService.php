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

use app\service\core\BaseCoreService;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
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
     * @param string $url
     * @param string $scopes
     * @return string
     * @throws InvalidArgumentException
     */
    public function session(int $site_id, ?string $code)
    {
        return CoreWeappService::app($site_id)->auth->session($code);
    }

    /**
     * 开发者后台校验与解密开放数据
     * @param string $session
     * @param string $iv
     * @param string $encryptedData
     * @return void
     */
    public function decryptData(int $site_id, string $session, string $iv, string $encrypted_data){
        return CoreWeappService::app($site_id)->encryptor->decryptData($session, $iv, $encrypted_data);
    }

    /**
     * 获取小程序手机号
     * @param int $site_id
     * @param string $code
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|ResponseInterface|string
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function getUserPhoneNumber(int $site_id,string $code){
        return CoreWeappService::app($site_id)->phone_number->getUserPhoneNumber($code);
    }
}