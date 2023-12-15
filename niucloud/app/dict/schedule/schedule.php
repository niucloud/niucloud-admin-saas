<?php

return [
    [
        'key' => 'order_close',
        'name' => '未支付订单自动关闭',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 1
        ],
        'class' => '',
        'function' => ''
    ],
    [
        'key' => 'site_expire_close',
        'name' => '站点到期自动关闭',
        'desc' => '',
        'time' => [
            'type' => 'day',
            'day' => 1,
            'hour' => 1,
            'min' => 1
        ],
        'class' => 'app\job\schedule\SiteExpireClose',
        'function' => ''
    ]
];
