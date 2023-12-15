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

namespace app\service\core\paytype;

use app\dict\pay\PayDict;
use app\dict\pay\RefundDict;
use app\model\pay\Refund;
use app\service\core\pay\CorePayService;
use app\service\core\pay\CoreRefundService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use think\facade\Db;
use think\Model;

/**
 * 线下支付服务层
 * Class CorePayEventService
 * @package app\service\core\pay
 */
class CoreOfflineService extends BaseCoreService
{
    /**
     * 支付
     * @param $params
     * @return void
     */
    public function pay($params){
        $out_trade_no = $params['out_trade_no'];//交易流水号
        $site_id = $params['site_id'];
        $voucher = $params['voucher'] ?? '';

        if (empty($voucher)) throw new CommonException('VOUCHER_NOT_EMPTY');

        $pay = (new CorePayService())->findPayInfoByOutTradeNo($site_id, $out_trade_no);
        if ($pay->isEmpty()) throw new CommonException('ALIPAY_TRANSACTION_NO_NOT_EXIST');

        $pay->voucher = $voucher;
        $pay->save();

        return [
            'status' => PayDict::STATUS_ING,
            'out_trade_no' => $out_trade_no,
        ];
    }

    /**
     * 退款
     * @param array $params
     * @return void
     */
    public function refund(array $params){
        $refund_no = $params['refund_no'];//交易流水号
        $site_id = $params['site_id'];
        $voucher = $params['voucher'] ?? '';

        if (empty($voucher)) throw new CommonException('VOUCHER_NOT_EMPTY');

        $pay = (new CoreRefundService())->findByRefundNo($site_id, $refund_no);
        if ($pay->isEmpty()) throw new CommonException('ALIPAY_TRANSACTION_NO_NOT_EXIST');

        $pay->voucher = $voucher;
        $pay->save();

        return [
            'status' => RefundDict::SUCCESS,
            'refund_no' => $refund_no
        ];
    }

    public function close(string $out_trade_no) {
        return true;
    }

    /**
     * 获取退款信息
     * @param string|null $out_trade_no
     * @param string|null $refund_no
     * @return Refund|array|mixed|Model
     */
    public function getRefund(?string $out_trade_no, ?string $refund_no = '') {
        return (new Refund())->where([
            ['refund_no', '=', $refund_no],
        ])->findOrEmpty();
    }

    /**
     * 通过审核
     * @param int $site_id
     * @param string $out_trade_no
     * @return void
     */
    public function pass(int $site_id, string $out_trade_no) {
        $pay = (new CorePayService())->findPayInfoByOutTradeNo($site_id, $out_trade_no);
        if ($pay->isEmpty()) throw new CommonException('ALIPAY_TRANSACTION_NO_NOT_EXIST');
        if ($pay->status != PayDict::STATUS_AUDIT) throw new CommonException('ONLY_PAYING_CAN_AUDIT');
        if ($pay->type != PayDict::OFFLINEPAY) throw new CommonException('ONLY_OFFLINEPAY_CAN_AUDIT');

        return (new CorePayService())->paySuccess($site_id, [
            'status' => PayDict::STATUS_FINISH,
            'type' => $pay->type,
            'out_trade_no' => $out_trade_no,
            'voucher' => $pay->voucher
        ]);
    }

    /**
     * 未通过审核
     * @param int $site_id
     * @param string $out_trade_no
     * @param string $reason
     * @return void
     */
    public function refuse(int $site_id, string $out_trade_no, string $reason = '') {
        $pay = (new CorePayService())->findPayInfoByOutTradeNo($site_id, $out_trade_no);
        if ($pay->isEmpty()) throw new CommonException('ALIPAY_TRANSACTION_NO_NOT_EXIST');
        if ($pay->status != PayDict::STATUS_AUDIT) throw new CommonException('ONLY_PAYING_CAN_AUDIT');
        if ($pay->type != PayDict::OFFLINEPAY) throw new CommonException('ONLY_OFFLINEPAY_CAN_AUDIT');

        return (new CorePayService())->payClose($site_id, [
            'out_trade_no' => $out_trade_no,
            'reason' => $reason
        ]);
    }
}
