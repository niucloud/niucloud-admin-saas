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

namespace app\api\controller\order;

use app\api\controller\BaseApiController;
use app\service\api\order\RechargeOrderService;
use think\Response;

class Recharge extends BaseApiController
{
    /**
     * 充值订单创建
     * @return Response
     */
    public function create()
    {
        //['order_from' => 'h5', 'ip' => '127.0.0.1', 'member_message' => '','recharge_money' => 12.00]
        $data = $this->request->params([
            ['member_message', ''],
            ['recharge_money', 0]
        ]);
        $res = (new RechargeOrderService())->recharge($data);
        return success($res);
    }

}
