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
 * 提现设置验证类
 * Class WithdrawConfig
 * @package app\validate\member
 */
class WithdrawConfig extends Validate
{


    protected $rule =  [
        'is_open' => 'in:0,1',  //是否开启
        'min' => 'min:0',    //最低提现金额
        'rate' => 'between:0,100',      //提现手续费比率
        'is_auto_verify' => 'in:0,1',  //是否自动审核
        'is_auto_transfer' => 'in:0,1',  //是否自动转账
        'transfer_type'  => 'require',
    ];

    protected $message  =   [
        'is_open.in' => 'validate_member.withdraw_is_open_in',
        'min.min' => 'validate_member.withdraw_min_min',
        'rate.between' => 'validate_member.withdraw_rate_between',
        'is_auto_verify.in' => 'validate_member.withdraw_is_auto_verify_in',
        'is_auto_transfer.in' => 'validate_member.withdraw_is_auto_transfer_in',
        'transfer_type.require' => 'validate_member_withdraw_config.transfer_type_require',
    ];

    protected $scene = [
        'set'  =>  ['is_open', 'min', 'rate', 'is_auto_verify', 'is_auto_transfer', 'transfer_type'],
    ];
}