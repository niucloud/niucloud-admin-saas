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

use app\enum\common\ChannelEnum;
use app\enum\pay\PayEnum;
use app\enum\pay\TransferEnum;
use app\service\core\BaseCoreService;
use extend\driver\pay\PayDriver;
use extend\exception\PayException;
use Yansongda\Supports\Collection;

/**
 * 支付服务层
 * Class CorePayEventService
 * @package app\service\core\pay
 */
class CorePayEventService extends BaseCoreService
{

    /**
     * 获取实例化应用
     * @param $site_id
     * @return PayDriver
     */
    public function app(int $site_id, string $type, string $action = '')
    {
        $notify_url = (string)url("/api/pay/notify/$type/$site_id/$action", [], '', true);//异步回调通知地址
        $config = (new CorePayConfigService)->getPayConfigByType($site_id, $type);
        $config['notify_url'] = $notify_url;
        return new PayDriver($config, $type);

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
    public function pay(int $site_id, string $type, string $out_trade_no, float $money, string $boby, string $channel, string $refund_url = '', string $quit_url = '', string $buyer_id = '', string $openid = '')
    {
        $pay_scene = '';

        $params = array(
            'out_trade_no' => $out_trade_no,
            'money' => $money,
            'boby' => $boby,
            'channel' => $channel,
            'refund_url' => $refund_url,
            'quit_url' => $quit_url,
            'buyer_id' => $buyer_id,
            'openid' => $openid
        );
        switch($type){
            case PayEnum::WECHATPAY:
                $params['money'] = $params['money'] * 100;

                switch ($channel) {
                    case ChannelEnum::H5://h5
                        $pay_scene = 'wap';
                        break;
                    case ChannelEnum::WECHAT://公众号
                        $pay_scene = 'mp';

                        break;
                    case ChannelEnum::WEAPP://微信小程序
                        $pay_scene = 'mini';
                        break;

                    case ChannelEnum::PC://pc
                        $pay_scene = 'scan';//扫码支付
                        break;
                    case ChannelEnum::APP://pc
                        $pay_scene = 'app';
                        break;
                }

                break;
            case PayEnum::ALIPAY:
                switch ($channel) {
                    case ChannelEnum::H5://h5
                        $pay_scene = 'wap';
                        break;
                    case ChannelEnum::PC://pc
                        $pay_scene = 'web';
                        break;
                    case ChannelEnum::APP://pc
                        $pay_scene = 'app';
                        break;
                }
        }
        if(empty($pay_scene)) throw new PayException(700006);
        return $this->app($site_id, $type, 'pay')->$pay_scene($params);
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
    public function transfer(int $site_id, string $type, float $money, string $transfer_no,string  $to_no, string $to_name, string $remark, array $transfer_list = [], string $to_type = '', string $product_code = '', string $scene = '')
    {
        $transfer_type = TransferEnum::getPayTypeByTransfer($type);
        switch($transfer_type){
            case PayEnum::WECHATPAY:
                $money = $money * 100;
                break;
            case PayEnum::ALIPAY:

        }
        return $this->app($site_id, $transfer_type)->transfer([
            'transfer_no' => $transfer_no,
            'money' => $money,
            'product_code' => $product_code,
            'scene' => $scene,
            'to_no' => $to_no,
            'to_type' => $to_type,
            'to_name' => $to_name,
            'remark' => $remark,
            'transfer_list' => $transfer_list
        ]);
    }

    /**
     * 关闭支付
     * @param int $site_id
     * @param string $type
     * @param string $out_trade_no
     * @return null
     */
    public function close(int $site_id, string $type, string $out_trade_no)
    {
        return $this->app($site_id, $type)->close($out_trade_no);
    }

    /**
     * 退款
     * @param $site_id
     * @param $out_trade_no
     * @param $money
     * @return void
     */
    public function refund(int $site_id, string $type, string $out_trade_no, float $money)
    {
        return $this->app($site_id, $type, 'refund')->refund($out_trade_no, $money);
    }

    /**
     * 支付异步通知
     * @param $site_id
     * @param $type
     * @return void
     */
    public function notify(int $site_id, string $type, Callable $callback)
    {
        return $this->app($site_id, $type)->notify($callback);
    }

    /**
     * 查询普通支付订单
     * @param $site_id
     * @param $type
     * @param $out_trade_no
     * @return null
     */
    public function getOrder(int $site_id, string $type, string $out_trade_no)
    {
        return $this->app($site_id, $type, __FUNCTION__)->getOrder($out_trade_no);
    }

    /**
     * 查询退款订单
     * @param $site_id
     * @param $type
     * @param $out_trade_no
     * @param $refund_no
     * @return null
     */
    public function getRefund(int $site_id, string $type, string $out_trade_no, string $refund_no)
    {
        return $this->app($site_id, $type)->getRefund($out_trade_no, $refund_no);
    }

    /**
     * 查询转账订单
     * @param $site_id
     * @param $type
     * @param $transfer_no
     * @return null
     */
    public function getTransfer(int $site_id, string $type, string $transfer_no)
    {
        return $this->app($site_id, $type)->getTransfer($transfer_no);
    }


    /**
     * 取消订单
     * 支付宝接口    权限极高  支付交易返回失败或支付系统超时，调用该接口撤销交易。如果此订单用户支付失败，支付宝系统会将此订单关闭；如果用户支付成功，支付宝系统会将此订单资金退还给用户。
     * 注意：只有发生支付系统超时或者支付结果未知时可调用撤销，其他正常支付的单如需实现相同功能请调用申请退款API。提交支付交易后调用【查询订单API】，没有明确的支付结果再调用【撤销订单API】。
     * @return void
     */
    public function cancel()
    {

    }


}