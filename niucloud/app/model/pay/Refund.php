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

use app\enum\order\OrderTypeEnum;
use app\enum\pay\PayEnum;
use app\enum\pay\PayRefundEnum;
use app\enum\pay\RefundEnum;
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
        'create_time'     =>  'timestamp',
        'refund_time'  =>  'timestamp',
        'close_time'  =>  'timestamp',
    ];

    /**
     * 状态字段转化
     * @param $value
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        return RefundEnum::getStatus()[$data['status'] ?? ''] ?? '';
    }

    /**
     * 支付方式字段转化
     * @param $value
     * @return mixed
     */
    public function getTypeNameAttr($value, $data)
    {
        return RefundEnum::getType()[$data['type'] ?? ''] ?? '';
    }

}
