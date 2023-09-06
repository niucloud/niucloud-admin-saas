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
 * 会员端口枚举类
 * Class MemberRegisterTypeDict
 * @package app\dict\member
 */
class MemberRegisterTypeDict
{
    //微信小程序
    const WEAPP = 'weapp';
    //微信公众号
    const WECHAT = 'wechat';

    //用户名密码注册登录
    const USERNAME = 'username';
    //手机验证码登录
    const MOBILE = 'mobile';
    //手动添加
    const MANUAL = 'manual';

    public static function getType($type = '')
    {
        $data = [
            self::WEAPP => get_lang('dict_member.register_weapp'),//微信小程序
            self::WECHAT => get_lang('dict_member.register_wechat'),//'微信公众号',
            self::MANUAL => get_lang('dict_member.register_manual'),//'手动添加',
            self::USERNAME => get_lang('dict_member.register_username'),//用户名密码登录
            self::MOBILE => get_lang('dict_member.register_mobile'),//手机号验证码登录,
        ];
        if (empty($type)) {
            return $data;
        }
        return $data[$type] ?? '';
    }

}