<?php
return [
    'verify_code' => [
        'key' => 'verify_code',
        'receiver_type' => 0,
        'name' => '手机验证码',
        'title' => '管理端验证码登录',
        'async' => false,
        'variable' => [
            'code' => '验证码'
        ],
    ],
    //手机验证码，站点应用发送
    'member_verify_code' => [
        'key' => 'member_verify_code',
        'receiver_type' => 1,
        'name' => '手机验证码',
        'title' => '前端验证码登录，注册，手机验证',
        'async' => false,
        'variable' => [
            'code' => '验证码'
        ],
    ],
    //充值成功通知，站点端发送

    'recharge_success' => [
        'key' => 'recharge_success',
        'receiver_type' => 1,
        'name' => '充值成功通知',
        'title' => '会员充值成功后发送',
        'async' => true,
        'variable' => [
            'price' => '充值金额',
            'balance' => '充值后账户',
            'time' => '充值时间',
            'trade_no' => '交易单号'
        ],
    ]

];