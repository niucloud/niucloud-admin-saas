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

use app\dict\order\OrderRefundDict;
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

        $field = 'order_item_refund.refund_id,order_item_refund.num,order_item_refund.money,order_item_refund.refund_no,order_item_refund.status,order_item_refund.create_time,order_item_refund.audit_time,order_item_refund.transfer_time,order_item_refund.item_type,order_item_refund.order_item_id, order_item_refund.order_id,order_item_refund.member_id,order_item_refund.order_no';
        $member_where = [];
        if(!empty($where['keywords']))
        {
            $member_where[] = ["member.member_id|member.nickname|member.mobile", '=', $where['keywords']];
        }
        $search_model = $this->model->where([['order_item_refund.site_id', '=', $this->site_id]])->with(['item' => function($query) {
            $query->with('orderNo')->field('order_id, order_item_id, item_name, item_image');
        }])->withSearch(['join_order_no' => 'order_no', 'join_status' => 'status', 'join_member_id' => 'member_id', 'refund_no' => 'refund_no', 'join_create_time' => 'create_time'],$where)->withJoin(['member' => function($query){
            $query->field("member.nickname, member.headimg, member.mobile, member.member_id");
        }
        ])->where($member_where)->field($field)->order('create_time desc')->append(['status_name', 'payrefund.type_name']);

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
        $status = OrderRefundDict::getStatus();
        return $status;
    }

    /**
     * 退款统计数据(根据状态查询)
     */
    public function stat()
    {
        $status = OrderRefundDict::getStatus();
        $all = 0;
        $have = 0;
        foreach ($status as $k => $v)
        {
            $money = $this->model->where([['status', '=', $v['key']], ['site_id', '=', $this->site_id]])->sum("money");
            if($money == null)
            {
                $money = 0;
            }
            if($k == 1 || $k == 2){
                $have = $have + $money;
            }
            $status[$k]['money'] = number_format($money, 2);
            $all = $all + $money;
        }
        $status['all'] = [
            'name' => get_lang('dict_refund.all'),
            'key' => 'all',
            'money' => number_format($all, 2)
        ];
        $status['have'] = [
            'name' => get_lang('dict_refund.have'),
            'key' => 'all',
            'money' => number_format($have, 2)
        ];
        return $status;

    }
}
