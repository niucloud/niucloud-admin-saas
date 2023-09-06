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

namespace app\dict\notice;

class NoticeTypeDict
{
    //短信
    public const SMS = 'sms';
    //微信公众号
    public const WECHAT = 'wechat';
    //微信小程序
    public const WEAPP = 'weapp';


    /**
     * 获取消息类型
     * @return array
     */
    public static function getType()
    {
        return [
            self::SMS => get_lang('dict_notice.type_sms'),//短信
            self::WECHAT => get_lang('dict_notice.type_wechat'),//微信公众号
            self::WEAPP => get_lang('dict_notice.type_weapp'),//微信小程序
        ];
    }

}