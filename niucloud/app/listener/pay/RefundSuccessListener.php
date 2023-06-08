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
use app\service\core\order\recharge\CoreRechargeRefundService;

/**
 * 退款成功事件
 */
class RefundSuccessListener
{
    public function handle(array $refund_info)
    {
        $trade_type = $refund_info['trade_type'] ?? '';
        if($trade_type == 'recharge')
        {
            (new CoreRechargeRefundService())->refundComplete($refund_info['refund_no']);
        }
    }
}