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

use app\dict\order\RechargeOrderDict;
use app\model\member\Member;
use app\model\order\Order;
use app\model\order\OrderItem;
use app\model\order\OrderItemRefund;
use app\service\core\member\CoreMemberAccountService;
use app\service\core\order\CoreOrderRefundService;
use app\service\core\pay\CoreRefundService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use think\facade\Db;

/**
 * 充值订单流程
 * Class CoreRechargeOrderService
 * @package app\service\core\order
 */
class CoreRechargeRefundService extends BaseCoreService
{
    protected $order_type = 'recharge';

    /**
     * 创建充值订单退款
     * @param int $site_id
     * @param int $order_id
     * @return void
     */
    public function create(int $site_id, int $order_id) {
        $order_model = (new OrderItem())->where([ ['site_id', '=', $site_id], ['order_id', '=', $order_id], ['item_type', '=', $this->order_type ] ])->with('ordermain')->find();
        $order = $order_model->toArray();
        $order_info = (new Order())->where([ ['site_id', '=', $site_id], ['order_id', '=', $order_id] ])->field("order_no")->find();
        if (empty($order)) throw new CommonException('ORDER_NOT_EXIST');
        if (!$order['ordermain']['is_enable_refund']) throw new CommonException('NOT_ALLOW_APPLY_REFUND');
        if (!in_array($order['ordermain']['order_status'], [RechargeOrderDict::PAY, RechargeOrderDict::FINISH])) throw new CommonException('ORDER_UNPAID_NOT_ALLOW_APPLY_REFUND');
        if ($order['refund_status'] != RechargeOrderDict::NOT_APPLAY) throw new CommonException('REFUND_HAD_APPLIED');

        Db::startTrans();
        try {
            // 查询会员账户余额
            $member_info = (new Member())->where([
                [ 'member_id', '=', $order['member_id'] ],
                [ 'site_id', '=', $order['site_id'] ]
            ])->field('balance')->find();

            if ($member_info['balance'] == 0) throw new CommonException('NO_REFUNDABLE_AMOUNT');

            $order['out_trade_no'] = $order['ordermain']['out_trade_no'];
            $order['money'] = $order['item_money'] > $member_info['balance'] ? $member_info['balance'] : $order['item_money'];
            $order['order_no'] = $order_info['order_no'];
            $creat_res = (new CoreOrderRefundService())->create($order);

            $order_model->save([
                'refund_no' => $creat_res['refund_no'],
                'refund_status' => RechargeOrderDict::REFUNDING
            ]);
            $order_model->ordermain->save([
                'refund_status' => RechargeOrderDict::REFUNDING
            ]);

            (new OrderItemRefund())->update(['status' => RechargeOrderDict::REFUNDING], [ ['refund_no', '=', $creat_res['refund_no'] ] ]);

            // 执行退款
            $this->refund($order, $creat_res['refund_no']);

            Db::commit();

            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 退款
     * @param array $order
     * @param string $refund_no
     * @return void
     */
    public function refund(array $order, string $refund_no){
        (new CoreMemberAccountService())->addLog($order['site_id'], $order['member_id'], 'balance', -$order['money'], 'recharge_refund', '充值订单退款', $order['order_id']);
        // 调用支付退款
        (new CoreRefundService())->refund($order['site_id'], $refund_no);
    }

    /**
     * 退款完成
     * @return void
     */
    public function refundComplete($refund_no){
        $model = (new OrderItemRefund())->where([ ['refund_no', '=', $refund_no ] ])->find();
        if ($model->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if ($model->status != RechargeOrderDict::REFUNDING) throw new CommonException('REFUND_STATUS_ABNORMAL');

        Db::startTrans();
        try {
            $model->save(['status' => RechargeOrderDict::REFUND_COMPLETED]);
            $model->item()->save([ 'refund_status' => RechargeOrderDict::REFUND_COMPLETED ]);
            (new Order())->update(['refund_status' => RechargeOrderDict::REFUND_COMPLETED], [ ['order_id', '=', $model->order_id ] ]);
            (new CoreRechargeOrderService())->close($model->site_id, $model->order_id);
            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }
}

