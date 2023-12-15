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

use app\dict\pay\TransferDict;
use think\Validate;

/**
 * 提现账号验证类
 */
class CashOutAccount extends Validate
{
    protected $rule = [
        'account_type' => 'checkAccountType',
        'bank_name' => 'checkBankName',
        'account_no' => 'require',
        'realname' => 'require'
    ];

    protected $message = [
        'account_type.require' => 'validate_member_cash_out_account.account_type_require',
        'account_no.require' => 'validate_member_cash_out_account.account_no_require',
        'realname.require' => 'validate_member_cash_out_account.realname_require',
    ];

    protected $scene = [
        'addOrEdit' => ['account_type', 'bank_name', 'account_no', 'realname'],
    ];

    protected function checkBankName($value, $rule, $data = [])
    {
        return $data['account_type'] != 'bank' || !empty($value) ? true : 'validate_member_cash_out_account.bank_name_require';
    }

    protected function checkAccountType($value)
    {
        return array_key_exists($value, TransferDict::getTransferType()) ? true : 'validate_member_cash_out_account.not_support_transfer_type';
    }
}