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

namespace app\service\core\order\recharge;

use app\enum\order\RechargeOrderEnum;
use app\model\order\Order;
use app\service\core\member\CoreMemberAccountService;
use app\service\core\order\CoreOrderCreateService;
use core\base\BaseCoreService;
use core\exception\CommonException;

/**
 * 充值订单流程
 * Class CoreRechargeOrderService
 * @package app\service\core\order
 */
class CoreRechargeOrderService extends BaseCoreService
{

    public $order_type = 'recharge';

    /**
     * 充值订单创建
     * @param array $data //['site_id' => 1, ‘member_id’ => 1， 'order_from' => 'h5', 'member_message' => '','recharge_money' => 12.00]
     * @return array
     */
    public function create(array $data)
    {
        $order_data = [
            'site_id' => $data['site_id'],
            'order_from' => $data['order_from'] ?? 'h5',
            'order_type' => 'recharge',
            'order_status' => RechargeOrderEnum::WAIT_PAY,
            'member_id' => $data['member_id'],
            'ip' => request()->ip() ?? '',
            'member_message' => $data['member_message'] ?? '',
            'order_item_money' => $data['recharge_money'],
            'order_discount_money' => 0,
            'order_money' => $data['recharge_money'],
        ];
        $order_items = [
            [
                'site_id' => $data['site_id'],
                'member_id' => $data['member_id'],
                'item_id' => 0,
                'item_type' => 'recharge', //项目类型 recharge, goods
                'item_name' => '会员充值',
                'item_image' => '/static/image/recharge.png',
                'price' => $data['recharge_money'],
                'num' => 1,
                'item_money' => $data['recharge_money'],
                'is_refund' => 0
            ]
        ];
        $res = (new CoreOrderCreateService())->create($data['site_id'], $order_data, $order_items);
        return $res;
    }

    /**
     * 订单支付
     * @param array $pay_info
     */
    public function pay(array $pay_info)
    {
        try {
            $order_model = new Order();
            $order_info = $order_model->where([['site_id', '=', $pay_info['site_id']], ['out_trade_no', '=', $pay_info['out_trade_no']]])->findOrEmpty()->toArray();
            if (empty($order_info))
                throw new CommonException('ORDER_NOT_EXIST');
            $order_data = [
                'pay_time' => time(),
                'order_status' => RechargeOrderEnum::FINISH,
                'is_enable_refund' => 1 // 是否允许退款
            ];
            $order_model->where([['site_id', '=', $pay_info['site_id']], ['out_trade_no', '=', $pay_info['out_trade_no']]])->update($order_data);
            //会员余额
            (new CoreMemberAccountService())->addLog($order_info['site_id'], $order_info['member_id'], 'balance', $order_info['order_item_money'], 'recharge', '会员充值', $order_info['order_id']);
            return true;
        }catch (\Exception $e)
        {
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 关闭订单
     * @param $order_id
     * @return void
     */
    public function close(int $site_id, int $order_id){
        $order = (new Order())->where([ ['site_id', '=', $site_id ],['order_id', '=', $order_id ], ])->find();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if ($order->order_status == RechargeOrderEnum::CLOSE) throw new CommonException('ORDER_CLOSED');

        $order->save(['order_status' => RechargeOrderEnum::CLOSE]);
        return true;
    }
}

