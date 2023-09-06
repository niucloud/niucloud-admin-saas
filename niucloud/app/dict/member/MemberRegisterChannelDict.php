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

use app\dict\common\ChannelDict;

/**
 * 会员注册渠道枚举类
 * Class MemberRegisterChannelDict
 */
class MemberRegisterChannelDict extends ChannelDict
{
    //手动添加
    const MANUAL = 'manual';

    public static function getType($type = '')
    {

        $data = ChannelDict::getType($type);
        $data[self::MANUAL] = get_lang('dict_member.register_manual');//手动添加
        if (empty($type)) {
            return $data;
        }
        return $data[$type] ?? '';
    }

}