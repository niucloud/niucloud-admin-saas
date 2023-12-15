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

namespace app\validate\niucloud;

use think\Validate;

/**
 * 提现验证类
 */
class Module extends Validate
{
    protected $rule = [
        'auth_code' => 'require',
        'auth_secret' => 'require'
    ];

    protected $message = [
    ];

    protected $scene = [
        'set' => ['auth_code', 'auth_secret'],
    ];
}