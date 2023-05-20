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

use app\enum\member\MemberAccountEnum;
use app\enum\pay\TransferEnum;
use think\Validate;

/**
 * 提现验证类
 */
class CashOut extends Validate
{
    protected $rule =  [
        'apply_money' => 'min:0.01',  // 提现金额
        'account_type' => "checkAccountType",
        'transfer_type' => 'checkTransferType',
        'account_id' => 'checkAccountId'
    ];

    protected $message  =   [
        'apply_money.min' => 'validate_member_cash_out.apply_money_min',
    ];

    protected $scene = [
        'apply'  =>  ['apply_money', 'account_type', 'transfer_type', 'account_id'],
    ];

    protected function checkAccountId($value, $rule, $data = []) {
        if ($data['transfer_type'] == TransferEnum::WECHAT) {
            return true;
        } else {
            return !empty($value) ? true : 'validate_member_cash_out.account_id_require';
        }
    }

    protected function checkTransferType($value){
        $transfer_type = array_keys(TransferEnum::getTransferType());
        return in_array($value, $transfer_type) ? true : 'validate_member_cash_out.not_support_transfer_type';
    }

    protected function checkAccountType($value) {
        $account_type = [ MemberAccountEnum::MONEY, MemberAccountEnum::COMMISSION ];
        return in_array($value, $account_type) ? true : 'validate_member_cash_out.not_support_account_type';
    }
}