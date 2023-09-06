<?php

namespace app\listener\job;

class QueueFailedLoggerListener
{

    const SHOULD_RUN_HOOK_CALLBACK = true;

    /**
     * 错误报告
     * @param $job
     * @return bool     true                  //是否需要删除任务并触发其failed() 方法
     */
    public function report(&$job)
    {
        $failedJobLog = [
            'jobHandlerClassName' => $job->getName(),
            'queueName' => $job->getQueue(),
            'jobData' => $job->getRawBody()['data'],
            'attempts' => $job->attempts(),
        ];
        var_export(json_encode($failedJobLog, true));
        // $job->release();     //重发任务
        $job->delete();         //删除任务
        //$job->failed();	  //通知消费者类任务执行失败
        return self::SHOULD_RUN_HOOK_CALLBACK;
    }
}