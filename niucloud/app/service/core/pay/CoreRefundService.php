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

namespace app\service\core\pay;

use app\model\pay\Refund;
use core\base\BaseCoreService;
use core\exception\PayException;

/**
 * 退款服务层
 * Class CorePayService
 * @package app\service\core\pay
 */
class CoreRefundService extends BaseCoreService
{
    protected $pay_event;
    public function __construct()
    {
        parent::__construct();
        $this->model = new Refund();
        $this->pay_event = new CorePayEventService();
    }

    /**
     * 创建支付单据
     * @param $site_id
     * @param string $out_trade_no
     * @param float $money
     * @return string|null
     */
    public function create(int $site_id, string $out_trade_no, float $money, string $reason = ''){
        //通过交易流水号获取支付单据
        $pay = (new CorePayService())->findPayInfoByOutTradeNo($site_id, $out_trade_no);
        if($pay->isEmpty()) throw new PayException();//单据不存在
        //校验当前数据是否存在
        //存在就修改,不存在就创建
        $refund_no = create_no('refund', $pay->id);
        $data = array(
            'site_id' => $site_id,
            'money' => $money,
            'type' => $pay->type,//支付方式
            'channel' => $pay->channel,//渠道
            'out_trade_no' => $out_trade_no,
            'refund_no' => $refund_no,
            'status' => 0,
            'reason' => $reason
        );
        $this->model->create($data);
        return $refund_no;
    }

    /**
     * 退款
     * @param int $site_id
     * @param string $out_trade_no
     * @param float $money
     * @return void
     */
    public function refund(int $site_id, string $refund_no){
        $refund = $this->findByRefundNo($site_id, $refund_no);
        if($refund->isEmpty()) throw new PayException();
        $out_trade_no = $refund->out_trade_no;
        $money = $refund->money;
        $this->pay_event->init($site_id, $refund->channel, $refund->type)->refund($out_trade_no, $money, $refund_no);

        //判断成功的话,可以直接调用退款成功
    }

    /**
     * 获取退款单据
     * @param int $site_id
     * @param string $refund_no
     * @return void
     */
    public function findByRefundNo(int $site_id, string $refund_no){
        return $this->model->where([
            ['site_id', '=', $site_id],
            ['refund_no', '=', $refund_no],
        ])->findOrEmpty();
    }

    /**
     * 退款完成
     * @return void
     */
    public function refundSuccess(){

    }
}