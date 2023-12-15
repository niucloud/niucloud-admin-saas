<?php

namespace core\oauth;

use core\loader\Storage;

/**
 * 第三方授权基类
 * Class BaseOauth
 * @package core\oauth
 */
abstract class BaseOauth extends Storage
{
    protected $config;//配置
    protected $site_id;

    /**
     * 初始化
     * @param array $config
     * @return void
     */
    protected function initialize(array $config = [])
    {

    }

    /**
     * 获取粉丝信息
     * @param string|null $openid
     * @return mixed
     */
    abstract public function getFansInfo(string $openid = null);

    /**
     * 授权
     * @param string|null $code
     * @param array $options
     * @return mixed
     */
    abstract public function oauth(string $code = null, array $options = []);


}