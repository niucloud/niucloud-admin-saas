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

namespace app\enum\member;

/**
 * 会员端口枚举类
 * Class MemberRegisterTypeEnum
 * @package app\enum\member
 */
class MemberRegisterTypeEnum
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
    //用户名密码注册登录
    const USERNAME   = 'username';
    //手机验证码登录
    const MOBILE  = 'mobile';
    //手动添加
    const MANUAL  = 'manual';

    public static function getType($type = ''){
        $data = [
            self::WEAPP    => get_lang('enum_member.register_weapp'),//微信小程序
            self::WECHAT     => get_lang('enum_member.register_wechat'),//'微信公众号',
            self::H5            => get_lang('enum_member.register_h5'),//'手机H5',
            self::PC            => get_lang('enum_member.register_pc'),//'电脑PC',
            self::APP           => get_lang('enum_member.register_app'),//'手机app',
            self::MANUAL       => get_lang('enum_member.register_manual'),//'手动添加',
            self::USERNAME    => get_lang('enum_member.register_username'),//用户名密码登录
            self::MOBILE     => get_lang('enum_member.register_mobile'),//手机号验证码登录,
        ];
        if(empty($type)){
            return $data;
        }
        return $data[$type] ?? '';
    }

}