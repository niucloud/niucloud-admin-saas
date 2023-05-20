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

use app\enum\pay\TransferEnum;
use core\base\BaseModel;

/**
 * 订单模型
 * Class Order
 * @package app\model\order
 */
class Transfer extends BaseModel
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
    protected $name = 'pay_transfer';

    //类型
    protected $type = [
        'transfer_time'     =>  'timestamp',
        'finish_time' => 'timestamp',
    ];

    /**
     * 状态字段转化
     * @param $value
     * @return mixed
     */
    public function getTransferStatusNameAttr($value, $data)
    {
        return TransferEnum::getStatus()[$data['transfer_status'] ?? ''] ?? '';
    }


    /**
     * 转账方式字段转化
     * @param $value
     * @return mixed
     */
    public function getTransferTypeNameAttr($value, $data)
    {
        return TransferEnum::getTransferType()[$data['transfer_type'] ?? '']['name'] ?? '';
    }

}
