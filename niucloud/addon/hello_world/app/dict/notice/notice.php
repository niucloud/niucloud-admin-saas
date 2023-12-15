<?php
return [
    //充值成功通知，站点端发送
    'recharge_success' => [
        'addon' => 'hello_world',
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
