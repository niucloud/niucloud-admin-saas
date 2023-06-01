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
use app\service\core\schedule\CoreCronService;
use core\job\Dispatch;
use think\queue\Job;

/**
 * 队列
 */
abstract class BaseJob extends Dispatch
{

    /**
     * 引导
     * @param $name
     * @param $arguments
     */
    public function __call($name, $arguments)
    {
        $this->fire(...$arguments);
    }


    /**
     * 消费任务
     * @param Job $job
     * @param $params
     */
    public function fire(Job $job, $params): void
    {
        try {
            $action = $params['do'] ?? 'doJob';//任务名
            $data = $params['data'] ?? [];//数据
            $error_count = $params['error_count'] ?? 0;//执行任务错误的最大重试次数
            $this->runJob($action, $job, $data, $error_count);
        } catch ( \Throwable $e ) {
            $job->delete();
        }
    }


    /**
     * 执行任务
     * @param string $action
     * @param Job $job
     * @param array $data
     * @param int $error_count
     */
    protected function runJob(string $action, Job $job, array $data, int $error_count = 3)
    {
        $action = method_exists($this, $action) ? $action : 'handle';
        if (!method_exists($this, $action)) {
            $job->delete();
        }
        if ($this->{$action}(...$data)) {
            //删除任务
            $job->delete();
        } else {
            if ($job->attempts() >= $error_count && $error_count) {
                //删除任务
                $job->delete();
            } else {
                //重发任务
                $job->release();
            }
        }
    }

}
