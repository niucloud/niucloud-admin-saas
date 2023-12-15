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

    public const SYSTEM = 'system';
    public const CREATE = 'create';
    public const GENERATOR = 'generator';
    public static function getSource(){
        return [
            self::SYSTEM => get_lang('dict_menu.source_system'),//系统文件
            self::CREATE => get_lang('dict_menu.source_create'),//新建菜单
            self::GENERATOR => get_lang('dict_menu.source_generator'),//代码生成器
        ];
    }
}
