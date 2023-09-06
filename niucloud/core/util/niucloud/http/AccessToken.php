<?php

namespace core\util\niucloud\http;

use core\exception\NiucloudException;
use GuzzleHttp\Exception\GuzzleException;
use think\facade\Cache;


trait AccessToken
{
    /**
     * 授权token
     * @var mixed
     */
    protected $access_token;
    /**
     * header token key值
     * @var string
     */
    protected string $access_token_key = 'access-token';
    /**
     * access_token缓存键名
     * @var string
     */
    protected string $access_token_cache = 'niucloud_access_token';


    /**
     * 清除access_token
     * @return $this
     */
    public function clearAccessToken()
    {
        $this->access_token = '';
        Cache::delete($this->access_token_cache);
        return $this;
    }
    /**
     * 设置access_token
     * @param $access_token
     * @return $this
     */
    public function setAccessToken($access_token)
    {
        $this->access_token = $access_token;
        Cache::set($this->access_token_cache, $access_token, 7200);
        return $this;
    }
    /**
     * @return mixed
     */
    public function getAccessToken()
    {
        if (empty($this->access_token)) {
            $this->access_token = Cache::get($this->access_token_cache, '');
        }
        return $this->access_token;
    }

    /**
     * 刷新access_token
     * @return void
     * @throws GuzzleException
     */
    public function refreshAccessToken()
    {
        $access_token_info = $this->httpGet('auth', ['code' => $this->code, 'secret' => $this->secret, 'token' => $this->createToken(), 'redirect_uri' => $this->getDomain(false)]);
        if (isset($access_token_info['code']) && $access_token_info['code'] != 1) throw new NiucloudException($access_token_info['msg']);
    }

}
