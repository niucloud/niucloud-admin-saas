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

namespace app\listener\pay;


/**
 * 支付异步回调事件
 * Class PayNotify
 * @package app\listener\pay
 */
class PaySuccess
{
    public function handle(array $pay_info)
    {
        $class = "app\\enum\\order\\". $pay_info['trade_type']."\\".ucfirst($pay_info['trade_type']).'OrderService';

        return (new $class)->pay($pay_info);
    }
}