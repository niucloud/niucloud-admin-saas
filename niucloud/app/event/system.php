<?php

return [
    'bind' => [
    ],

    'listen' => [

        /**
         * 系统事件
         */
        'AppInit' => ['app\listener\system\AppInit'],
        'HttpRun' => [],
        'HttpEnd' => [],
        'LogLevel' => [],
        'LogWrite' => [],
        /**
         * 会员相关事件
         */

        //会员注册事件
        'memberRegister' => ['app\listener\member\MemberRegister'],
        //会员登录事件
        'memberLogin' => ['app\listener\member\MemberLogin'],
        //会员账户变化事件
        'memberAccount' => ['app\listener\member\MemberAccount'],
        //扫码事件
        'scan' => ['app\listener\scan\Scan'],

        /**
         * 消息相关事件
         */

        /**
         * 支付相关事件
         */
        'PaySuccess' => ['app\listener\pay\PaySuccess'],
        'TransferSuccess' => ['app\listener\pay\TransferSuccess'],

    ],

    'subscribe' => [
    ],
];
