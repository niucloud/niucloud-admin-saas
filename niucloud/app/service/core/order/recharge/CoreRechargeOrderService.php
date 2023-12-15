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

use app\dict\member\MemberAccountTypeDict;
use app\dict\order\RechargeOrderDict;
use app\dict\pay\PayDict;
use app\model\order\RechargeOrder;
use app\model\order\RechargeOrderItem;
use app\service\core\member\CoreMemberAccountService;
use app\service\core\pay\CorePayService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use Exception;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Db;

/**
 * 充值订单流程
 * Class CoreRechargeOrderService
 * @package app\service\core\order
 */
class CoreRechargeOrderService extends BaseCoreService
{
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
            'order_status' => RechargeOrderDict::WAIT_PAY,
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
        Db::startTrans();
        try{
            //添加订单表
            $order_data['order_no'] = create_no();
            $create_order = (new RechargeOrder())->create($order_data);
            $order_id = $create_order->order_id;
            //添加订单支付表
            (new CorePayService())->create($data['site_id'], PayDict::MEMBER, $order_data['member_id'], $order_data['order_money'], $order_data['order_type'], $order_id, get_lang("dict_order.trade_type_recharge"));
            //添加订单项目表
            $order_item_model = new RechargeOrderItem();
            foreach ($order_items as $k => $order_item)
            {
                $order_item['order_id'] = $order_id;
                $order_item_model->create($order_item);
            }
            Db::commit();
            //返回订单信息
            return [
                'trade_type' => $order_data['order_type'],
                'trade_id' => $order_id
            ];
        }catch ( Exception $e)
        {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 订单支付
     * @param array $pay_info
     * @return true
     */
    public function pay(array $pay_info)
    {
        try {
            $trade_id = $pay_info['trade_id'] ?? 0;
            $order_model = new RechargeOrder();
            $order_info = $order_model->where([['site_id', '=', $pay_info['site_id']], ['order_id', '=', $trade_id]])->findOrEmpty()->toArray();
            if (empty($order_info))
                throw new CommonException('ORDER_NOT_EXIST');
            $order_data = [
                'pay_time' => time(),
                'order_status' => RechargeOrderDict::FINISH,
                'is_enable_refund' => 1, // 是否允许退款
                'out_trade_no' => $pay_info['out_trade_no']//支付后的交易流水号
            ];
            $order_model->where([['site_id', '=', $pay_info['site_id']], ['order_id', '=', $trade_id]])->update($order_data);
            //会员余额
            (new CoreMemberAccountService())->addLog($order_info['site_id'], $order_info['member_id'], MemberAccountTypeDict::BALANCE, $order_info['order_item_money'], 'recharge', '会员充值', $order_info['order_id']);
            return true;
        }catch ( Exception $e)
        {
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 关闭订单
     * @param int $site_id
     * @param int $order_id
     * @return true
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function close(int $site_id, int $order_id){
        $order = (new RechargeOrder())->where([ ['site_id', '=', $site_id ],['order_id', '=', $order_id ], ])->find();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        //如果是支付中的话
        //if ($order->order_status == RechargeOrderDict::CLOSE) throw new CommonException('ORDER_CLOSED');
        //关闭支付单据
        if ($order->order_status == RechargeOrderDict::WAIT_PAY)
            (new CorePayService())->closeByTrade($site_id,'recharge', $order_id);
        $order->save(['order_status' => RechargeOrderDict::CLOSE]);

        return true;
    }

    /**
     * 获取订单信息
     * @param int $site_id
     * @param int $order_id
     * @return array
     */
    public function orderInfo(int $site_id, int $order_id)
    {
        return (new RechargeOrder())->where([
            ['site_id', '=', $site_id],
            ['order_id', '=', $order_id]
        ])->field('*')->findOrEmpty()->toArray();
    }

}

