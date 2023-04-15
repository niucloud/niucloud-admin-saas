<?php

namespace app\enum\common;

/**
 * admin管理菜单
 * Class InstallAdminMenuEnum
 * @package app\enum\install
 */
class CommonEnum
{
    const UNKNOWN = 0;
    const MAN = 1;
    const WOMAN = 2;


    /**
     * 性别
     * @return array
     */
    public static function getSexType(){
        return [
            self::UNKNOWN => get_lang('enum_sex.unknown'),//未知
            self::MAN  => get_lang('enum_sex.man'),//男
            self::WOMAN  => get_lang('enum_sex.woman'),//女
        ];
    }
}