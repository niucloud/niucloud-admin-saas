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

/**
 * 订单类型整体功能
 * Class OrderTypeDict
 * @package app\dict\member
 */
class OrderTypeDict
{

    /**
     * 查询订单适配的支付方式
     * @param $type
     * @return void
     */
    public static function getAllowPayType($type){
        /** @var RechargeOrderDict $class */
        $class = __NAMESPACE__ . '\\' . ucfirst(strtolower($type)).'OrderDict';
        return $class::ALLOW_PAY;
    }
}