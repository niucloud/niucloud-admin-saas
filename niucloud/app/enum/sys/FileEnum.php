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

namespace app\enum\sys;

class FileEnum
{
    //上传方式  图片
    const IMAGE = 'image';
    //上传方式  视频
    const VIDEO = 'video';
    //上传方式  文件
    const DOCUMENT = 'document';

    const LOCAL = 'local';//本地存储
    const QINIU = 'qiniu';//七牛云
    const ALIYUN = 'aliyun';//阿里云
    const QCLOUD = 'qcloud';//腾讯云
    /**
     * 附件类型
     * @return array
     */
    public static function getType(){
        return [
            self::IMAGE => get_lang('enum_file.type_image'),//图片
            self::VIDEO  => get_lang('enum_file.type_video'),//视频
        ];
    }

    /**
     * 存储方式
     * @return array
     */
    public static function getStorageType(){
        return [
            self::LOCAL => get_lang('enum_file.storage_type_local'),//本地存储
            self::QINIU  => get_lang('enum_file.storage_type_qiniu'),//七牛云
            self::ALIYUN => get_lang('enum_file.storage_type_image'),//阿里云
            self::QCLOUD  => get_lang('enum_file.storage_type_qcloud'),//腾讯云
        ];
    }


    const WECHAT = 'wechat';//微信支付


    /**
     * 获取上传的场景
     * @return array
     */
    public static function getSceneType(){
        return [
            self::WECHAT,//微信相关上传
            self::ALIYUN,//阿里云相关上传
            self::IMAGE,//图片上传
            self::VIDEO,//视频上传
        ];
    }
}