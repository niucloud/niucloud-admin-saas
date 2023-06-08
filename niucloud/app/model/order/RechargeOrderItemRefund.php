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

namespace app\model\order;

use app\dict\order\RechargeOrderDict;
use app\model\member\Member;
use app\model\pay\Refund;
use core\base\BaseModel;

/**
 * 订单项目模型
 * Class OrderItem
 * @package app\model\order
 */
class RechargeOrderItemRefund extends BaseModel
{
    //类型
    protected $type = [
        'create_time'     =>  'timestamp',
        'audit_time'  =>  'timestamp',
        'transfer_time'  =>  'timestamp',
    ];

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'refund_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'recharge_order_item_refund';

    /**
     * 退款状态字段处理
     * @param $value
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        return  RechargeOrderDict::getRefundStatus()[$data['status'] ?? '']['name'] ?? '';
    }

    /**
     *
     * @return \think\model\relation\HasOne
     */
    public function item() {
        return $this->hasOne(RechargeOrderItem::class, 'order_item_id', 'order_item_id')->joinType('inner');
    }

    /**
     * 订单会员
     * @return \think\model\relation\HasOne
     */
    public function member()
    {
        return $this->hasOne( Member::class, 'member_id', 'member_id')->withField('member_id, username, mobile, nickname, headimg')->joinType('left');
    }

    /**
     * 关联退款支付记录表
     * @return \think\model\relation\HasOne
     */
    public function payrefund(){
        return $this->hasOne(Refund::class,'refund_no', 'refund_no');
    }

    /**
     * 会员id搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchRefundNoAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('refund_no', '=', $value);
        }
    }


    /**
     * 订单号搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchOrderNoAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('order_no', '=', $value);
        }
    }

    /**
     * 订单号搜索(用于关联)
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchJoinOrderNoAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('recharge_order_item_refund.order_no', '=', $value);
        }
    }

    /**
     * 会员id搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchMemberIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('member_id', '=', $value);
        }
    }

    /**
     * 会员id搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchJoinMemberIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('recharge_order_item_refund.member_id', '=', $value);
        }
    }

    /**
     * 退款状态
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where('status', '=', $value);
        }
    }

    /**
     * 退款状态
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchJoinStatusAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where('recharge_order_item_refund.status', '=', $value);
        }
    }

    /**
     * 创建时间搜索器
     * @param $value
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]) ;
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]) ;
        if($start_time > 0 && $end_time > 0){
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        }else if($start_time > 0 && $end_time == 0){
            $query->where([['create_time', '>=', $start_time]]);
        }else if($start_time == 0 && $end_time > 0){
            $query->where([['create_time', '<=', $end_time]]);
        }
    }

    /**
     * 创建时间搜索器
     * @param $value
     */
    public function searchJoinCreateTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]) ;
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]) ;
        if($start_time > 0 && $end_time > 0){
            $query->whereBetweenTime('recharge_order_item_refund.create_time', $start_time, $end_time);
        }else if($start_time > 0 && $end_time == 0){
            $query->where([['recharge_order_item_refund.create_time', '>=', $start_time]]);
        }else if($start_time == 0 && $end_time > 0){
            $query->where([['recharge_order_item_refund.create_time', '<=', $end_time]]);
        }
    }
}
