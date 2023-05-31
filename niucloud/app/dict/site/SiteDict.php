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

namespace app\dict\site;

class SiteDict
{
    const EXPIRE = 2;//过期

    const ON = 1;//正常
    const CLOSE = 3;//停止


    /**
     * 站点状态
     * @return array
     */
    public static function getStatus(){
        return [
            self::ON => get_lang('dict_site.status_on'),//正常
            self::EXPIRE  => get_lang('dict_site.status_expire'),//过期
            self::CLOSE  => get_lang('dict_site.status_close'),//停止
        ];
    }

}