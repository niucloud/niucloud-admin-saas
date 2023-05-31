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

use app\service\admin\order\RechargeOrderRefundService;
use app\service\admin\order\RechargeOrderService;
use core\base\BaseAdminController;
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
            ['order_no', ''],
            ['order_status', ''],
            ['order_from', ''],
            ['create_time', []],
            ['pay_time', []],
            ['member_id', ''],
            ['start_money', 0],
            ['end_money', 0]
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

    public function refund($order_id)
    {
        $res = (new RechargeOrderRefundService())->create($order_id);
        if ($res === true) return success();
        return fail($res);
    }


    /**
     * 充值统计
     */
    public function stat()
    {
        $data = $this->request->params([
            [ 'member_id', '' ],
        ]);
        $res = (new RechargeOrderService())->stat($data);
        return success($res);
    }


}
