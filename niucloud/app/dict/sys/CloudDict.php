<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\dict\sys;

/**
 * 云服务的字典
 */
class CloudDict
{
    const APPLET_UPLOADING = 0;

    const APPLET_UPLOAD_SUCCESS = 1;

    const APPLET_UPLOAD_FAIL = -1;


    public static function getAppletUploadSatus($status) {
        $status_list = [
            self::APPLET_UPLOADING => get_lang('dict_cloud_applet.uploading'),
            self::APPLET_UPLOAD_SUCCESS => get_lang('dict_cloud_applet.upload_success'),
            self::APPLET_UPLOAD_FAIL => get_lang('dict_cloud_applet.upload_fail')
        ];
        return $status_list[$status] ?? '';
    }
}
