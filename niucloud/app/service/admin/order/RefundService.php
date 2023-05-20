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

use app\model\order\OrderItemRefund;
use core\base\BaseAdminService;

/**
 * 充值订单
 * Class RechargeOrderService
 * @package app\service\admin\order
 */
class RefundService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new OrderItemRefund();
    }

    /**
     * 查询退款列表
     * @param array $where
     * @return mixed
     */
    public function getPage(array $where) {
        $field = 'refund_id,num,money,refund_no,status,create_time,audit_time,transfer_time,item_type,order_item_id, order_id,member_id';
        $order = 'create_time desc';
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(['status', 'member_id', 'refund_no', 'create_time'], $where)->field($field)->with(['item' => function($query) {
            $query->field('order_item_id, item_name, item_image');
        }, 'member' => function($query) {
            $query->field('member_id, nickname, mobile, headimg');
        }, 'payrefund' => function($query) {
            $query->field('refund_no');
        }])->order($order)->append(['status_name', 'payrefund.type_name']);
        return $this->pageQuery($search_model);
    }

    /**
     * 查询退款详情
     * @param int $refund_id
     * @return void
     */
    public function getDetail(int $refund_id) {
        $field = 'refund_id,num,money,refund_no,status,create_time,audit_time,transfer_time,item_type,order_item_id, order_id,member_id';
        $detail = $this->model->where([ ['site_id', '=', $this->site_id], ['refund_id', '=', $refund_id]])->field($field)->with(['item' => function($query) {
            $query->field('order_item_id, item_name, item_image');
        }, 'member' => function($query) {
            $query->field('member_id, nickname, mobile, headimg');
        }, 'payrefund' => function($query) {
            $query->field('refund_no');
        }])->append(['status_name', 'payrefund.type_name'])->findOrEmpty()->toArray();
        return $detail;
    }

    /**
     * 获取退款状态
     * @return void
     */
    public function getStatus($type){
        $class = "\\app\\enum\\order\\" . ucfirst($type). "OrderEnum";
        if (!class_exists($class)) return [];
        return $class::getRefundStatus();
    }
}
