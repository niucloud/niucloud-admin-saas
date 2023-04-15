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

/**
 * 订单类型整体功能
 * Class OrderTypeEnum
 * @package app\enum\member
 */
class OrderTypeEnum
{

    /**
     * 查询订单适配的支付方式
     * @param $type
     * @return void
     */
    public static function getAllowPayType($type){
        /** @var RechargeOrderEnum $class */
        $class = __NAMESPACE__ . '\\' . ucfirst(strtolower($type)).'OrderEnum';
        return $class::ALLOW_PAY;
    }
}