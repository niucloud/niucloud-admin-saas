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

namespace app\service\admin\order;

use app\service\core\order\recharge\CoreRechargeRefundService;
use core\base\BaseAdminService;

/**
 * 充值订单
 * Class RechargeOrderService
 * @package app\service\admin\order
 */
class RechargeOrderRefundService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
    }

    public function create($order_id) {
        try {
            (new CoreRechargeRefundService())->create($this->site_id, $order_id);
            return true;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}