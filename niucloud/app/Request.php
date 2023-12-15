<?php

namespace app;
use app\dict\common\ChannelDict;

/**
 * Class Request
 * @package app
 */
// 应用请求对象类
class Request extends \think\Request
{
    //认证信息
    protected static $auth_info = [];

    protected static $site_id = 0;

    /**
     * 获取请求参数
     * @param array $params
     * @param bool $filter
     * @return array
     */
    public function params(array $params, bool $filter = true): array
    {
        $input = [];
//        $filter_rule = $filter ? 'strip_tags' : '';
        $filter_rule = '';
        foreach ($params as $param) {
            $key = $param[0];
            // 解析name
            if (strpos($key, '/')) {
                [$name, $type] = explode('/', $key);
            }else{
                $name = $key;
            }
            $default = $param[1];
            $item_filter = $param[2] ?? $filter;
            $input[$key] = $this->paramFilter($this->param($key, $default, $filter_rule ?? ''), $item_filter);
            //过滤后产生空字符串，按照默认值
            if($input[$name] === '')
            {
                $input[$name] = $default;
            }
        }
        return $input;
    }

    /**
     * 参数过滤
     * @param $param
     * @param bool $filter
     * @return array|string|string[]|null
     */
    public function paramFilter($param, bool $filter = true)
    {
        if (!$param || !$filter || !is_string($param)) return $param;
        // 把数据过滤
        $filter_rule = [
            "/<(\\/?)(script|i?frame|style|html|body|title|link|meta|object|\\?|\\%)([^>]*?)>/isU",
            "/(<[^>]*)on[a-zA-Z]+\s*=([^>]*>)/isU",
            "/select|join|where|drop|like|modify|rename|insert|update|table|database|alter|truncate|\'|\/\*|\.\.\/|\.\/|union|into|load_file|outfile/is"
        ];
        return preg_replace($filter_rule, '', $param);
    }

    /**
     * 获取登录用户的uid
     * @param int $uid
     * @return int|mixed|void
     */
    public function uid(int $uid = 0)
    {
        if ($uid > 0) {
            static::$auth_info['uid'] = $uid;
        } else {
            return static::$auth_info['uid'] ?? 0;
        }
    }


    /**
     * 获取登录会员的id
     */
    public function memberId(int $member_id = 0)
    {
        if ($member_id > 0) {
            static::$auth_info['member_id'] = $member_id;
        } else {
            return static::$auth_info['member_id'] ?? 0;
        }
    }

    /**
     * 站点id
     * @param int|string|null $site_id
     * @return int
     */
    public function siteId(int|string|null $site_id = 0)
    {
        if ($site_id > 0) {
            static::$site_id = (int)$site_id;
        } else {
            return static::$site_id ?? $this->defaultSiteId();
        }
    }

    /**
     * 用户账号
     * @param string $username
     * @return int|mixed
     */
    public function username(string $username = '')
    {
        if (!empty($username)) {
            static::$auth_info['username'] = $username;
        } else {
            return static::$auth_info['username'] ?? '';
        }
    }


    /**
     * 定义站点类型
     * @param string $app_type
     * @return mixed|string
     */
    public function appType(string $app_type = ''){
        if (!empty($app_type)) {
            static::$auth_info['app_type'] = $app_type;
        } else {
            return static::$auth_info['app_type'] ?? '';
        }
    }

    /**
     * 获取管理端token
     * @return array|string|null
     */
    public function adminToken(){
        return $this->header(system_name('admin_token_name'));
    }


    /**
     * 获取会员token
     * @return array|string|null
     */
    public function apiToken(){
        return $this->header(system_name('api_token_name'));
    }

    /**
     * 平台site_id
     * @return array|string|null
     */
    public function adminSiteId(){
        return $this->header(system_name('admin_site_id_name'));
    }

    /**
     * 客户端site_id
     * @return array|string|null
     */
    public function apiSiteId(){
        return $this->header(system_name('api_site_id_name'));
    }

    /**
     * 获取场景
     * @return array|string
     */
    public function getChannel(){
        return $this->header(system_name('channel_name'), ChannelDict::H5);
    }

    /**
     * 获取默认站点
     * @return int
     */
    public function defaultSiteId(){
        return 0;
    }

    /**
     * get传参追加值
     * @param $data
     * @return void
     */
    public function pushGet($data){
        $param = $this->get();
        $this->withGet(array_merge($param, $data));
    }

    /**
     * header传参追加值
     * @param $data
     * @return void
     */
    public function pushHeader($data){
        $param = $this->header();
        $this->withHeader(array_merge($param, $data));
    }

    /**
     * 授权信息
     * @param $key
     * @param $value
     * @return mixed|string|void
     */
    public function auth($key, $value = ''){
        if (!empty($value)) {
            static::$auth_info[$key] = $value;
        } else {
            return static::$auth_info[$key] ?? '';
        }
    }
}
