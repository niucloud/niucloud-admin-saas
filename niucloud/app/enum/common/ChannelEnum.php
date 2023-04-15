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

namespace app\enum\common;

use app\enum\pay\PayEnum;
use extend\exception\PayException;

/**
 * 渠道枚举类
 * Class ChannelEnum
 * @package app\enum\member
 */
class ChannelEnum
{
    //微信小程序
    const WEAPP   = 'weapp';
    //微信公众号
    const WECHAT  = 'wechat';
    //手机端H5
    const H5      = 'h5';
    //电脑端PC
    const PC      =  'pc';
    //app端
    const APP     =   'app';


    public static function getType($type = ''){
        $data = [
            self::WEAPP    => get_lang('enum_channel.channel_weapp'),//微信小程序
            self::WECHAT     => get_lang('enum_channel.channel_wechat'),//'微信公众号',
            self::H5            => get_lang('enum_channel.channel_h5'),//'手机H5',
            self::PC            => get_lang('enum_channel.channel_pc'),//'电脑PC',
            self::APP           => get_lang('enum_channel.channel_app'),//'手机app',
        ];
        if(empty($type)){
            return $data;
        }
        return $data[$type] ?? '';
    }

    /**
     * 使用场景对支付方式的影响
     * @param $channel
     * @return array
     */
    public static function getAllowPayType($channel){
        $list = array(
            self::WEAPP => [
                PayEnum::WECHATPAY,
                PayEnum::OFFLINEPAY,
                PayEnum::BALANCEPAY,
            ],
            self::WECHAT => [
                PayEnum::WECHATPAY,
                PayEnum::BALANCEPAY,
                PayEnum::OFFLINEPAY,
            ],
            self::H5 => [
                PayEnum::WECHATPAY,
                PayEnum::ALIPAY,
                PayEnum::OFFLINEPAY,
                PayEnum::BALANCEPAY,
            ],
            self::PC => [
                PayEnum::WECHATPAY,
                PayEnum::ALIPAY,
                PayEnum::OFFLINEPAY,
                PayEnum::BALANCEPAY,
            ],
            self::APP => [
                PayEnum::WECHATPAY,
                PayEnum::ALIPAY,
                PayEnum::OFFLINEPAY,
                PayEnum::BALANCEPAY,
            ],
        );

        return $list[$channel] ?? [];
    }

}