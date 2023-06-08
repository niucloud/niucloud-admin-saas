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

use app\service\core\order\recharge\CoreRechargeOrderService;

/**
 * 支付异步回调事件
 */
class PaySuccessListener
{
    public function handle(array $pay_info)
    {
        $trade_type = $pay_info['trade_type'] ?? '';
        if($trade_type == 'recharge')
        {
            (new CoreRechargeOrderService())->pay($pay_info);
        }
    }
}