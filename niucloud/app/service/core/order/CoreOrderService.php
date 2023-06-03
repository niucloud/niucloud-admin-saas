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

namespace app\service\core\order;

use app\model\order\Order;
use core\base\BaseCoreService;

/**
 * 订单
 */
class CoreOrderService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 获取订单信息
     * @param int $site_id
     * @param int $order_id
     * @return Order|array|mixed|\think\Model
     */
    public function getOrderInfo(int $site_id, int $order_id){
        return $this->model->where([
            ['site_id', '=', $site_id],
            ['order_id', '=', $order_id]
        ])->field('*')->findOrEmpty()->toArray();
    }

}

