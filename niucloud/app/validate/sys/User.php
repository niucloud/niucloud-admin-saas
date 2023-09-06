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

namespace app\validate\sys;

use think\Validate;

/**
 * Class User
 * @package app\validate\sys
 */
class User extends Validate
{

    //用户名或密码的规范可能是从数据库中获取的
    protected $rule = [
        'username' => 'require|unique:sys_user',
        'real_name' => 'requireWithout:field|requireIf:field,real_name',
        'password' => 'require',
    ];

    protected $message = [
        'username.require' => 'validate_user.username_require',
        'username.unique' => 'validate_user.username_unique',
        'username.max' => 'validate_user.username_max',
        'real_name.requireWithout' => 'validate_user.real_name_require',
        'real_name.requireIf' => 'validate_user.real_name_require',
        'password.require' => 'validate_user.password_require',
    ];

    protected $scene = [
        'add' => ['username', 'password'],
        'edit' => [],
        'modify' => []
    ];
}