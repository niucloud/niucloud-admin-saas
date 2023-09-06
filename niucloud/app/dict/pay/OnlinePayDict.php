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

namespace app\dict\pay;

class OnlinePayDict
{
    //上传方式  图片
    public const SUCCESS = 'SUCCESS';//支付成功
    //上传方式  视频
    public const REFUND = 'REFUND';//转入退款
    public const NOTPAY = 'NOTPAY';//未支付
    public const CLOSED = 'CLOSED';//已关闭
    public const REVOKED = 'REVOKED';//已撤销（仅付款码支付会返回）
    public const USERPAYING = 'USERPAYING';//用户支付中（仅付款码支付会返回）
    public const PAYERROR = 'PAYERROR';//支付失败（仅付款码支付会返回）
    public const TRADE_FINISHED = 'TRADE_FINISHED';


    public static function getAliPayStatus(string $status = '')
    {
        $list = [
            'WAIT_BUYER_PAY' => self::NOTPAY,//交易创建，等待买家付款
            'TRADE_CLOSED' => self::CLOSED,//未付款交易超时关闭，或支付完成后全额退款
            'TRADE_SUCCESS' => self::SUCCESS,//交易支付成功
            'TRADE_FINISHED' => self::TRADE_FINISHED,//交易结束，不可退款
        ];
        if (!empty($status))
            return $list[$status];

        return $list;
    }

    public static function getWechatPayStatus(string $status = '')
    {
        $list = [
            'NOTPAY' => self::NOTPAY,//交易创建，等待买家付款
            'CLOSED' => self::CLOSED,//已关闭
            'SUCCESS' => self::SUCCESS,//交易支付成功
            'REFUND' => self::REFUND,//转入退款
            'REVOKED' => self::REVOKED,//已撤销（仅付款码支付会返回）
            'USERPAYING' => self::USERPAYING,//用户支付中（仅付款码支付会返回）
            'PAYERROR' => self::PAYERROR,//支付失败（仅付款码支付会返回）
        ];
        if (!empty($status))
            return $list[$status];

        return $list;
    }

}