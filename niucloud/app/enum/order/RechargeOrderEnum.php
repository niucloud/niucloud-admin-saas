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

namespace app\enum\order;

use app\enum\pay\PayEnum;

/**
 *充值订单相关枚举类
 * Class RechargeOrderEnum
 * @package app\enum\order
 */
class RechargeOrderEnum
{
    //订单状态
    //待支付
    const WAIT_PAY = 0;
    //已支付
    const PAY = 1;
    //已完成
    const FINISH = 10;
    //已关闭
    const CLOSE = -1;


    /**
     * 当前订单支持的支付方式
     */
    const ALLOW_PAY = [
        PayEnum::WECHATPAY,
        PayEnum::ALIPAY,
        PayEnum::OFFLINEPAY,
    ];

    /**
     * 订单类型以及名称
     * @return array
     */
    public static function getOrderType()
    {
        return [
            'type' => 'recharge',
            'name' =>  get_lang('enum_order.order_type_recharge')
        ];
    }

    public static function getStatus($status = '')
    {
        $data = [

            self::WAIT_PAY => [
                'name' => '待支付',
                'status' => self::WAIT_PAY,
                'is_refund' => 0,
                'action' => [],
                'member_action' => [
                    [
                        'name' => '支付',
                        'class' => '',
                        'params' => ''
                    ],
                ],
            ],
            self::PAY => [
                'name' => '已支付',
                'status' => self::PAY,
                'is_refund' => 0,
                'action' => [],
                'member_action' => [
                ],
            ],
            self::FINISH => [
                'name' => '已完成',
                'status' => self::FINISH,
                'is_refund' => 0,
                'action' => [],
                'member_action' => [
                ],
            ],
            self::CLOSE => [
                'name' => '已关闭',
                'status' => self::CLOSE,
                'is_refund' => 0,
                'action' => [],
                'member_action' => [
                ],
            ]


        ];
        if ($status == '') {
            return $data;
        }
        return $data[$status] ?? '';
    }

}