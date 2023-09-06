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

namespace app\adminapi\controller\applet;

use app\service\admin\applet\AppletDownloadService;
use core\base\BaseAdminController;
use think\response\File;

/**
 * 小程序版本下载控制器
 */
class VersionDownload extends BaseAdminController
{

    /**
     * 下载
     * @param $id
     * @return File
     */
    public function download($id)
    {
        return (new AppletDownloadService())->download($id);
    }


}
