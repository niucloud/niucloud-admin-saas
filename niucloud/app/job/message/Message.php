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

namespace app\job\message;

use app\job\BaseJob;
use app\model\system\Cron;
use app\service\core\message\CoreMessageEventService;
use app\service\core\cron\CoreCronService;
use extend\exception\MessageException;
use think\queue\Job;

/**
 * 队列异步调用定时任务
 */
class Message extends BaseJob
{


    /**
     * 消费
     * @param $data
     * @return true
     */
    protected function doJob($data)
    {
        try{
            (new CoreMessageEventService(false))->event($data);
        }catch(MessageException $e){
            print($e->getMessage());
            return false;
        }
        // 实际业务流程处理
        return true;
    }




}
