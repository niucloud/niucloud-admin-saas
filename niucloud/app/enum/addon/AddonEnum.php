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

namespace app\enum\addon;

class AddonEnum
{
    /************************************************* 证书 *****************************************/


    const INSTALL = 'install';

    const UNINSTALL = 'uninstall';

    const UPDATE = 'update';

    const ON = 1;
    const OFF = 2;


    /**
     * 插件操作方式
     * @return array
     */
    public static function getActionType(){
        return [
            self::INSTALL => get_lang('enum_addon.install'),
            self::UNINSTALL => get_lang('enum_addon.uninstall'),
            self::UPDATE => get_lang('enum_addon.update'),
        ];
    }

    /**
     * 状态
     * @return array
     */
    public static function getStatus(){
        return [
            self::ON => get_lang('enum_addon.status_on'),//展示
            self::OFF  => get_lang('enum_addon.status_off'),//隐藏
        ];
    }
}