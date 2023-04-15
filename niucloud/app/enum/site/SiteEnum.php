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

namespace app\enum\site;

class SiteEnum
{
    const EXPIRE = 2;//过期

    const ON = 1;//正常
    const EXPERIENCE = 0;//体验期


    /**
     * 站点状态
     * @return array
     */
    public static function getStatus(){
        return [
            self::ON => get_lang('enum_site.status_on'),//正常
            self::EXPERIENCE  => get_lang('enum_site.status_experience'),//体验期
            self::EXPIRE  => get_lang('enum_site.status_expire'),//过期
        ];
    }

}