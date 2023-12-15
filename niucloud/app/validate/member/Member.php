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

use app\dict\common\CommonDict;
use app\dict\member\MemberDict;
use think\facade\Lang;
use think\Validate;

/**
 * 会员验证
 * Class Member
 * @package app\validate\member
 */
class Member extends Validate
{


    protected $rule = [
        'nickname' => 'requireWithout:field|max:30|requireIf:field,nickname',
        'mobile' => 'mobile',
        'sex' => 'checkSex',
        'birthday' => 'date',
        'username' => 'require|checkUsername',
        'password' => 'require',
        'status' => 'require|checkStatus',
    ];

    protected $message = [
        'nickname.requireWithout' => 'validate_member.nickname_require',
        'nickname.requireIf' => 'validate_member.nickname_require',
        'nickname.max' => 'validate_member.nickname_max',
        'mobile.require' => 'validate_member.mobile_require',
        'mobile.mobile' => 'validate_member.mobile_mobile',
        'birthday' => 'validate_member.birthday_format',
        'username.require' => 'validate_member.username_require',
        'username.unique' => 'validate_member.username_is_exist',
        'password.require' => 'validate_member.password_require',

        'status.require' => 'validate_member.status_require',

    ];

    protected $scene = [
        'add' => ['birthday', 'mobile', 'password'],
        'edit' => ['sex', 'birthday'],
        'modify' => ['sex', 'birthday'],
        'account_register' => ['username', 'password', 'mobile'],
        'reset_password' => ['password', 'mobile'],
        'set_status' => ['status']
    ];

    /**
     * 账号不能是纯数字
     * @param $value
     * @param $rule
     * @param $data
     * @return Lang|true
     */
    public function checkUsername($value, $rule, $data = []){
        return preg_match('/^\d+$/', $value) ? get_lang("validate_member.username_cannot_pure_number") : true;
    }

    /**
     * 自定义验证 性别
     * @param $value
     * @param $rule
     * @param array $data
     * @return Lang|true
     */
    protected function checkSex($value, $rule, $data = [])
    {
        return isset(CommonDict::getSexType()[$value]) ? true : get_lang("validate_member.sex_bot_exist");
    }

    protected function checkStatus($value, $rule, $data = [])
    {
        return isset(MemberDict::getStatus()[$value]) ? true : get_lang("validate_member.not_exit_status");
    }
}