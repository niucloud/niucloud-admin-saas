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
use app\service\core\cron\CoreCronService;
use core\base\BaseJob;
use think\queue\Job;

/**
 * 队列异步调用定时任务
 */
class Cronexecute extends BaseJob
{
    public function fire(Job $job, $data)
    {

        //....这里执行具体的任务

//        if ($job->attempts() > 3) {
//            //通过这个方法可以检查这个任务已经重试了几次了
//        }
//
//
//        //如果任务执行成功后 记得删除任务，不然这个任务会重复执行，直到达到最大重试次数后失败后，执行failed方法
//        $job->delete();
//
//        // 也可以重新发布这个任务
//        $job->release($delay ?? 0); //$delay为延迟时间


        $res = event($data[ 'event' ], $data['data'] );
        //根据结果来判断下一步

        $cron_task_model = new CoreCronService();
        //定义最新的执行时间或错误
        $cron_task_model->after($data);
        $job->delete();



    }


    /**
     * 失败后的解决方案或提示
     * @param $data
     * @return void
     */
    public function failed($data){

        // ...任务达到最大重试次数后，失败了
    }

}
