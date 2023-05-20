<?php

use app\enum\member\MemberAccountEnum;

return [
    MemberAccountEnum::POINT => [
        //调整
        'adjust' => [
            //名称
            'name' => get_lang('enum_member.account_point_adjust'),
            //是否增加
            MemberAccountEnum::INC => 1,
            //是否减少
            MemberAccountEnum::DEC => 1,
        ],
        //充值赠送
        'recharge_give' => [
            //名称
            'name' => get_lang('enum_member.account_point_recharge_give'),
            //是否增加
            MemberAccountEnum::INC => 1,
            //是否减少
            MemberAccountEnum::DEC => 0,
        ],

    ],
    MemberAccountEnum::BALANCE => [
        //调整
        'adjust' => [
            //名称
            'name' => get_lang('enum_member.account_balance_adjust'),
            //是否增加
            MemberAccountEnum::INC => 1,
            //是否减少
            MemberAccountEnum::DEC => 1,
        ],
        //充值
        'recharge' => [
            //名称
            'name' => get_lang('enum_member.account_balance_recharge'),
            //是否增加
            MemberAccountEnum::INC => 1,
            //是否减少
            MemberAccountEnum::DEC => 0,
        ],
        'recharge_refund' => [
            //名称
            'name' => get_lang('enum_member.account_balance_recharge_refund'),
            //是否增加
            MemberAccountEnum::INC => 0,
            //是否减少
            MemberAccountEnum::DEC => 1,
        ]
    ],
    MemberAccountEnum::MONEY => [

        //活动奖励
        'award' => [
            //名称
            'name' => get_lang('enum_member.account_money_award'),
            //是否增加
            MemberAccountEnum::INC => 1,
            //是否减少
            MemberAccountEnum::DEC => 0,
        ],
        //提现
        'cash_out' => [
            //名称
            'name' => get_lang('enum_member.account_money_cash_out'),
            //是否增加
            MemberAccountEnum::INC => 0,
            //是否减少
            MemberAccountEnum::DEC => 1,
        ],
    ],
    //会员佣金
    MemberAccountEnum::COMMISSION => [

        //活动奖励
        'award' => [
            //名称
            'name' => get_lang('enum_member.account_commission_award'),
            //是否增加
            MemberAccountEnum::INC => 1,
            //是否减少
            MemberAccountEnum::DEC => 0,
        ],
        //提现
        'cash_out' => [
            //名称
            'name' => get_lang('enum_member.account_commission_cash_out'),
            //是否增加
            MemberAccountEnum::INC => 0,
            //是否减少
            MemberAccountEnum::DEC => 1,
        ],
    ]
];