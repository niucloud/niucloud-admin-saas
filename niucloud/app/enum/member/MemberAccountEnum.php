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

namespace app\enum\member;

/**
 * 会员账户类型
 * Class MemberAccountEnum
 * @package app\enum\member
 */
class MemberAccountEnum
{
    //会员积分
    const POINT   = 'point';
    //会员余额
    const BALANCE  = 'balance';

    //会员零钱
    const MONEY  = 'money';

    //账户增加
    const INC = 'inc';

    //账户减少
    const DEC = 'dec';

    public static function getType($type = '')
    {
        $data = [
            self::POINT => get_lang('enum_member.account_point'),
            self::BALANCE => get_lang('enum_member.account_balance'),
            self::MONEY => get_lang('enum_member.account_money'),
        ];
        if (empty($type)) {
            return $data;
        }
        return $data[$type] ?? '';
    }


    public static function getFromType($type = ''){

        $data = [
            self::POINT => [
                //调整
                'adjust' => [
                    //名称
                    'name' => get_lang('enum_member.account_point_adjust'),
                    //是否增加
                    self::INC => 1,
                    //是否减少
                    self::DEC => 1,
                ],
                //充值赠送
                'recharge_give' => [
                    //名称
                    'name' => get_lang('enum_member.account_point_recharge_give'),
                    //是否增加
                    self::INC => 1,
                    //是否减少
                    self::DEC => 0,
                ],

            ],
            self::BALANCE => [
                //调整
                'adjust' => [
                    //名称
                    'name' => get_lang('enum_member.account_balance_adjust'),
                    //是否增加
                    self::INC => 1,
                    //是否减少
                    self::DEC => 1,
                ],
                //充值
                'recharge' => [
                    //名称
                    'name' => get_lang('enum_member.account_balance_recharge'),
                    //是否增加
                    self::INC => 1,
                    //是否减少
                    self::DEC => 0,
                ],
            ],
            self::MONEY => [

                //活动奖励
                'award' => [
                    //名称
                    'name' => get_lang('enum_member.account_money_award'),
                    //是否增加
                    self::INC => 1,
                    //是否减少
                    self::DEC => 0,
                ],
                //提现
                'withdraw' => [
                    //名称
                    'name' => get_lang('enum_member.account_money_withdraw'),
                    //是否增加
                    self::INC => 1,
                    //是否减少
                    self::DEC => 0,
                ],
            ],
        ];
        if (empty($type)) {
            return $data;
        }
        return $data[$type] ?? '';
    }

}