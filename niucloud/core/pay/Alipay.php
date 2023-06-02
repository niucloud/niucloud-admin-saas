<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2023-02-17
 * Time: 15:58
 */

namespace core\pay;

use app\dict\pay\OnlinePayDict;
use app\dict\pay\RefundDict;
use app\dict\pay\TransferDict;
use core\exception\PayException;
use Psr\Http\Message\MessageInterface;
use Psr\Http\Message\ResponseInterface;
use Yansongda\Pay\Exception\ContainerException;
use Yansongda\Pay\Exception\InvalidParamsException;
use Yansongda\Pay\Exception\ServiceNotFoundException;
use Yansongda\Pay\Pay;
use Yansongda\Supports\Collection;


/**
 * 文件管理驱动类
 * Class FileDriver
 * @package core\file
 */
class Alipay extends BasePay
{

    /**
     * @param array $config
     * @return mixed|void
     */
    protected function initialize(array $config = [])
    {
        parent::initialize($config);
        $config['app_public_cert_path'] = url_to_path($config['app_public_cert_path'] ?? '');
        $config['alipay_public_cert_path'] = url_to_path($config['alipay_public_cert_path'] ?? '');
        $config['alipay_root_cert_path'] = url_to_path($config['alipay_root_cert_path'] ?? '');
        $this->config = $this->payConfig($config, 'alipay');
        Pay::config($this->config);
    }

    public function mp(array $params){

    }
    /**
     * 网页支付
     * @param array $params
     * @return ResponseInterface
     */
    public function web(array $params)
    {
        return $this->returnUrl(Pay::alipay()->web([
            'out_trade_no' => $params['out_trade_no'],
            'total_amount' => $params['money'],
            'subject' => $params['boby'],
        ]));
    }

    /**
     * 手机网页支付
     * @param array $params
     * @return ResponseInterface
     */
    public function wap(array $params)
    {
        return $this->returnUrl(Pay::alipay()->wap([
            'out_trade_no' => $params['out_trade_no'],
            'total_amount' => $params['money'],
            'subject' => $params['boby'],
            'quit_url' => $params['quit_url'] ?? '',//用户付款中途退出返回商户网站的地址, 一般是商品详情页或购物车页
            '_method' => 'get',
        ]));
    }

    /**
     * app支付
     * @param $params
     * @return mixed|ResponseInterface
     */
    public function app(array $params)
    {
        return $this->returnUrl(Pay::alipay()->app([
            'out_trade_no' => $params['out_trade_no'],
            'total_amount' => $params['money'],
            'subject' => $params['boby'],//用户付款中途退出返回商户网站的地址, 一般是商品详情页或购物车页
        ]));
    }

    /**
     * 小程序支付
     * @param $params
     * @return mixed|ResponseInterface
     */
    public function mini(array $params)
    {
        return Pay::alipay()->mini([
            'out_trade_no' => $params['out_trade_no'],
            'total_amount' => $params['money'],
            'subject' => $params['boby'],
            'buyer_id' => $params['buyer_id'],//买家支付宝用户ID  注：交易的买家与卖家不能相同。
        ]);
    }

    /**
     * 付款码支付
     * @param $params
     * @return mixed|Collection
     */
    public function pos(array $params)
    {
        return Pay::alipay()->pos([
            'out_trade_no' => $params['out_trade_no'],
            'auth_code' => $params['auth_code'],//付授权码。 当面付场景传买家的付款码（25~30开头的长度为16~24位的数字，实际字符串长度以开发者获取的付款码长度为准）或者刷脸标识串（fp开头的35位字符串）。
            'total_amount' => $params['money'],
            'subject' => $params['boby'],
        ]);
    }

    /**
     * 扫码支付
     * @param $params
     * @return mixed|Collection
     */
    public function scan(array $params)
    {
        return Pay::alipay()->scan([
            'out_trade_no' => $params['out_trade_no'],
            'total_amount' => $params['money'],
            'subject' => $params['boby'],
        ]);
    }

    /**
     * 转账
     * @param $params
     * @return mixed|Collection
     */
    public function transfer(array $params)
    {

        $result =  $this->returnFormat(Pay::alipay()->transfer([
            'out_biz_no' => $params['transfer_no'],
            'trans_amount' => $params['money'],
            'product_code' => $params['product_code'] ?: 'TRANS_ACCOUNT_NO_PWD',//业务产品码，单笔无密转账到支付宝账户固定为 : TRANS_ACCOUNT_NO_PWD； 收发现金红包固定为 : STD_RED_PACKET；
            'biz_scene' => $params['scene'] ?: 'DIRECT_TRANSFER',//描述特定的业务场景，可传的参数如下：DIRECT_TRANSFER：单笔无密转账到支付宝，B2C现金红包;PERSONAL_COLLECTION：C2C现金红包-领红包
            'payee_info' => [//收款方信息
                'identity' => $params['to_no'],//参与方的唯一标识
                'identity_type' => $params['to_type'] ?: 'ALIPAY_LOGON_ID',//参与方的标识类型，目前支持如下类型：1、ALIPAY_USER_ID 支付宝的会员ID2、ALIPAY_LOGON_ID：支付宝登录号，支持邮箱和手机号格式3、ALIPAY_OPEN_ID：支付宝openid
                'name' => $params['to_name'],//参与方真实姓名，如果非空，将校验收款支付宝账号姓名一致性。当identity_type=ALIPAY_LOGON_ID时，本字段必填。
            ],
        ]));
        if(!empty($result['msg']) && $result['msg'] != 'Success'){
            throw new PayException($result['sub_msg']);
        }else{
            $status = $result['status'];
            $status_array = array(
                'SUCCESS' => TransferDict::SUCCESS,
                'WAIT_PAY' => TransferDict::WAIT,
                'CLOSED' => TransferDict::FAIL,
                'FAIL' => TransferDict::FAIL
            );
            $res = array(
                'status' => $status_array[$status],
            );
            if($status == 'FAIL'){
                $res['fail_reason'] = $result['fail_reason'];
            }
        }
        return $res;
    }

    /**
     * 支付关闭
     * @param $out_trade_no
     * @return void
     */
    public function close(string $out_trade_no){
        $result = $this->returnFormat(Pay::alipay()->close([
            'out_trade_no' => $out_trade_no,
        ]));
        //todo  支付宝关闭异步回调
        if(!empty($result['msg']) && $result['msg'] == 'Success'){
            return true;
        }else{
            return false;
        }
    }

    /**
     * 退款
     * @param $out_trade_no
     * @param $money
     * @return array|MessageInterface|Collection|null
     * @throws ContainerException
     * @throws InvalidParamsException
     * @throws ServiceNotFoundException
     */
    public function refund(array $params){
        $out_trade_no = $params['out_trade_no'];
        $money = $params['money'];
//        $total = $params['total'];
        $refund_no = $params['refund_no'];
        $result = $this->returnFormat(Pay::alipay()->refund([
            'out_trade_no' => $out_trade_no,
            'refund_amount' => $money,
            'out_request_no' => $refund_no
        ]));
        if(!empty($result['msg']) && $result['msg'] == 'Success'){
            $fund_change = $result['fund_change'];//退款是否成功可以根据同步响应的 fund_change 参数来判断，fund_change 表示本次退款是否发生了资金变化，返回 Y 表示退款成功，返回 N 则表示本次退款未发生资金变动 。
            if($fund_change == 'Y'){
                $status = RefundDict::SUCCESS;
            }else{
                $status = RefundDict::DEALING;
            }
            return [
                'status' => $status,
                'refund_no' => $refund_no,
                'out_trade_no' => $out_trade_no
            ];
        }else{
            //todo 这儿可以抛出错误
            return false;
        }

        return $result;
    }


    /**
     * 支部异步回调
     * @param $out_trade_no
     * @return void
     */
    public function notify(string $action, Callable $callback){
        try{
            $result = Pay::alipay()->callback();
            //通过返回的值
            if(!empty($result)){//成功
                if($action == 'pay'){
                    //todo  这儿需要具体设计
                    $temp_data = array(
                        'mchid' => $result['seller_id'],
                        'trade_no' => $result['trade_no'],
                        'result' => $result
                    );
                    $callback_result = $callback($result['out_trade_no'], $temp_data);
                    if(is_bool($callback_result) && $callback_result){
                        return Pay::alipay()->success();
                    }
                }

            }
            return $this->fail();
        } catch (\Throwable $e) {
            return $this->fail();
        }


    }

    /**
     * 查询普通支付订单
     * @param $out_trade_no
     * @return void
     */
    public function getOrder(array $params = []){
        $out_trade_no = $params['out_trade_no'];
        $order = [
            'out_trade_no' => $out_trade_no,
        ];
        $result = $this->returnFormat(Pay::alipay()->find($order));
        if(!empty($result['msg']) && $result['msg'] == 'Success'){
            return [
                'status' => OnlinePayDict::getAliPayStatus($result['trade_status'])
            ];
        }else{
            if(!empty($result['sub_code']) && $result['sub_code'] == 'ACQ.ACQ.SYSTEM_ERROR'){
                throw new PayException($result['msg']);
            }else{
                return [];
            }
        }
    }

    /**
     * 查询退款单据
     * @param $out_trade_no
     * @param $refund_no
     * @return void
     */
    public function getRefund(string $out_trade_no, ?string $refund_no){
        $order = [
            'out_trade_no' => $out_trade_no,
            'out_request_no' => $refund_no,
            '_type' => 'refund',
        ];

        $result = $this->returnFormat(Pay::alipay()->find($order));
        if(!empty($result['msg']) && $result['msg'] == 'Success'){
            $refund_status = $result['refund_status'] ?? '';
            if($refund_status == 'REFUND_SUCCESS'){
                $status = RefundDict::SUCCESS;
            }else{
                $status = RefundDict::DEALING;
            }
            return [
                'status' => $status,
                'refund_no' => $refund_no,
                'out_trade_no' => $out_trade_no
            ];
        }else{
            if(!empty($result['sub_code']) && $result['sub_code'] == 'ACQ.ACQ.SYSTEM_ERROR'){
                throw new PayException($result['msg']);
            }else{
                return [];
            }
        }
    }

    /**
     * 获取转账订单
     * @param $transfer_no
     * @return void
     */
    public function getTransfer(string $transfer_no){
        $order = [
            'out_biz_no' => $transfer_no,
            '_type' => 'transfer'
        ];
        $result = $this->returnFormat(Pay::alipay()->find($order));
        if(!empty($result['msg']) && $result['msg'] == 'Success'){
            $status = $result['SUCCESS'] ?? '';
            $status_array = array(
                'SUCCESS' => TransferDict::SUCCESS,
                'WAIT_PAY' => TransferDict::WAIT,
                'CLOSED' => TransferDict::FAIL,
                'FAIL' => TransferDict::FAIL
            );
            return [
                'status' => $status_array[$status],
                'transfer_no' => $transfer_no
            ];
        }else{
            if(!empty($result['sub_code']) && $result['sub_code'] == 'ACQ.ACQ.SYSTEM_ERROR'){
                throw new PayException($result['msg']);
            }else{
                return [];
            }
        }
    }

    public function fail(){
        return 'fail';
    }

    public function returnUrl($params){
        return ['url' => $params->getHeader('Location')[0]];
    }
}