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

namespace app\service\admin\order;

use app\enum\order\RechargeOrderEnum;
use app\model\order\Order;
use core\base\BaseAdminService;

/**
 * 充值订单
 * Class RechargeOrderService
 * @package app\service\admin\order
 */
class RechargeOrderService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 充值订单分页列表
     * @param array $where
     * @return mixed
     */
    public function getPage(array $where)
    {
        $field = 'order_id, site_id, order_no, order_from, order_type, out_trade_no, order_status, refund_status, member_id, ip, member_message, order_item_money, order_discount_money, order_money, create_time, pay_time, close_time, is_delete, is_enable_refund, remark, invoice_id, close_reason';
        $order = 'create_time desc';
        $where['order_type'] = 'recharge';
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(['order_from', 'order_status', 'order_type', 'member_id', 'out_trade_no', 'create_time'], $where)->field($field)->with(['item' => function($query) {
            $query->field('order_item_id, order_id, member_id, item_id, item_type, item_name, item_image, price, num, item_money, is_refund, refund_no, refund_status, create_time');
        }, 'member' => function($query) {
            $query->field('member_id, nickname, mobile, headimg');
        }])->order($order)->append(['order_status_info', 'order_from_name']);
        return $this->pageQuery($search_model);
    }

    /**
     * 充值订单详情
     * @param array $where
     * @return mixed
     */
    public function getDetail(int $order_id)
    {
        $field = 'order_id, site_id, order_no, order_from, order_type, out_trade_no, order_status, refund_status, member_id, ip, member_message, order_item_money, order_discount_money, order_money, create_time, pay_time, close_time, is_delete, is_enable_refund, remark, invoice_id, close_reason';
        $detail = $this->model->where([['order_type', '=', 'recharge'], ['site_id', '=', $this->site_id], ['order_id', '=', $order_id]])->field($field)->with(['item' => function($query) {
            $query->field('order_item_id, order_id, member_id, item_id, item_type, item_name, item_image, price, num, item_money, is_refund, refund_no, refund_status, create_time');
        }, 'member' => function($query) {
            $query->field('member_id, nickname, mobile, headimg');
        }])->append(['order_status_info', 'order_from_name'])->findOrEmpty()->toArray();
        return $detail;
    }

    /**
     * 充值订单状态
     * @return array|array[]|string
     */
    public function getStatus()
    {
        return RechargeOrderEnum::getStatus();
    }




}