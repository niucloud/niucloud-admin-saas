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

namespace app\job\pay;

use app\job\BaseJob;
use app\job\JobTrait;
use app\model\system\Cron;
use app\service\core\cron\CoreCronService;
use app\service\core\pay\CorePayService;
use extend\exception\PayException;
use think\facade\Log;
use think\queue\Job;

/**
 * 队列异步调用支付定时未支付恢复
 */
class PayReturnTo extends BaseJob
{

//    use JobTrait;
    /**
     * 消费
     * @param $data
     * @return true
     */
    protected function doJob($data)
    {
        try{
            Log::write('pay_log_'.json_encode($data));
            $res = (new CorePayService())->returnTo($data['site_id'], $data['out_trade_no']);
//            return $res;
        }catch(\Throwable $e){
            print($e->getMessage());
//            return false;
        }
        // 实际业务流程处理
        return true;
    }

}
