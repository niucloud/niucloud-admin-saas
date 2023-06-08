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

use core\base\BaseModel;

/**
 * 订单项目模型
 * Class OrderItem
 * @package app\model\order
 */
class RechargeOrderItem extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'order_item_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'recharge_order_item';

    /**
     * @return HasOne
     */
    public function orderNo()
    {
        return $this->hasOne(RechargeOrder::class, 'order_id', 'order_id')->joinType('left')->withField('order_id, order_no')->bind(['order_no' => 'order_no']);
    }
    /**
     * 数量字段处理
     * @param $value
     * @return mixed
     */
    public function getNumAttr($value, $data)
    {
        if(isset($data['num']))
        {
            return number_format($data['num'], 0);
        }
    }

    /**
     * 关联订单主表
     * @return void
     */
    public function ordermain(){
        return $this->hasOne(RechargeOrder::class, 'order_id')->joinType('inner');
    }
}
