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

namespace app\dict\addon;

class AddonDict
{
    /************************************************* 证书 *****************************************/


    const INSTALL = 'install';

    const UNINSTALL = 'uninstall';

    const UPDATE = 'update';

    const ON = 1;
    const OFF = 2;

    // 未执行
    const INSTALL_UNEXECUTED = 'unexecuted';
    // 执行中
    const INPROGRESS = 'inprogress';
    // 执行成功
    const INSTALL_SUCCESS = 'success';
    // 执行失败
    const INSTALL_FAIL = 'fail';

    /**
     * 插件操作方式
     * @return array
     */
    public static function getActionType()
    {
        return [
            self::INSTALL => get_lang('dict_addon.install'),
            self::UNINSTALL => get_lang('dict_addon.uninstall'),
            self::UPDATE => get_lang('dict_addon.update'),
        ];
    }

    /**
     * 状态
     * @return array
     */
    public static function getStatus()
    {
        return [
            self::ON => get_lang('dict_addon.status_on'),//展示
            self::OFF => get_lang('dict_addon.status_off'),//隐藏
        ];
    }

    const FRAMEWORK_KEY = 'niucloud-admin';

    const APP = 'app';
    const ADDON = 'addon';

    /**
     * 插件类型
     * @return array
     */
    public static function getType()
    {
        return [
            self::APP => get_lang('dict_addon.type_app'),//应用
            self::ADDON => get_lang('dict_addon.type_addon'),//插件
        ];
    }
}
