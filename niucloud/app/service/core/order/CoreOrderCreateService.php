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

namespace app\service\core\order;

use app\enum\pay\PayEnum;
use app\model\order\Order;
use app\model\order\OrderItem;
use app\service\core\BaseCoreService;
use app\service\core\pay\CorePayService;
use extend\exception\CommonException;
use think\facade\Cache;
use think\facade\Db;

/**
 * 基础订单创建
 * Class CoreOrderCreateService
 * @package app\service\core\order
 */
class CoreOrderCreateService extends BaseCoreService
{
    /**
     * 订单创建
     * @param int $site_id
     * @param array $order_data
     * @param array $order_items
     * @return array
     */
    public function create(int $site_id, array $order_data, array $order_items)
    {

        Db::startTrans();
        try{
            //添加订单支付表
            $order_data['out_trade_no'] = (new CorePayService())->create($site_id, PayEnum::MEMBER, $order_data['member_id'], $order_data['order_money'], $order_data['order_type'], get_lang("enum_order.trade_type_recharge"));
            //添加订单表
            $order_data['order_no'] = $this->createOrderNo($site_id);
            $create_order = (new Order())->create($order_data);
            $order_id = $create_order->order_id;
            //添加订单项目表
            $order_item_model = new OrderItem();
            foreach ($order_items as $k => $order_item)
            {
                $order_item['order_id'] = $order_id;
                $order_item_model->create($order_item);
            }
            //订单创建执行事件
            event("orderCreateAfter");
            if($order_data['order_money'] == 0){
                (new CorePayService())->finish($site_id, $order_data['out_trade_no'], PayEnum::BALANCEPAY);
            }
            Db::commit();
            //返回订单信息
            return [
                'order_id' => $order_id,
                'out_trade_no' => $order_data['out_trade_no']
            ];

        }catch (\Exception $e)
        {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 创建订单编号
     * @param int $site_id
     * @return string
     */
    public function createOrderNo(int $site_id)
    {
        $time_str = date('YmdHi');
        $max_no =  Cache::get("order_no_".$site_id."_".$time_str);

        if (!isset($max_no) || empty($max_no)) {
            $max_no = 1;
        } else {
            $max_no = $max_no + 1;
        }
        $order_no = $time_str . $site_id .sprintf('%03d', $max_no);
        Cache::set("order_no_".$site_id."_".$time_str, $max_no);
        return $order_no;
    }

}

