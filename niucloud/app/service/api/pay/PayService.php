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

namespace app\service\api\pay;

use app\enum\common\ChannelEnum;
use app\service\api\BaseApiService;
use app\service\core\member\CoreMemberService;
use app\service\core\pay\CorePayService;
use Yansongda\Supports\Collection;

/**
 * 支付业务
 * Class WechatConfigService
 * @package app\service\core\wechat
 */
class PayService extends BaseApiService
{

    public $core_pay_service;
    public function __construct()
    {
        parent::__construct();
        $this->core_pay_service = new CorePayService();
    }



    /**
     * 去支付
     * @param $site_id
     * @param $type
     * @param $out_trade_no
     * @param $money
     * @param $boby
     * @param $channel
     * @param $refund_url
     * @param $quit_url
     * @param $buyer_id
     * @return mixed
     */
    public function pay(string $type, string $out_trade_no, string $return_url = '', string $quit_url = '', string $buyer_id = ''){

        $member = (new CoreMemberService())->getInfoByMemberId($this->site_id, $this->member_id);
        switch ($this->channel) {
            case ChannelEnum::WECHAT://公众号
                $openid = $member['wx_openid'] ?? '';

                break;
            case ChannelEnum::WEAPP://微信小程序
                $openid = $member['weapp_openid'] ?? '';
                break;
        }

        return $this->core_pay_service->pay($this->site_id, $out_trade_no, $type, $this->channel, $openid ?? '', $return_url, $quit_url, $buyer_id);
    }


    /**
     * 转账
     * @param $site_id
     * @param $from_no
     * @param $product_code 支付宝用
     * @param $scene
     * @param $to_no
     * @param $to_type 支付宝用
     * @param $to_name
     * @return mixed|Collection
     */
    public function transfer(string $type, float $money, string $transfer_no, string $to_no, string $to_type, string $to_name, string $product_code, string $scene){
        return $this->core_pay_service->transfer($this->site_id, $type, $money, $transfer_no, $to_no, $to_type, $to_name, $product_code, $scene);
    }

    /**
     * 关闭支付
     * @param $site_id
     * @param $type
     * @param $out_trade_no
     * @return null
     */
    public function close(string $type, string $out_trade_no){
        return $this->core_pay_service->close($this->site_id, $type, $out_trade_no);
    }

    /**
     * 退款
     * @param $site_id
     * @param $out_trade_no
     * @param $money
     * @return void
     */
    public function refund(string $type, string $out_trade_no, float $money){
        return $this->core_pay_service->refund($this->site_id, $type, $out_trade_no, $money);
    }

    /**
     * 支付异步通知
     * @param $site_id
     * @param $type
     * @return void
     */
    public function notify(string $type, string $action){
        return $this->core_pay_service->notify($this->site_id, $type, $action);
    }

    /**
     * 查询普通支付订单
     * @param $site_id
     * @param $type
     * @param $out_trade_no
     * @return null
     */
    public function getOrder(string $type, string $out_trade_no){
        return $this->core_pay_service->notify($this->site_id, $type, $out_trade_no);
    }

    /**
     * 查询退款订单
     * @param $site_id
     * @param $type
     * @param $out_trade_no
     * @param $refund_no
     * @return null
     */
    public function getRefund(string $type, string $out_trade_no, string $refund_no){
        return $this->core_pay_service->getRefund($this->site_id, $type, $out_trade_no, $refund_no);

    }

    /**
     * 查询转账订单
     * @param $site_id
     * @param $type
     * @param $transfer_no
     * @return null
     */
    public function getTransfer(string $type, string $transfer_no){
        return $this->core_pay_service->getTransfergetTransfer($this->site_id, $type, $transfer_no);
    }


    /**
     * 通过交易流水号查询支付信息以及支付方式
     * @param $out_trade_no
     * @return mixed
     */
    public function getInfoByOutTradeNo($out_trade_no){
        return $this->core_pay_service->getInfoByOutTradeNo($this->site_id, $out_trade_no, $this->channel);
    }
}