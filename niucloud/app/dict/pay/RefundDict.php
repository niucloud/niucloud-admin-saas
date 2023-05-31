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

class RefundDict
{
    //转账状态
    const SUCCESS = 'success';//退款成功
    const DEALING = 'dealing';//退款处理中
    const WAIT = 'wait';//待退款
    const FAIL = 'fail';//失败

    // 退款方式
    const WECHATPAY = 'wechatpay';//微信支付
    const ALIPAY = 'alipay';//支付宝支付
    const OFFLINE = 'offline';//线下打款
    const BALANCE = 'balance';//线下支付

    /**
     * 获取状态
     * @return array
     */
    public static function getStatus(){
        $list = [
            self::WAIT => get_lang('dict_pay_refund.status_wait'),
            self::DEALING => get_lang('dict_pay_refund.status_dealing'),
            self::SUCCESS => get_lang('dict_pay_refund.status_success'),
            self::FAIL => get_lang('dict_pay_refund.status_fail'),
        ];
        return $list;
    }

    /**
     * 获取退款方式
     * @return array
     */
    public static function getType(){
        return [
            self::WECHATPAY => get_lang('dict_pay_refund.wechatpay'),
            self::ALIPAY => get_lang('dict_pay_refund.alipay'),
            self::OFFLINE => get_lang('dict_pay_refund.offline'),
            self::BALANCE => get_lang('dict_pay_refund.balance')
        ];
    }
}