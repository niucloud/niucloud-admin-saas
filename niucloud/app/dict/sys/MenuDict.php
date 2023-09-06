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

class MenuDict
{

    public const ON = 1;
    public const OFF = 0;


    /**
     * 菜单状态
     * @return array
     */
    public static function getStatus()
    {
        return [
            self::ON => get_lang('dict_menu.status_on'),//展示
            self::OFF => get_lang('dict_menu.status_off'),//隐藏
        ];
    }

}