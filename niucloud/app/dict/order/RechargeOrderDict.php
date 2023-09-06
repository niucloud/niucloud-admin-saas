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

namespace app\dict\order;

use app\dict\pay\PayDict;

/**
 *充值订单相关枚举类
 * Class RechargeOrderDict
 * @package app\dict\order
 */
class RechargeOrderDict
{
    //订单状态
    //待支付
    const WAIT_PAY = 0;
    //已完成
    const FINISH = 10;
    //已关闭
    const CLOSE = -1;

    // 退款相关状态
    // 未申请
    const NOT_APPLAY = 0;
    // 退款中
    const REFUNDING = 1;
    // 退款完成
    const REFUND_COMPLETED = 2;
    // 退款失败
    const REFUND_FAIL = -1;

    /**
     * 当前订单支持的支付方式
     */
    const ALLOW_PAY = [
        PayDict::WECHATPAY,
        PayDict::ALIPAY,
        PayDict::OFFLINEPAY,
    ];

    /**
     * 订单类型以及名称
     * @return array
     */
    public static function getOrderType()
    {
        return [
            'type' => 'recharge',
            'name' => get_lang('dict_order.order_type_recharge')
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

    /**
     * 获取退款状态
     * @param string $status
     * @return array|array[]|string
     */
    public static function getRefundStatus(string $status = '')
    {
        $data = [
            self::REFUNDING => [
                'name' => get_lang('dict_order_refund.refunding'),
                'status' => self::REFUNDING
            ],
            self::REFUND_COMPLETED => [
                'name' => get_lang('dict_order_refund.refund_complete'),
                'status' => self::REFUND_COMPLETED
            ],
            self::REFUND_FAIL => [
                'name' => get_lang('dict_order_refund.refund_fail'),
                'status' => self::REFUND_FAIL
            ]
        ];

        if ($status == '') {
            return $data;
        }
        return $data[$status] ?? '';
    }

}