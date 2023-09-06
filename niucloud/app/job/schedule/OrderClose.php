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

namespace app\job\schedule;

use core\base\BaseJob;
use think\facade\Log;

/**
 * 队列异步调用定时任务
 */
class OrderClose extends BaseJob
{
    public function doJob()
    {
        Log::write('订单关闭计划任务' . date('Y-m-d h:i:s'));
        return true;
    }
}
