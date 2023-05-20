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

use app\enum\order\OrderRefundEnum;
use app\enum\pay\PayEnum;
use app\model\order\Order;
use app\model\order\OrderItem;
use app\model\order\OrderItemRefund;
use app\service\core\pay\CorePayService;
use app\service\core\pay\CoreRefundService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use think\facade\Db;

/**
 * 退款创建
 * Class CoreOrderCreateService
 * @package app\service\core\order
 */
class CoreOrderRefundService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new OrderItemRefund();
    }

    /**
     * 退款创建
     * @param array $data
     */
    public function create(array $data)
    {
        $refund_no = (new CoreRefundService())->create($data['site_id'], $data['out_trade_no'], $data['money'], $data['reason'] ?? '');

        $create = $this->model->create([
            'order_item_id' => $data['order_item_id'],
            'order_id' => $data['order_id'],
            'site_id' => $data['site_id'],
            'member_id' => $data['member_id'],
            'num' => $data['num'],
            'money' => $data['money'],
            'refund_no' => $refund_no,
            'item_type' => $data['item_type'],
            'create_time' => time()
        ]);

        return [
            'refund_no' => $refund_no,
            'refund_id' => $create->refund_id
        ];
    }



    /**
     * 退款转账完成
     * @param string $refund_no
     * @return void
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function refundComplete(string $refund_no) {
        $model = $this->model->where([ ['refund_no', '=', $refund_no] ])->find();
        if ($model->isEmpty()) throw new CommonException('ITEM_REFUND_NOT_EXIST');

        Db::startTrans();
        try {
            event('refundComplete', $model->toArray());
            Db::commit();
            return true;
        } catch(\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }
}

