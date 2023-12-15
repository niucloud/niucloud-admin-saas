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
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

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
     * @param string $type
     * @param string $trade_type
     * @param int $trade_id
     * @param string $return_url
     * @param string $quit_url
     * @param string $buyer_id
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function pay(string $type, string $trade_type, int $trade_id, string $return_url = '', string $quit_url = '', string $buyer_id = '', string $voucher = ''){

        $member = (new CoreMemberService())->getInfoByMemberId($this->site_id, $this->member_id);
        switch ($this->channel) {
            case ChannelDict::WECHAT://公众号
                $openid = $member['wx_openid'] ?? '';
                break;
            case ChannelDict::WEAPP://微信小程序
                $openid = $member['weapp_openid'] ?? '';
                break;
        }

        return $this->core_pay_service->pay($this->site_id, $trade_type, $trade_id, $type, $this->channel, $openid ?? '', $return_url, $quit_url, $buyer_id, $voucher);
    }

    /**
     * 关闭支付
     * @param string $type
     * @param string $out_trade_no
     * @return null
     */
    public function close(string $type, string $out_trade_no){
        return $this->core_pay_service->close($this->site_id, $type);
    }

    /**
     * 支付异步通知
     * @param string $channel
     * @param string $type
     * @param string $action
     * @return void|null
     */
    public function notify(string $channel, string $type, string $action){
        return $this->core_pay_service->notify($this->site_id, $channel, $type, $action);
    }

    /**
     * 通过交易流水号查询支付信息以及支付方式
     * @param $out_trade_no
     * @return array
     */
    public function getInfoByOutTradeNo($out_trade_no){
        return $this->core_pay_service->getInfoByOutTradeNo($this->site_id, $out_trade_no, $this->channel);
    }

    public function getInfoByTrade(string $trade_type, int $trade_id){
        return $this->core_pay_service->getInfoByTrade($this->site_id, $trade_type, $trade_id, $this->channel);
    }

    /**
     * 获取支付方法
     * @param string $trade_type
     * @return array|array[]
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getPayTypeByTrade(string $trade_type){
        return $this->core_pay_service->getPayTypeByTrade($this->site_id, $trade_type, $this->channel);
    }
}