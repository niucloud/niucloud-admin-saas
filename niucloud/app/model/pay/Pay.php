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

use app\dict\common\ChannelDict;
use app\dict\pay\PayDict;
use core\base\BaseModel;

/**
 * 订单模型
 * Class Order
 * @package app\model\order
 */
class Pay extends BaseModel
{


    // 关闭自动写入update_time字段
    protected $updateTime = false;
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'pay';

    //类型
    protected $type = [
        'pay_time' => 'timestamp',
        'close_time' => 'timestamp',
    ];

    protected $json = ['allow_type'];

    protected $jsonAssoc = true;

    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        if (empty($data['status']))
            return '';
        return PayDict::getStatus()[$data['status']] ?? '';
    }

    /**
     * 支付方式字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getTypeNameAttr($value, $data)
    {
        if (empty($data['type']))
            return '';
        $temp = PayDict::getPayType()[$data['type']] ?? [];
        return $temp['name'] ?? '';
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
     * 查询交易流水号
     * @param $query
     * @param $value
     * @return void
     */
    public function searchOutTradeNoAttr($query, $value) {
        if (!empty($value)) {
            $query->where([['out_trade_no', '=', $value]]);
        }
    }

    /**
     * 查询交易状态
     * @param $query
     * @param $value
     * @return void
     */
    public function searchStatusAttr($query, $value) {
        if ($value != '') {
            $query->where([['status', '=', $value]]);
        }
    }

    /**
     * 支付渠道
     * @param $value
     * @param $data
     * @return array|mixed|string|void
     */
    public function getChannelNameAttr($value, $data){
        if (isset($data['channel'])) {
            return ChannelDict::getType($data['channel']);
        }
    }
}
