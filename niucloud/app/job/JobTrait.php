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

namespace app\job;

use app\model\system\Cron;
use app\service\core\cron\CoreCronService;
use think\queue\Job;

/**
 * 队列异步调用定时任务
 */
trait JobTrait
{
    //消息最大执行次数


    /**
     * fire是消息队列默认调用的方法
     * @param Job $job 当前的任务对象
     * @param array|mixed $data 发布任务时自定义的数据
     */
    public function fire(Job $job, $data)
    {
        //有效消息到达消费者时可能已经不再需要执行了
        if(!$this->checkJob($data)){
            $job->delete();
            return;
        }
        //执行业务处理
        if($this->doJob($data)){
            $job->delete();//任务执行成功后删除
//            print('dismiss job has been down and deleted');
        }else{
            //检查任务重试次数
            if($job->attempts() > self::MAX_TIMES){
//                print('dismiss job has been retried more that 3 times');
                $job->delete();
            }
        }
    }
    /**
     * 消息在到达消费者时可能已经不需要执行了
     * @param array|mixed $data 发布任务时自定义的数据
     * @return boolean 任务执行的结果
     */
    protected function checkJob($data)
    {
        return true;
    }

    /**
     * 失败后的解决方案或提示
     * @param $data
     * @return void
     */
    public function failed($data){

        //todo 可以在这儿给系统管理员发送邮件短信...来提醒
        // ...任务达到最大重试次数后，失败了

        print('Warning: Job failed after max retries. job data is :'.var_export($data,true)."\n");
    }

}
