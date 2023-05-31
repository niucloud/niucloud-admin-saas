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
 * 会员信息枚举类
 * Class MemberDict
 */
class MemberDict extends ChannelDict
{

    const ON = 1;
    const OFF = 0;

    /**
     * 会员状态
     * @return array
     */
    public static function getStatus(){
        return [
            self::ON => get_lang('dict_member.status_on'),//正常
            self::OFF  => get_lang('dict_member.status_off'),//无效
        ];
    }
}