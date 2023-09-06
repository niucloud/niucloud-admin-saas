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

namespace app\service\admin\applet;

use app\service\core\applet\CoreAppletDownloadService;
use core\base\BaseAdminService;
use think\response\File;

/**
 * 小程序下载服务层
 */
class AppletDownloadService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();

    }


    /**
     * 小程序下载
     * @param int $id
     * @return File
     */
    public function download(int $id)
    {
        $core_applet_download_service = new CoreAppletDownloadService($id);
        return $core_applet_download_service->download($this->site_id);
    }


}