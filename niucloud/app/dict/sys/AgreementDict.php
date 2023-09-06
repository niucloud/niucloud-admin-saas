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

namespace app\dict\sys;

/**
 * 协议相关枚举类
 * Class AgreementDict
 * @package app\dict\sys
 */
class AgreementDict
{
    //服务协议
    const SERVICE = 'service';
    //隐私协议
    const PRIVACY = 'privacy';

    /**
     * 获取协议类型
     * @return string[]
     */
    public static function getType()
    {
        return [
            self::SERVICE => get_lang('dict_agreement.service'),//服务协议,
            self::PRIVACY => get_lang('dict_agreement.privacy'),//隐私协议
        ];
    }

}