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

use app\dict\common\ChannelDict;
use app\service\core\member\CoreMemberService;
use app\service\core\pay\CorePayService;
use core\base\BaseApiService;
use Yansongda\Supports\Collection;

/**
 * 支付业务
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
            case ChannelDict::WECHAT://公众号
                $openid = $member['wx_openid'] ?? '';

                break;
            case ChannelDict::WEAPP://微信小程序
                $openid = $member['weapp_openid'] ?? '';
                break;
        }

        return $this->core_pay_service->pay($this->site_id, $out_trade_no, $type, $this->channel, $openid ?? '', $return_url, $quit_url, $buyer_id);
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
     * 支付异步通知
     * @param $site_id
     * @param $type
     * @return void
     */
    public function notify(string $channel, string $type, string $action){
        return $this->core_pay_service->notify($this->site_id, $channel, $type, $action);
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