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

namespace app\adminapi\controller\order;

use app\adminapi\controller\BaseAdminController;
use app\service\admin\order\RechargeOrderService;
use think\Response;

class Recharge extends BaseAdminController
{
    /**
     * 充值订单列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['order_status', ''],
            ['order_from', ''],
            ['create_time', []],
            ['member_id', '']
        ]);
        return success((new RechargeOrderService())->getPage($data));
    }

    /**
     * 充值订单详情
     * @param int $order_id
     * @return Response
     */
    public function detail(int $order_id)
    {
        return success((new RechargeOrderService())->getDetail($order_id));
    }

    public function status()
    {
        return success((new RechargeOrderService())->getStatus());
    }

}
