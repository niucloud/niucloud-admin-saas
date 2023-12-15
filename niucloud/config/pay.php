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

return [
    //默认驱动
    'default' => 'wechatpay',
    //驱动
    'drivers' => [
        //微信
        'wechatpay' => [],
        //支付宝
        'alipay' => [],
        //余额
        'balancepay' => [
            'driver' => 'app\service\core\paytype\CoreBalanceService',  //反射类的名字
        ],
        'offlinepay' => [
            'driver' => 'app\service\core\paytype\CoreOfflineService'
        ]
    ]
];
