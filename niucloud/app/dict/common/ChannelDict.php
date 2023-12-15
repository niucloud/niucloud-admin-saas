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

namespace app\dict\common;


/**
 * 渠道枚举类
 * Class ChannelDict
 * @package app\dict\common
 */
class ChannelDict
{
    //微信小程序
    public const WEAPP = 'weapp';
    //微信公众号
    public const WECHAT = 'wechat';
    //手机端H5
    public const H5 = 'h5';
    //电脑端PC
    public const PC = 'pc';
    //app端
    public const APP = 'app';


    public static function getType($type = '')
    {
        $data = [
            self::WEAPP => get_lang('dict_channel.channel_weapp'),//微信小程序
            self::WECHAT => get_lang('dict_channel.channel_wechat'),//'微信公众号',
            self::H5 => get_lang('dict_channel.channel_h5'),//'手机H5',
            self::PC => get_lang('dict_channel.channel_pc'),//'电脑PC',
            self::APP => get_lang('dict_channel.channel_app'),//'手机app',
        ];
        if (empty($type)) {
            return $data;
        }
        return $data[$type] ?? '';
    }
}