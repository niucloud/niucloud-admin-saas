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

namespace app\validate\member;

use think\Validate;

/**
 * 注册与登录设置验证
 * Class LoginConfig
 * @package app\validate\member
 */
class LoginConfig extends Validate
{


    protected $rule = [
        'is_username' => 'number|between:0,1',
        'is_mobile' => 'number|between:0,1',
        'is_auth_register' => 'number|between:0,1',
        'is_bind_mobile' => 'number|between:0,1',

    ];

    protected $message = [
        'is_username.number' => 'validate_member.is_username_number',
        'is_username.between' => 'validate_member.is_username_between',
        'is_mobile.number' => 'validate_member.is_mobile_number',
        'is_mobile.between' => 'validate_member.is_mobile_between',
        'is_auth_register.number' => 'validate_member.is_auth_register_number',
        'is_auth_register.between' => 'validate_member.is_auth_register_between',
        'is_bind_mobile.number' => 'validate_member.is_bind_mobile_number',
        'is_bind_mobile.between' => 'validate_member.is_bind_mobile_between',
    ];

    protected $scene = [
        'set' => ['is_username', 'is_mobile', 'is_auth_register', 'is_bind_mobile'],
    ];
}