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

class PayDict
{
    //上传方式  图片
    public const WECHATPAY = 'wechatpay';//微信支付
    //上传方式  视频
    public const ALIPAY = 'alipay';//支付宝支付
    //const UNIPAY = 'unipay';//银联
    public const OFFLINEPAY = 'offlinepay';//线下支付
    public const BALANCEPAY = 'balancepay';//线下支付


    public const ON = '1';
    public const OFF = '0';

    //图标根目录
    public const PAY_ICON_PATH = 'static' . '/' . 'resource' . '/' . 'icon' . '/' . 'pay_icon' . '/';
    public const WECHATPAY_ICON = self::PAY_ICON_PATH . 'wechatpay.png';//微信支付
    //上传方式  视频
    public const ALIPAY_ICON = self::PAY_ICON_PATH . 'alipay.png';//支付宝支付

    public const BALANCEPAY_ICON = self::PAY_ICON_PATH . 'balancepay.png';//支付宝支付

    public const OFFLINEPAY_ICON = self::PAY_ICON_PATH . 'offlinepay.png';//线下支付

    //支付状态
    public const STATUS_WAIT = '0';//待支付
    public const STATUS_ING = '1';//支付中
    public const STATUS_ED = '2';//已支付

    public const STATUS_AUDIT = '3';//待审核
    public const STATUS_CALCLE = '-1';//已取消

    public const MEMBER = 'member';
    public const USER = 'user';

    /**
     * 支付类型
     * @return array
     */
    public static function getPayType(array $types = [])
    {
        $list = [
            self::WECHATPAY => [
                'name' => get_lang('dict_pay.type_wechatpay'),
                'key' => self::WECHATPAY,
                'icon' => self::WECHATPAY_ICON,
            ],//微信支付
            self::ALIPAY => [
                'name' => get_lang('dict_pay.type_alipay'),
                'key' => self::ALIPAY,
                'icon' => self::ALIPAY_ICON,
            ],//支付宝支付
//            self::UNIPAY => [
//                'name' => get_lang('dict_pay.type_unipay'),
//                'key' => self::UNIPAY,
//                'icon' => self::UNIPAY_ICON
//            ],//银联支付
//            self::OFFLINEPAY => [
//                'name' => get_lang('dict_pay.type_offline'),
//                'key' => self::OFFLINEPAY,
//                'icon' => self::OFFLINEPAY_ICON
//            ],//线下支付
            self::BALANCEPAY => [
                'name' => get_lang('dict_pay.type_balancepay'),
                'key' => self::BALANCEPAY,
                'icon' => self::BALANCEPAY_ICON,
            ],//微信支付
//            self::ALIPAY => get_lang('dict_pay.type_alipay'),//支付宝支付
//            self::UNIPAY => get_lang('dict_pay.type_unipay'),//银联
//            self::OFFLINEPAY => get_lang('dict_pay.type_offline'),//线下支付
//            self::BALANCEPAY => get_lang('dict_pay.type_balancepay'),//余额支付
        ];
        if (!empty($types)) {
            foreach ($list as $k => $v) {
                if (!in_array($k, $types)) {
                    unset($list[$k]);
                }
            }
        }
        return $list;
    }

    /**
     * 获取状态
     * @return array
     */
    public static function getStatus()
    {
        return [
            self::STATUS_WAIT => get_lang('dict_pay.status_wait'),
            self::STATUS_ING => get_lang('dict_pay.status_ing'),
            self::STATUS_ED => get_lang('dict_pay.status_ed'),
            self::STATUS_CALCLE => get_lang('dict_pay.status_cancle'),
            self::STATUS_AUDIT => get_lang('dict_pay.status_audit')
        ];
    }

}
