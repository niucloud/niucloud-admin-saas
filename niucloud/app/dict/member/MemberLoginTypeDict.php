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

namespace app\dict\member;

/**
 * 会员登录方式
 * Class MemberLoginTypeDict
 * @package app\dict\member
 */
class MemberLoginTypeDict
{
    //用户名密码注册登录
    public const USERNAME = 'username';
    //手机验证码登录
    public const MOBILE = 'mobile';
    //微信公众号授权登录
    public const WECHAT = 'wechat';
    //微信小程序授权登录
    public const WEAPP = 'weapp';

    public static function getType($type = '')
    {
        $data = [
            self::USERNAME => get_lang('dict_member.login_username'),//用户名密码登录
            self::MOBILE => get_lang('dict_member.login_mobile'),//手机号验证码登录,
            self::WECHAT => get_lang('dict_member.login_wechat'),//'微信公众号授权登录',
            self::WEAPP => get_lang('dict_member.login_weapp'),//'微信小程序授权登录',
        ];
        if (empty($type)) {
            return $data;
        }
        return $data[$type] ?? '';
    }

}