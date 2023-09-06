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

namespace app\dict\schedule;

class ScheduleDict
{

    public const CRON = 'cron';//定时任务
    public const CROND = 'crond';//周期任务

    public const ON = 1;
    public const OFF = 2;
    public const MIN = 'min';
    public const HOUR = 'hour';
    public const DAY = 'day';//每隔几分钟
    public const WEEK = 'week';//每隔几小时
    public const MONTH = 'month';//每隔几天

    /**
     * 任务模式
     * @return array
     */
    public static function getType()
    {
        return [
            self::CRON => get_lang('dict_schedule.type_cron'),//定时任务
            self::CROND => get_lang('dict_schedule.type_crond'),//周期任务
        ];
    }//每周

    /**
     * 任务启用状态
     * @return array
     */
    public static function getStatus()
    {
        return [
            self::ON => get_lang('dict_schedule.on'),//启用
            self::OFF => get_lang('dict_schedule.off'),//关闭
        ];
    }//每月

    public static function getDateType()
    {
        return [
            self::MIN => get_lang('dict_schedule.min'),
            self::HOUR => get_lang('dict_schedule.hour'),
            self::DAY => get_lang('dict_schedule.day'),
            self::WEEK => get_lang('dict_schedule.week'),
            self::MONTH => get_lang('dict_schedule.month'),
        ];
    }
}