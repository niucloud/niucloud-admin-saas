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

use app\dict\common\ChannelDict;
use app\dict\pay\PayDict;
use app\dict\pay\TransferDict;
use core\base\BaseCoreService;
use core\exception\PayException;
use core\pay\PayLoader;
use Exception;
use Psr\Http\Message\ResponseInterface;
use think\Response;
use Yansongda\Pay\Exception\ContainerException;
use Yansongda\Pay\Exception\InvalidParamsException;
use Yansongda\Pay\Exception\ServiceNotFoundException;
use Yansongda\Supports\Collection;

/**
 * 支付服务层
 * Class CorePayEventService
 * @package app\service\core\pay
 */
class CorePayEventService extends BaseCoreService
{

    private $site_id;//站点id
    private $config;//支付配置
    private $type;//支付类型
    private $channel;//支付渠道  (特殊点,转账也算是一种)

    public function __construct()
    {
        parent::__construct();
    }


    /**
     * 支付引擎外置触点初始化
     * @param int $site_id
     * @param string $channel
     * @param string $type
     * @return $this
     */
    public function init(int $site_id, string $channel = '', string $type = '')
    {
        $this->site_id = $site_id;
        $this->channel = $channel;
        $this->type = $type;
        $this->config = (new CorePayChannelService())->getConfigByChannelAndType($this->site_id, $this->channel, $this->type);
        return $this;
    }

    /**
     * 获取实例化应用
     * @param string $action
     * @return PayLoader
     * @throws Exception
     */
    public function app(string $action = 'query')
    {
        $notify_url = (string)url("/api/pay/notify/$this->site_id/$this->channel/$this->type/$action", [], '', true);//异步回调通知地址
        $this->config['notify_url'] = $notify_url;
        $this->config['site_id'] = $this->site_id;
        return new PayLoader($this->type, $this->config);
    }


    /**
     * 去支付
     * @param string $out_trade_no
     * @param float $money
     * @param string $boby
     * @param string $refund_url
     * @param string $quit_url
     * @param string $buyer_id
     * @param string $openid
     * @return mixed
     * @throws Exception
     */
    public function pay(string $out_trade_no, float $money, string $boby, string $refund_url = '', string $quit_url = '', string $buyer_id = '', string $openid = '', string $voucher = '')
    {
        $pay_fun = '';

        $params = array(
            'out_trade_no' => $out_trade_no,
            'money' => $money,
            'boby' => $boby,
            'channel' => $this->channel,
            'refund_url' => $refund_url,
            'quit_url' => $quit_url,
            'buyer_id' => $buyer_id,
            'openid' => $openid,
            'site_id' => $this->site_id,
            'voucher' => $voucher
        );
        switch ($this->type) {
            case PayDict::WECHATPAY:
                $params['money'] *= 100;

                switch ($this->channel) {
                    case ChannelDict::H5://h5
                        $pay_fun = 'wap';
                        break;
                    case ChannelDict::WECHAT://公众号
                        $pay_fun = 'mp';

                        break;
                    case ChannelDict::WEAPP://微信小程序
                        $pay_fun = 'mini';
                        break;

                    case ChannelDict::PC://pc
                        $pay_fun = 'scan';//扫码支付
                        break;
                    case ChannelDict::APP://app
                        $pay_fun = 'app';
                        break;
                }
                if (empty($pay_fun)) throw new PayException('PAYMENT_METHOD_NOT_SCENE');
                break;
            case PayDict::ALIPAY:
                switch ($this->channel) {
                    case ChannelDict::H5://h5
                        $pay_fun = 'wap';
                        break;
                    case ChannelDict::PC://pc
                        $pay_fun = 'web';
                        break;
                    case ChannelDict::APP://app
                        $pay_fun = 'app';
                        break;
                    case ChannelDict::WECHAT://wap
                        $pay_fun = 'wap';
                        break;
                }
                if (empty($pay_fun)) throw new PayException('PAYMENT_METHOD_NOT_SCENE');
                break;
        }

        if (empty($pay_fun)) $pay_fun = 'pay';

        return $this->app('pay')->$pay_fun($params);
    }


    /**
     * 转账
     * @param float $money
     * @param string $transfer_no
     * @param string $to_no
     * @param string $to_name
     * @param string $remark
     * @param array $transfer_list
     * @param string $to_type 支付宝用
     * @param string $product_code 支付宝用
     * @param string $scene
     * @return array
     * @throws Exception
     */
    public function transfer(float $money, string $transfer_no, string $to_no, string $to_name, string $remark, array $transfer_list = [], string $to_type = '', string $product_code = '', string $scene = '')
    {
        $transfer_type = TransferDict::getPayTypeByTransfer($this->type);
        switch ($transfer_type) {
            case PayDict::WECHATPAY:
                $money *= 100;
                break;
            case PayDict::ALIPAY:
                break;
        }
        return $this->app('transfer')->transfer([
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
     * @param string $out_trade_no
     * @return null
     * @throws Exception
     */
    public function close(string $out_trade_no)
    {
        return $this->app('close')->close($out_trade_no);
    }

    /**
     * 退款
     * @param string $out_trade_no
     * @param float $money
     * @param float $total
     * @param string $refund_no
     * @param string $voucher
     * @return array
     * @throws ContainerException
     * @throws InvalidParamsException
     * @throws ServiceNotFoundException
     */
    public function refund(string $out_trade_no, float $money, float $total, string $refund_no, $voucher = '')
    {
        if ($this->type == PayDict::WECHATPAY) {
            $money *= 100;
            $total *= 100;
        }
        return $this->app('refund')->refund([
            'site_id' => $this->site_id,
            'out_trade_no' => $out_trade_no,
            'money' => $money,
            'total' => $total,
            'refund_no' => $refund_no,
            'voucher' => $voucher
        ]);
    }

    /**
     * 支付异步通知
     * @param string $action
     * @param callable $callback
     * @return ResponseInterface|Response
     * @throws Exception
     */
    public function notify(string $action, callable $callback)
    {
        return $this->app()->notify($action, $callback);
    }

    /**
     * 查询普通支付订单
     * @param string $out_trade_no
     * @return null
     * @throws ContainerException
     * @throws InvalidParamsException
     * @throws ServiceNotFoundException
     */
    public function getOrder(string $out_trade_no)
    {
        return $this->app()->getOrder(['out_trade_no' => $out_trade_no]);
    }

    /**
     * 查询退款订单
     * @param string $out_trade_no
     * @param string $refund_no
     * @return null
     * @throws Exception
     */
    public function getRefund(string $out_trade_no, string $refund_no)
    {
        return $this->app()->getRefund($out_trade_no, $refund_no);
    }

    /**
     * 查询转账订单
     * @param string $transfer_no
     * @return null
     * @throws Exception
     */
    public function getTransfer(string $transfer_no)
    {
        return $this->app()->getTransfer($transfer_no);
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