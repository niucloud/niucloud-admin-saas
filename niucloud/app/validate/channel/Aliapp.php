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
 * 支付宝小程序配置验证类
 */
class Aliapp extends Validate
{

    //用户名或密码的规范可能是从数据库中获取的
    protected $rule = [
        'app_id' => 'require',
        'private_key' => 'require',
        'aes_key' => 'require',


    ];

    protected $message = [
    ];

    protected $scene = [
        'set' => ['app_id', 'private_key', 'aes_key'],
    ];


}