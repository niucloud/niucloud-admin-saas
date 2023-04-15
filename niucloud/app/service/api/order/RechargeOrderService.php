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

namespace app\service\api\order;

use app\service\api\BaseApiService;
use app\service\core\order\recharge\CoreRechargeOrderService;

/**
 *充值订单服务层
 * Class RechargeOrderService
 * @package app\service\api\order
 */
class RechargeOrderService extends BaseApiService
{
    /**
     * 会员充值
     * @param $data //['order_from' => 'h5', 'ip' => '127.0.0.1', 'member_message' => '','recharge_money' => 12.00]
     */
    public function recharge(array $data)
    {
        $data['order_from'] = $this->channel;
        $data['site_id'] = $this->site_id;
        $data['member_id'] = $this->member_id;
        return (new CoreRechargeOrderService())->create($data);
    }

}