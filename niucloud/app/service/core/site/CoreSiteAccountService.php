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

namespace app\service\core\site;

use app\model\pay\Pay;
use app\model\pay\Refund;
use app\model\pay\Transfer;
use app\model\site\SiteAccountLog;
use core\base\BaseCoreService;

/**
 * 站点账单记录服务层
 * Class CoreSiteAccountService
 * @package app\service\core\site
 */
class CoreSiteAccountService extends BaseCoreService
{

    /**
     * 添加支付账单
     * @param array $pay_info
     * @return mixed
     */
    public function addPayLog(array $pay_info)
    {
        $pay_info = (new Pay())->where([['out_trade_no', '=', $pay_info['out_trade_no']], ['site_id', '=', $pay_info['site_id']]])->findOrEmpty()->toArray();
        $data = [
            'site_id' => $pay_info['site_id'],
            'type' => 'pay',
            'money' => $pay_info['money'],
            'trade_no' => $pay_info['out_trade_no'],
        ];
        $res = (new SiteAccountLog())->create($data);
        return $res->id;
    }

    /**
     * 添加退款账单记录
     * @param int $site_id
     * @param string $refund_no
     * @return mixed
     */
    public function addRefundLog(int $site_id, string $refund_no)
    {
        $refund_info = (new Refund())->where([['refund_no', '=', $refund_no], ['site_id', '=', $site_id]])->findOrEmpty()->toArray();
        $data = [
            'site_id' => $refund_info['site_id'],
            'type' => 'refund',
            'money' => $refund_info['money'] *(-1),
            'trade_no' => $refund_info['refund_no'],
        ];
        $res = (new SiteAccountLog())->create($data);
        return $res->id;
    }

    /**
     * 添加转账账单记录
     * @param int $site_id
     * @param string $transfer_no
     * @return mixed
     */
    public function addTransferLog(int $site_id, string $transfer_no)
    {
        $transfer_info = (new Transfer())->where([['transfer_no', '=', $transfer_no], ['site_id', '=', $site_id]])->findOrEmpty()->toArray();
        $data = [
            'site_id' => $transfer_info['site_id'],
            'type' => 'transfer',
            'money' => $transfer_info['money'] *(-1),
            'trade_no' => $transfer_info['transfer_no'],
        ];
        $res = (new SiteAccountLog())->create($data);
        return $res->id;
    }

}