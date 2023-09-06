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

class MenuTypeDict
{

    public const LIST = '0';
    public const MENU = '1';
    public const BUTTON = '2';

    public static function getMenuType()
    {
        return [
            self::LIST => get_lang('dict_menu.type_list'),//目录
            self::MENU => get_lang('dict_menu.type_menu'),//菜单
            self::BUTTON => get_lang('dict_menu.type_button'),//接口
        ];
    }

}