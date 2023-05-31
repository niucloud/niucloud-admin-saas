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
 * Class OrderRefundDict
 * @package app\dict\order
 */
class OrderRefundDict
{
    const WAIT = '1';//待审核
    const WAIT_TRANSFER = '2';//待退款
    const SUCCESS = '3';//退款成功
    const FAIL = '-1';//退款失败

    /**
     * 退款状态
     * @param $status
     * @return mixed
     */
    public static function getStatus($status = []){
        $list =  [
            self::WAIT => [
                'name' => get_lang('dict_refund.wait'),
                'key' => self::WAIT,
            ],
            self::WAIT_TRANSFER => [
                'name' => get_lang('dict_refund.wait_transfer'),
                'key' => self::WAIT,
            ],
            self::SUCCESS => [
                'name' => get_lang('dict_refund.success'),
                'key' => self::WAIT,
            ],
            self::FAIL => [
                'name' => get_lang('dict_refund.fail'),
                'key' => self::FAIL,
            ]
        ];
        foreach($list as $k => $v){
            if(!empty($status) && !in_array($k, $status)) unset($list[$k]);
        }
        return $list;
    }

    
}