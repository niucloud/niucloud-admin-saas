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

namespace app\dict\channel;

class WechatDict
{
    /************************************************* 请求消息的属性 *****************************************/

    //请求消息的属性  事件
    const MESSAGE_TYPE_EVENT = 'event';
    //请求消息的属性  文本
    const MESSAGE_TYPE_TEXT = 'text';
    //请求消息的属性  图片
    const MESSAGE_TYPE_IMAGE = 'image';
    //请求消息的属性  语音
    const MESSAGE_TYPE_VOICE = 'voice';
    //请求消息的属性  视频
    const MESSAGE_TYPE_VIDEO = 'video';
    //请求消息的属性  坐标
    const MESSAGE_TYPE_LOCATION = 'location';
    //请求消息的属性  链接
    const MESSAGE_TYPE_LINK = 'link';
    //请求消息的属性  文件
    const MESSAGE_TYPE_FILE = 'file';


    /************************************************* 请求事件的类型 *****************************************/
    //事件类型 - 关注
    const EVENT_SUBSCRIBE = 'subscribe';
    const EVENT_SCAN = 'SCAN';

    /************************************************* 回复的类型 *****************************************/
    const REPLY_SUBSCRIBE = 'subscribe';
    const REPLY_DEFAULT = 'default';
    const REPLY_KEYWORD = 'keyword';

    /************************************************* 消息加解密方式    not_encrypt 明文   compatible 兼容  safe 安全 *****************************************/
    const NOT_ENCRYPT = 'not_encrypt';//明文
    const COMPATIBLE = 'compatible';//兼容
    const SAFE = 'safe';//safe

    /**
     * 加解密方式
     * @return array
     */
    public static function getEncryptionType()
    {
        return [
            self::NOT_ENCRYPT => get_lang('dict_wechat_config.not_encrypt'),//明文
            self::COMPATIBLE => get_lang('dict_wechat_config.compatible'),//兼容
            self::SAFE => get_lang('dict_wechat_config.safe'),//安全
        ];
    }

}