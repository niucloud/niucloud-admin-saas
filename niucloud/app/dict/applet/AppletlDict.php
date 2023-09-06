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

namespace app\dict\applet;


/**
 * 小程序版本
 * Class ChannelDict
 * @package app\dict\common
 */
class AppletlDict
{

    public const ON = '1';

    public const OFF = '2';


    public const DOWNLOAD = 'download';//下载
    public const UPGRADE = 'upgrade';//升级

    /**
     * 小程序版本状态
     * @return array
     */
    public static function getStatus()
    {
        return [
            self::ON => get_lang('dict_applet.channel_weapp'),//启用
            self::OFF => get_lang('dict_applet.channel_wechat'),//下架
        ];
    }
}