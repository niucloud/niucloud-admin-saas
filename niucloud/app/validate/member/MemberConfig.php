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
 * 会员设置验证
 * Class LoginConfig
 * @package app\validate\member
 */
class MemberConfig extends Validate
{
    protected $rule =   [
        'length'  => 'number|min:10,max:20'
    ];

    protected $message  =   [
        'length.number' => 'validate_member_config.length_number',
        'length.min' => 'validate_member_config.length_min',
        'max.20' => 'validate_member_config.length_max'
    ];

    protected $scene = [
        'set'  =>  ['length'],
    ];
}