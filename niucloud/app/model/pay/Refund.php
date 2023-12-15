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

namespace app\model\pay;

use app\dict\pay\PayDict;
use app\dict\pay\RefundDict;
use core\base\BaseModel;

/**
 * 订单模型
 * Class Order
 * @package app\model\order
 */
class Refund extends BaseModel
{
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'pay_refund';

    //类型
    protected $type = [
        'refund_time' => 'timestamp',
        'close_time' => 'timestamp',
    ];

    /**
     * 支付状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        if (empty($data['status'])) return '';
        return RefundDict::getStatus()[$data['status']] ?? '';
    }

    /**
     * 支付方式字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getTypeNameAttr($value, $data)
    {
        if (empty($data['type'])) return '';
        return PayDict::getPayType()[$data['type']]['name'] ?? '';
    }

    /**
     * 退款方式
     * @param $value
     * @param $data
     * @return mixed|string
     *
     */
    public function getRefundTypeNameAttr($value, $data)
    {
        if (empty($data['refund_type'])) return '';
        return RefundDict::getType()[$data['refund_type']] ?? '';
    }

    /**
     * 创建时间搜索器
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['create_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['create_time', '<=', $end_time]]);
        }
    }

    /**
     * 状态
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
     * 状态
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchOutTradeNoAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where('out_trade_no', '=', $value);
        }
    }

    /**
     * 状态
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchRefundNoAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where('refund_no', '=', $value);
        }
    }
}
