<?php

namespace app\dict\common;

/**
 * admin管理菜单
 * Class CommonDict
 * @package app\dict\common
 */
class CommonDict
{
    public const UNKNOWN = 0;
    public const MAN = 1;
    public const WOMAN = 2;


    /**
     * 性别
     * @return array
     */
    public static function getSexType()
    {
        return [
            self::UNKNOWN => get_lang('dict_sex.unknown'),//未知
            self::MAN => get_lang('dict_sex.man'),//男
            self::WOMAN => get_lang('dict_sex.woman'),//女
        ];
    }
}