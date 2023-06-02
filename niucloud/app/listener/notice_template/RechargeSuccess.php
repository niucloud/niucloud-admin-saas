<?php

namespace app\listener\notice_template;

use app\service\core\member\CoreMemberService;
use app\service\core\order\CoreOrderService;

class RechargeSuccess extends BaseNoticeTemplate
{

    private $key = 'recharge_success';

    public function handle(array $params)
    {
        if ($this->key == $params['key']) {
            $data = $params['data'];
            $site_id = $params['site_id'];
            $order_id = $data['order_id'];

            $core_order_service = new CoreOrderService();
            $order = $core_order_service->getOrderInfo($site_id, $order_id);
            if (!empty($order)){
                $member = (new CoreMemberService())->getInfoByMemberId($site_id, $order['member_id']);
                //通过订单id查询订单信息
                return $this->toReturn(
                    [
                        '__wechat_page' => '',//模板消息链接
                        '__miniprogram' => '',//模板消息小程序
                        '__weapp_page' => '',//小程序链接
                        'balance' => $member['balance'],//充值后的余额
                        'price' => $order['order_item_money'],//订单项总价
                        'time' => $order['create_time'],//创建时间
                        'trade_no' => $order['out_trade_no'],//交易流水号
                    ],
                    [
                        'member_id' => $order['member_id'],
                    ]
                );
            }

        }

    }

}