<?php

namespace core\util\niucloud\http;

use core\exception\NiucloudException;
use think\facade\Cache;


trait Token
{
    /**
     * token缓存键名
     * @var string
     */
    protected string $token_cache = 'niucloud_token';

    /**
     * 校验证书
     * @return $this
     */
    public function validateSignature()
    {
        if ($this->request->get('signature') !== $this->signature([
                $this->getToken(),
                $this->request->get('timestamp'),
                $this->request->get('nonce'),
            ])) {
            throw new NiucloudException('Invalid request signature.');
        }
        return true;
    }

    /**
     * 生成临时证书
     * @param array $params
     * @return string
     */
    protected function signature(array $params)
    {
        sort($params, SORT_STRING);

        return sha1(implode($params));
    }

    /**
     * 获取TOKEN
     * @return void
     */
    public function getToken(){
        return Cache::get($this->token_cache, '');
    }

    /**
     * 新创建一个token(todo  临时)
     * @return void
     */
    public function createToken(){
        //根据code和secret生成token
        $token = md5(serialize(
            [
                'timestamp' => time(),
                'code' => $this->code,
                'secret' => $this->secret,
                'nonce' => mt_rand(0, 100)
            ]
        ));
        $this->clearToken();
        Cache::set($this->token_cache, $token, 3600);
        return $token;
    }

    /**
     * @return $this
     */
    public function clearToken()
    {
        $this->access_token = '';
        Cache::delete($this->token_cache);
        return $this;
    }
}
