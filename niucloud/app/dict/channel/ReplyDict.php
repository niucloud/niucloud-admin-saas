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

class ReplyDict
{
    /************************************************* 请求消息的属性 *****************************************/

    //状态启用
    const STATUS_ON = 1;
    //状态关闭
    const STATUS_OFF = 0;


    const CONTENT_TYPE_TEXT = 'text';//文本
    const CONTENT_TYPE_IMAGE = 'image';//视频
    const CONTENT_TYPE_VIDEO = 'video';//视频
    const CONTENT_TYPE_VOICE = 'voice';//声音
    const CONTENT_TYPE_NEW = 'news';//图文
    const CONTENT_TYPE_ARTICLE = 'article';//文章


    //关键词匹配模式
    const MATCHING_TYPE_FULL = 'full';//全匹配
    const MATCHING_TYPE_LIKE = 'like';//模糊匹配

    public static function getStatus(){
        return [
            self::STATUS_ON => get_lang('dict_wechat_reply.status_on'),//启用
            self::STATUS_OFF  => get_lang('dict_wechat_reply.status_off'),//关闭
        ];
    }
}