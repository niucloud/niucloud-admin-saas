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

use app\model\system\Cron;
use app\service\core\schedule\CoreCronService;
use core\base\BaseJob;
use think\queue\Job;

/**
 * 校验文件删除是否在正常运行
 */
class CheckDeleteJob extends BaseJob
{
    public function doJob($file)
    {
        @unlink($file);
        return true;
    }
}
