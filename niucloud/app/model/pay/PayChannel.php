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

use app\enum\common\ChannelEnum;
use app\enum\pay\PayEnum;
use core\base\BaseModel;

/**
 * 支付渠道模型
 * Class Order
 * @package app\model\order
 */
class PayChannel extends BaseModel
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
    protected $name = 'pay_channel';


    protected $json = ['config'];

    protected $jsonAssoc = true;


    /**
     * 支付方式字段转化
     * @param $value
     * @return mixed
     */
    public function getTypeNameAttr($value, $data)
    {
        return PayEnum::getPayType()[$data['type'] ?? '']['name'] ?? '';
    }

    /**
     * 渠道字段转化
     * @param $value
     * @return mixed
     */
    public function getChannelNameAttr($value, $data)
    {
        return ChannelEnum::getType()[$data['channel'] ?? ''] ?? '';
    }

}
