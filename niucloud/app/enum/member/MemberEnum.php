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
 * 会员信息枚举类
 * Class MemberEnum
 */
class MemberEnum extends ChannelEnum
{

    const ON = 1;
    const OFF = 0;

    /**
     * 会员状态
     * @return array
     */
    public static function getStatus(){
        return [
            self::ON => get_lang('enum_member.status_on'),//正常
            self::OFF  => get_lang('enum_member.status_off'),//无效
        ];
    }
}