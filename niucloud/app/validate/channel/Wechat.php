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

namespace app\validate\channel;

use think\Validate;

/**
 * 微信配置验证类
 */
class Wechat extends Validate
{

    //用户名或密码的规范可能是从数据库中获取的
    protected $rule = [
        'app_id' => 'require',
        'app_secret' => 'require',//防止key值重复


    ];

    protected $message = [
        'app_id.require' => 'validate_wechat.appid_require',
        'app_secret.require' => 'validate_wechat.appsecret_require',

    ];

    protected $scene = [
        'set' => ['app_id', 'app_secret'],
    ];


}