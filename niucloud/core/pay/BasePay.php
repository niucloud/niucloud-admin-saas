<?php

namespace core\pay;

use core\exception\PayException;
use core\loader\Storage;
use Psr\Http\Message\MessageInterface;
use Yansongda\Supports\Collection;

/**
 * 文件管理驱动类
 * Class BasePay
 */
abstract class BasePay extends Storage
{
    protected $config;//配置

    /**
     * 初始化
     * @param array $config
     * @return void
     */
    protected function initialize(array $config = [])
    {

    }

    /**
     * 网页支付
     * @param array $params
     * @return mixed
     */
    abstract protected function web(array $params);

    /**
     * 手机网站支付
     * @param array $params
     * @return mixed
     */
    abstract protected function wap(array $params);

    /**
     * app支付
     * @param array $params
     * @return mixed
     */
    abstract protected function app(array $params);

    /**
     * 小程序支付
     * @param array $params
     * @return mixed
     */
    abstract protected function mini(array $params);

    /**
     * 付款码支付
     * @param array $params
     * @return mixed
     */
    abstract protected function pos(array $params);

    /**
     * 扫码支付
     * @param array $params
     * @return mixed
     */
    abstract protected function scan(array $params);

    /**
     * 转账
     * @param array $params
     * @return mixed
     */
    abstract protected function transfer(array $params);

    /**
     * 公众号支付
     * @param array $params
     * @return mixed
     */
    abstract protected function mp(array $params);

    /**
     * 支付关闭
     * @param string $out_trade_no
     * @return mixed
     */
    abstract protected function close(string $out_trade_no);

    /**
     * 退款
     * @param array $params
     * @return mixed
     */
    abstract protected function refund(array $params);

    /**
     * 支付通知
     * @param string $action
     * @param callable $callback
     * @return mixed
     */
    abstract protected function notify(string $action, callable $callback);

    /**
     * 查询支付订单
     * @param array $params
     * @return mixed
     */
    abstract protected function getOrder(array $params);

    /**
     * 查询退款订单
     * @param string $out_trade_no
     * @param string|null $refund_no
     * @return mixed
     */
    abstract protected function getRefund(string $out_trade_no, ?string $refund_no);

    /**
     * 查询转账订单
     * @param string $transfer_no
     * @return mixed
     */
    abstract protected function getTransfer(string $transfer_no);

    /**
     * 初始化
     * @param array $config
     * @param string $type
     * @return mixed
     */
    protected function payConfig(array $config, string $type)
    {
        return array_merge(
            [
                'logger' => [
                    'enable' => true,
                    'file' => root_path('runtime') . 'paylog' . DIRECTORY_SEPARATOR . date('Ym') . DIRECTORY_SEPARATOR . date('d') . '.log',
                    'level' => env('app_debug') ? 'debug' : 'info', // 建议生产环境等级调整为 info，开发环境为 debug
                    'type' => 'single', // optional, 可选 daily.
                    'max_file' => 30, // optional, 当 type 为 daily 时有效，默认 30 天
                ],
                'http' => [ // optional
                    'timeout' => 5.0,
                ]
            ],
            [
                $type => [
                    'default' => $config
                ]
            ]


        );
    }

    public function returnFormat($param)
    {
        if ($param instanceof MessageInterface) {
            $return_value =  $param->getBody()->getContents();
        } else if ($param instanceof Collection) {
            $return_value = $param->all();
        } else {
            $return_value = $param;
        }
        if(isset($return_value['code'])){
            throw new PayException($return_value['message']);
        }
        return $return_value;
    }

    /**
     * 解析退款返回数据并解析
     * @param $our_trade_no
     * @param $refund_no
     * @param $status
     * @param int $success_time
     * @param string $reason
     * @return array
     */
    public function getRefundData($our_trade_no, $refund_no, $status, $success_time = 0, $reason = '')
    {
        return [
            'our_trade_no' => $our_trade_no,
            'refund_no' => $refund_no,
            'status' => $status,
            'success_time' => $success_time,
            'reason' => $reason
        ];
    }

    /**
     * 获取转账数据并解析
     * @param $transfer_no
     * @param $status
     * @param $reason
     * @return void
     */
    public function getTransferData($transfer_no, $status, $reason)
    {

    }


}
