<?php
use \core\dict\DictLoader;

$system_event = [
    //文件执行序列号
    'file_sort' => 1,
    'bind' => [
    ],

    'listen' => [

        /**
         * 系统事件
         */
        'AppInit' => [ 'app\listener\system\AppInitListener' ],
        'HttpRun' => [],
        'HttpEnd' => [],
        'LogLevel' => [],
        'LogWrite' => [],
        /**
         * 会员相关事件
         */

        //会员注册事件
        'memberRegister' => [ 'app\listener\member\MemberRegisterListener' ],
        //会员登录事件
        'memberLogin' => [ 'app\listener\member\MemberLoginListener' ],
        //会员账户变化事件
        'memberAccount' => [ 'app\listener\member\MemberAccountListener' ],
        //扫码事件
        'scan' => [ 'app\listener\scan\ScanListener' ],
        'addSiteAfter' => [ 'app\listener\site\AddSiteAfterListener' ],

        /**
         * 消息相关事件
         */

        /**
         * 支付相关事件
         */
        'PaySuccess' => [ 'app\listener\pay\PaySuccessListener' ],
        'TransferSuccess' => [ 'app\listener\pay\TransferSuccessListener' ],

        // 任务失败统一回调,有四种定义方式
        'queue_failed'=> [
            ['app\listener\job\QueueFailedLoggerListener', 'report'],
        ],
        'appManage' => [
            'app\listener\system\AppManageListener'
        ],

        //消息模板数据内容
        'noticeData' => [
            'app\listener\notice_template\VerifyCode',//手机验证码
            'app\listener\notice_template\MemberVerifySuccess',//
            'app\listener\notice_template\RechargeSuccess',
        ],
        //全场景消息发送
        'notice' => [
            'app\listener\notice\Sms',//短信
            'app\listener\notice\Wechat',//公众号模板消息
            'app\listener\notice\Weapp',//小程序订阅消息
        ]
    ],

    'subscribe' => [
    ],
];
return (new DictLoader("Event"))->load($system_event);
