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

namespace app\job\sys;

use app\service\core\addon\CoreAddonInstallService;
use core\base\BaseJob;

/**
 * 队列异步执行插件安装任务
 */
class AddonInstall extends BaseJob
{
    public function doJob($addon, $task)
    {
        (new CoreAddonInstallService($addon))->executeTask($task);
    }

    public function failed($data)
    {

    }
}
