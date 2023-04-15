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
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2023-01-07
 * Time: 18:08
 */

class Role extends Validate
{

    //用户名或密码的规范可能是从数据库中获取的
    protected $rule =   [
        'role_name'  => 'require',
    ];

    protected $message  =   [
        'role_name.require' => 'validate_role.role_name_require',
    ];

    protected $scene = [
        'add'  =>  ['role_name'],
        'update' => ['role_name']
    ];
}