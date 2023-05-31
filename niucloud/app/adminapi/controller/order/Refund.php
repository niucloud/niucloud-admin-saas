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

use app\service\admin\order\RefundService;
use core\base\BaseAdminController;
use think\Response;

class Refund extends BaseAdminController
{
    /**
     * 退款列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['create_time', []],
            ['member_id', ''],
            ['refund_no', ''],
            ['status', ''],
            ['keywords', ''],
            ['order_no', ''],
        ]);
        return success((new RefundService())->getPage($data));
    }

    /**
     * 退款详情
     * @param int $order_id
     * @return Response
     */
    public function detail(int $refund_id)
    {
        return success((new RefundService())->getDetail($refund_id));
    }

    /**
     * 查询退款状态
     * @param $type
     * @return Response
     */
    public function status($type = 'recharge')
    {
        $data = $this->request->params([
            ['type', 'recharge']
        ]);
        return success((new RefundService())->getStatus($data['type']));
    }

    /**
     * 退款统计
     */
    public function stat()
    {
        return success((new RefundService())->stat());
    }
}
