<?php
// +----------------------------------------------------------------------
// | Niushop商城系统 - 团队十年电商经验汇集巨献!
// +----------------------------------------------------------------------
// | Copyright (c) 2022~2025 https://www.niushop.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed Niushop并不是自由软件，未经许可不能去掉Niushop相关版权
// +----------------------------------------------------------------------
// | Author: Niushop Team <niucloud@outlook.com>
// +----------------------------------------------------------------------

namespace extend\util;

use Firebase\JWT\JWT;
use think\facade\Cache;
use think\facade\Env;


/**
 * token工具类
 * Class TokenUtil
 * @package extend\util
 */
class TokenUtil
{
    private $token;

    /**
     *创建token
     * @param int $id 编码  一般传入用户id
     * @param string $type 类型（admin，site，home）
     * @param array $params 参数  传入id, name
     * @param int $expire_time 有效期
     * @return array
     */
    public static function createToken(int $id, string $type, array $params = [], int $expire_time = 0): array
    {
        $host = app()->request->host();
        $time = time();
        $params += [
            'iss' => $host,
            'aud' => $host,
            'iat' => $time,
            'nbf' => $time,
            'exp' => $time + $expire_time,
        ];

        $params['jti'] = $id . "_" . $type;
        $token = JWT::encode($params, Env::get('app.app_key', 'niushop456$%^'));
        $cache_token = Cache::get("token_" . $params['jti']);
        $cache_token_arr = $cache_token ?: [];
//        if(!empty($cache_token))
//        {
//
//            $cache_token_arr[] = $token;
//        }
        $cache_token_arr[] = $token;
        Cache::tag("token")->set("token_" . $params['jti'], $cache_token_arr);
        return compact('token', 'params');
    }

    /**
     * 解析token
     * @param string $token
     * @param string $type
     * @return array
     */
    public static function parseToken(string $token, string $type): array
    {
        $payload = JWT::decode($token, Env::get('app.app_key', 'niushop456$%^'), ['HS256']);
        if (!empty($payload)) {
            $token_info = json_decode(json_encode($payload), true);

            if (explode("_", $token_info['jti'])[1] != $type) {
                return [];
            }
            if (!empty($token_info) && !in_array($token, Cache::get('token_' . $token_info['jti'], []))) {
                return [];
            }
            return $token_info;
        } else {
            return [];
        }
    }

    /**
     * 清理token
     * @param int $id
     * @param string $type
     */
    public static function clearToken(int $id, string $type, ?string $token = '')
    {
        if (!empty($token)) {
            $token_cache = Cache::get("token_" . $id . "_" . $type, []);
            //todo 也可以通过修改过期时间来实现
            if (!empty($token_cache)) {
                if (($key = array_search($token, $token_cache)) !== false) {
                    array_splice($token_cache, $key, 1);
                }
                Cache::set("token_" . $id . "_" . $type, $token_cache);
            }
        } else {
            Cache::set("token_" . $id . "_" . $type, []);
        }
        return success();
    }
}
