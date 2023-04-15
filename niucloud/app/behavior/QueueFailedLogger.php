<?php

namespace app\behavior;

class QueueFailedLogger
{

    const SHOULD_RUN_HOOK_CALLBACK = true;
    /**
     *
     * 错误报告
     * @param $jobObject   \think\queue\Job   //任务对象，保存了该任务的执行情况和业务数据
     * @return bool     true                  //是否需要删除任务并触发其failed() 方法
     */

    public function report(&$job){

        $failedJobLog = [
            'jobHandlerClassName'   => $job->getName(), // 'application\index\job\Hello'
            'queueName' => $job->getQueue(),// 'helloJobQueue'
            'jobData'   => $job->getRawBody()['data'],  // '{'a': 1 }'
            'attempts'  => $job->attempts(),            // 3
        ];
        var_export(json_encode($failedJobLog,true));

        // $job->release();     //重发任务
        $job->delete();         //删除任务
        //$job->failed();	  //通知消费者类任务执行失败

        return self::SHOULD_RUN_HOOK_CALLBACK;
    }
}