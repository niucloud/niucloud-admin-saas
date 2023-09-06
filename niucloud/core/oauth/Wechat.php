<?php

namespace core\oauth;


use app\service\core\wechat\CoreWechatService;

/**
 * 微信公众号登录
 * Class Wechat
 * @package core\oauth
 */
class Wechat extends BaseOauth
{

    /**
     * @param array $config
     * @return void
     */
    protected function initialize(array $config = [])
    {
        parent::initialize($config);
    }

    public function getFansInfo(string $openid = null)
    {
        // TODO: Implement getFansInfo() method.
    }

    public function instance()
    {
        return CoreWechatService::app($this->site_id)->oauth;
    }

    public function oauth(string $code = null, array $options = [])
    {
//        $this->instance()->
        // TODO: Implement oauth() method.
    }
}