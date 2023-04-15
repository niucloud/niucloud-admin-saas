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

namespace app\enum\sys;

class CronEnum
{

    const CRON = 'cron';//定时任务
    const CROND = 'crond';//周期任务
    const MINUTE = 'minute';//分钟

    const DAY = 'day';//天
    const WEEK = 'week';//星期
    const MONTH = 'month';//月份

    /**
     * 任务模式
     * @return array
     */
    public static function getType(){
        return [
            self::CRON => get_lang('enum_cron.type_cron'),//定时任务
            self::CROND  => get_lang('enum_cron.type_crond'),//周期任务
        ];
    }
    /**
     * 周期类型
     * @return array
     */
    public static function getCrondType(){
        return [
            self::MINUTE => get_lang('enum_cron.type_minute'),//分钟
            self::DAY  => get_lang('enum_cron.type_day'),//天
            self::WEEK  => get_lang('enum_cron.type_week'),//星期
            self::MONTH  => get_lang('enum_cron.type_month'),//月份
        ];
    }


}