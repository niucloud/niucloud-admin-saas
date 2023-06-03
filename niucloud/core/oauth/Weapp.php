<?php

namespace core\oauth;


/**
 * 微信小程序授权
 * Class Weapp
 * @package core\oauth
 */
class Weapp extends BaseOauth
{

    /**
     * @param array $config
     * @return mixed|void
     */
    protected function initialize(array $config = [])
    {
        parent::initialize($config);
    }

    public function getFansInfo(string $openid = null)
    {
        // TODO: Implement getFansInfo() method.
    }

    public function oauth(string $code = null, array $options = [])
    {
        // TODO: Implement oauth() method.
    }
}