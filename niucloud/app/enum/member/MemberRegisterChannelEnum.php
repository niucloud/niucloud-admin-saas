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

use app\enum\common\ChannelEnum;

/**
 * 会员注册渠道枚举类
 * Class MemberRegisterChannelEnum
 */
class MemberRegisterChannelEnum extends ChannelEnum
{
    //手动添加
    const MANUAL  = 'manual';

    public static function getType($type = ''){

        $data = ChannelEnum::getType($type);
        $data[self::MANUAL] = get_lang('enum_member.register_manual');//手动添加
        if(empty($type)){
            return $data;
        }
        return $data[$type] ?? '';
    }

}