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

use app\dict\common\ChannelDict;
use app\model\member\Member;
use app\model\pay\Pay;
use core\base\BaseModel;

/**
 * 充值订单模型
 * Class RechargeOrder
 * @package app\model\order
 */
class RechargeOrder extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'order_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'recharge_order';

    //类型
    protected $type = [
        'pay_time'     =>  'timestamp',
        'close_time'  =>  'timestamp',
    ];


    /**
     * 登录渠道字段转化
     * @param $value
     * @return mixed
     */
    public function getOrderFromNameAttr($value, $data)
    {
        if(isset($data['order_from']))
        {
            return ChannelDict::getType()[$data['order_from']] ?? '';
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
     * 订单来源
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchOrderFromAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('order_from', '=', $value);
        }
    }

    /**
     * 订单类型
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchOrderTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('order_type', '=', $value);
        }
    }

    /**
     * 支付流水号
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchOutTradeNoAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('out_trade_no', '=', $value);
        }
    }

    /**
     * 订单号
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
     * 订单金额
     * @param $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchOrderMoneyAttr($query, $value, $data)
    {
        if (!empty($data['start_money']) && !empty($data['end_money'])) {
            $money = [ $data['start_money'], $data['end_money'] ];
            sort($money);
            $query->where('order_money', 'between', $money);
        } else if (!empty($data['start_money'])) {
            $query->where('order_money', '>=', $data['start_money']);
        } else if (!empty($data['end_money'])) {
            $query->where('order_money', '<=', $data['end_money']);
        }
    }

    /**
     * 订单状态
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchOrderStatusAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where('order_status', '=', $value);
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
     * 支付时间筛选
     * @param $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchPayTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]) ;
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]) ;
        if($start_time > 0 && $end_time > 0){
            $query->whereBetweenTime('pay_time', $start_time, $end_time);
        }else if($start_time > 0 && $end_time == 0){
            $query->where([['pay_time', '>=', $start_time]]);
        }else if($start_time == 0 && $end_time > 0){
            $query->where([['pay_time', '<=', $end_time]]);
        }
    }

    /**
     * 订单项目
     * @return \think\model\relation\HasMany
     */
    public function item()
    {
        return $this->hasMany(RechargeOrderItem::class,'order_id', 'order_id');
    }

    /**
     * 订单会员
     * @return \think\model\relation\HasOne
     */
    public function member()
    {
        return $this->hasOne(Member::class,'member_id', 'member_id');
    }

    /**
     * 支付记录
     * @return \think\model\relation\HasOne
     */
    public function pay() {
        return $this->hasOne(Pay::class,'out_trade_no', 'out_trade_no')->bind(['pay_type_name' => 'type_name']);
    }
}
