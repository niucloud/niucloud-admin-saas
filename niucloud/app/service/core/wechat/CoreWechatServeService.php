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

namespace app\service\core\wechat;

use core\base\BaseCoreService;
use EasyWeChat\Kernel\Exceptions\BadRequestException;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use EasyWeChat\Kernel\Exceptions\RuntimeException;
use Overtrue\Socialite\Contracts\UserInterface;
use Psr\Http\Message\ResponseInterface;
use ReflectionException;
use Throwable;

/**
 * 微信服务提供
 * Class CoreWechatServeService
 * @package app\service\core\wechat
 */
class CoreWechatServeService extends BaseCoreService
{


    /**
     * 网页授权
     * @param int $site_id
     * @param string $url
     * @param string $scopes
     * @return string
     * @throws InvalidArgumentException
     */
    public function authorization(int $site_id, string $url = '', string $scopes = 'snsapi_base')
    {
        $oauth = CoreWechatService::app($site_id)->oauth;
        $redirect_url = $oauth->scopes([$scopes])->redirect($url);
        return $redirect_url;
    }

    /**
     * 处理授权回调
     * @param int $site_id
     * @param string $code
     * @return UserInterface
     * @throws InvalidArgumentException
     */
    public function userFromCode(int $site_id, string $code)
    {
        $oauth = CoreWechatService::app($site_id)->oauth;
        $user = $oauth->userFromCode($code);
        return $user;
    }

    public function getUser($user)
    {
        $user->getId(); //对应微信的 openid
        $user->getNickname(); //对应微信的 nickname
        $user->getName(); //对应微信的 nickname
        $user->getAvatar(); //头像地址
        $user->getRaw(); //原始 API 返回的结果
        $user->getAccessToken(); //access_token
        $user->getRefreshToken(); //refresh_token
        $user->getExpiresIn(); //expires_in，Access Token 过期时间
        $user->getTokenResponse(); //返回 access_token 时的响应值
        //user中没有openid,  可以用id取
        return $user;
    }

    /**
     * 事件推送
     * @param $site_id
     * @return ResponseInterface
     * @throws BadRequestException
     * @throws InvalidArgumentException
     * @throws RuntimeException
     * @throws ReflectionException
     * @throws Throwable
     */
    public function serve(int $site_id)
    {

        $app = CoreWechatService::app($site_id);
        $app->server->push(function ($message) use ($site_id){
            return (new CoreWechatMessageService)->message($site_id, $message);
            // ...
        });
        $response = $app->server->serve();
        $response->send();
    }

    public function jssdkConfig(int $site_id, string $url = '')
    {
        $jssdk = CoreWechatService::app($site_id)->jssdk;
        $config = $jssdk->setUrl($url)->buildConfig([], false, false, false);
        return $config;
    }

    public function scan(int $site_id, string $key, int $expire_seconds = 6 * 24 * 3600){
        $result = CoreWechatService::app($site_id)->qrcode->temporary($key, $expire_seconds);
        return $result['url'];
    }
}