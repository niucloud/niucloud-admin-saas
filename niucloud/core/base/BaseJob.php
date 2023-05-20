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

namespace core\base;

use app\model\system\Cron;
use core\job\Dispatch;
use think\queue\Job;

/**
 * 队列异步调用定时任务
 */
abstract class BaseJob extends Dispatch
{

    /**
     * @param $name
     * @param $arguments
     */
    public function __call($name, $arguments)
    {
        $this->fire(...$arguments);
    }

    /**
     * 运行消息队列
     * @param Job $job
     * @param $data
     */
    public function fire(Job $job, $data): void
    {
        try {
            $action     = $data['do'] ?? 'doJob';//任务名
            $infoData   = $data['data'] ?? [];//数据
            $errorCount = $data['errorCount'] ?? 0;//执行任务错误的最大重试次数
            $this->runJob($action, $job, $infoData, $errorCount);
        } catch (\Throwable $e) {
            $job->delete();
        }
    }



    /**
     * 执行队列
     * @param string $action
     * @param Job $job
     * @param array $infoData
     * @param int $errorCount
     */
    protected function runJob(string $action, Job $job, array $infoData, int $errorCount = 3)
    {

        $action = method_exists($this, $action) ? $action : 'handle';
        if (!method_exists($this, $action)) {
            $job->delete();
        }

        if ($this->{$action}(...$infoData)) {
            //删除任务
            $job->delete();
        } else {
            if ($job->attempts() >= $errorCount && $errorCount) {
                //删除任务
                $job->delete();
            } else {
                //再次放入队列
                $job->release();
            }
        }

    }
}
