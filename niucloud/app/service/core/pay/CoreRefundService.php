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

use app\dict\pay\RefundDict;
use app\model\pay\Refund;
use core\base\BaseCoreService;
use core\exception\PayException;
use think\facade\Db;

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
            'status' => RefundDict::WAIT,
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
        try{
            //判断成功的话,可以直接调用退款成功
            $pay_result = $this->pay_event->init($site_id, $refund->channel, $refund->type)->refund($out_trade_no, $money, $money, $refund_no);
            $this->refundNotify($site_id, $out_trade_no, $refund->type, $pay_result);
        }catch (\Throwable $e) {
            throw new PayException($e->getMessage());
        }
        return true;
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



    public function refundNotify(int $site_id, $out_trade_no, string $type, array $params = []){
        $refund_no = $params['refund_no'];

        $refund = $this->findByRefundNo($site_id, $refund_no);

        if($refund->isEmpty()) throw new PayException('REFUND_NOT_EXIST');
        if(!in_array($refund['status'], [RefundDict::WAIT, RefundDict::DEALING]))  throw new PayException();//只有待退款和退款中的退款单据可以

        $status = $params['status'];//第三方支付的状态,根据状态进行下一步业务
        // 启动事务
        Db::startTrans();
        try {
            switch($status){
                case RefundDict::SUCCESS://退款成功
                    $this->refundSuccess($site_id, [
                        'out_trade_no' => $out_trade_no,
                        'refund_no' => $refund_no,
                    ]);
                    break;
                case RefundDict::DEALING://退款处理中
                    //检测一下当前退款订单完成情况
                    $this->check($site_id, [
                        'out_trade_no' => $out_trade_no,
                        'refund_no' => $refund_no,
                    ]);
                    break;
                case RefundDict::FAIL://退款失败
                    $this->refundFail($site_id, [
                        'out_trade_no' => $out_trade_no,
                        'refund_no' => $refund_no,
                        'fail_reason' => $params['fail_reason'] ?? ''
                    ]);
                    break;
            }
            // 提交事务
            Db::commit();
            return true;
        } catch (\Throwable $e) {
            // 回滚事务
            Db::rollback();
            throw new PayException($e->getMessage());
        }
    }

    /**
     * 主动校验退款
     * @param $site_id
     * @param $data
     * @return true
     */
    public function check($site_id, $data){
        $out_trade_no = $data['out_trade_no'];
        $refund_no = $data['refund_no'];
        $refund = $this->findByRefundNo($site_id, $refund_no);
        if($refund->isEmpty()) throw new PayException('REFUND_NOT_EXIST');
        if(!in_array($refund['status'], [RefundDict::WAIT, RefundDict::DEALING]))  throw new PayException();//只有待退款和退款中的退款单据可以
        //查询第三方退款单据
        $refund_info = $this->pay_event->init($site_id, $refund->channel, $refund->type)->getRefund($out_trade_no, $refund_no);
        //这儿的refund_info 已经统一整理成公共的数据格式
        $status = $refund_info['status'];
        switch($status){
            case RefundDict::SUCCESS://退款成功
                $this->refundSuccess($site_id, [
                    'out_trade_no' => $out_trade_no,
                    'refund_no' => $refund_no,
                ]);
                break;
            case RefundDict::DEALING://退款处理中
                $this->refundDealing($site_id, [
                    'out_trade_no' => $out_trade_no,
                    'refund_no' => $refund_no,
                ]);
                break;
            case RefundDict::FAIL://退款失败
                $this->refundFail($site_id, [
                    'out_trade_no' => $out_trade_no,
                    'refund_no' => $refund_no,
                    'fail_reason' => $refund_info['fail_reason']
                ]);
                break;
        }
        return true;
    }

    /**
     * 退款完成
     * @param int $site_id
     * @param array $data
     * @return void
     */
    public function refundSuccess(int $site_id, array $data){

        $out_trade_no = $data['out_trade_no'];
        $refund_no = $data['refund_no'];
        $this->model->where([
            ['site_id', '=', $site_id],
            ['refund_no', '=', $refund_no]
        ])->update([
            'status' => RefundDict::SUCCESS
        ]);
        $pay = (new CorePayService())->getInfoByOutTradeNo($out_trade_no);
        $result = event('RefundSuccess', ['refund_no' => $refund_no, 'trade_type' => $pay->trade_type, 'site_id' => $site_id]);
        if(!check_event_result($result)){
            return false;
        }
        return true;
    }

    /**
     * 退款失败
     * @param int $site_id
     * @param array $data
     * @return void
     */
    public function refundFail(int $site_id, array $data){
        $refund_no = $data['refund_no'];
        $this->model->where([
            ['site_id', '=', $site_id],
            ['refund_no', '=', $refund_no]
        ])->update([
            'status' => RefundDict::SUCCESS,
            'fail_reason' => $data['fail_reason']
        ]);
        return true;
    }

    /**
     * 退款处理中
     * @param int $site_id
     * @param array $data
     * @return void
     */
    public function refundDealing(int $site_id, array $data){
        $out_trade_no = $data['out_trade_no'];
        $refund_no = $data['refund_no'];
        $this->model->where([
            ['site_id', '=', $site_id],
            ['refund_no', '=', $refund_no]
        ])->update([
            'status' => RefundDict::DEALING
        ]);
        return true;
    }

}