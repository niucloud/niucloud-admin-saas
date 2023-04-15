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

namespace app\task;

use app\service\core\cron\CoreCronService;
use think\facade\Log;
use yunwuxin\cron\Task;

class CronTask extends Task
{

    public function configure()
    {
        //可以根据配置的值来切换间隔
//        switch(CoreCronService::CROND_LENGTH){
//
//        }
        //这儿可以通过设置定义执行周期
        $this->everyMinute(); //设置任务的周期，每天执行一次，更多的方法可以查看源代码，都有注释
    }

    /**
     * 执行任务
     * @return mixed
     */
    protected function execute()
    {
        //...具体的任务执行
        CoreCronService::execute();
        Log::write('当前时间:'.date('Y-m-d H:i:s'));
        //todo  这儿可以写一些返回值来美化格式
    }
}
