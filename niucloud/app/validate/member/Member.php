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

use app\enum\common\CommonEnum;
use think\Validate;

/**
 * 会员验证
 * Class Member
 * @package app\validate\member
 */
class Member extends Validate
{


    protected $rule =   [
        'nickname'  => 'requireWithout:field|max:30|requireIf:field,nickname',
        'mobile'   => 'mobile',
        'sex' => 'checkSex',
        'birthday' => 'date',
        'username'  => 'require',
        'password' => 'require',
    ];

    protected $message  =   [
        'nickname.requireWithout' => 'validate_member.nickname_require',
        'nickname.requireIf' => 'validate_member.nickname_require',
        'nickname.max'     => 'validate_member.nickname_max',
        'mobile.require'   => 'validate_member.mobile_require',
        'mobile.mobile'   => 'validate_member.mobile_mobile',
        'birthday' => 'validate_member.birthday_format',
        'username.require' => 'validate_member.username_require',
        'username.unique' => 'validate_member.username_is_exist',
        'password.require' => 'validate_member.password_require',
    ];

    protected $scene = [
        'add'  =>  ['nickname', 'birthday', 'username', 'password'],
        'update'  =>  ['nickname', 'sex', 'birthday'],
        'modify'  =>  ['nickname', 'sex', 'birthday'],
        'account_register'  =>  ['username', 'password', 'mobile'],
        'reset_password' => ['password', 'mobile'],
    ];

    /**
     * 自定义验证 性别
     * @param $value
     * @param $rule
     * @param array $data
     * @return bool|string
     */
    protected function checkSex($value, $rule, $data = [])
    {
        return isset(CommonEnum::getSexType()[$value]) ? true : get_lang("validate_member.sex_bot_exist");
    }
}