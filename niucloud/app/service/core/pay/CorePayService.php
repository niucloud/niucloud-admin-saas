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

use app\dict\order\OrderTypeDict;
use app\dict\pay\OnlinePayDict;
use app\dict\pay\PayDict;
use app\job\pay\PayReturnTo;
use app\model\pay\Pay;
use core\base\BaseCoreService;
use core\exception\PayException;
use think\facade\Db;
use think\facade\Log;

/**
 * 支付服务层
 * Class CorePayService
 * @package app\service\core\pay
 */
class CorePayService extends BaseCoreService
{
    protected $pay_event;
    public function __construct()
    {
        parent::__construct();
        $this->model = new Pay();
        $this->pay_event = new CorePayEventService();
    }

    /**
     * 创建支付单据
     * @param $site_id
     * @param string $main
     * @param float $money
     * @param string $trade_type
     * @param string $body
     * @return string|null
     */
    public function create($site_id, string $main_type, int $main_id, float $money, string $trade_type, string $body){
        $out_trade_no = create_no('pay', $main_id);
        $data = array(
            'site_id' => $site_id,
            'money' => $money,
            'trade_type' => $trade_type,
            'body' => $body,
            'out_trade_no' => $out_trade_no,
            'main_id' => $main_id,
            'main_type' => $main_type
        );
        $this->model->create($data);
        return $out_trade_no;
    }

    /**
     * 通过交易流水号查询支付
     * @param int $site_id
     * @param string $out_trade_no
     * @return Pay|array|mixed|\think\Model
     */
    public function findPayInfoByOutTradeNo(int $site_id, string $out_trade_no){
        $where = array(
            ['site_id', '=', $site_id],
            ['out_trade_no', '=', $out_trade_no]
        );
        return $this->model->where($where)->append(['pay_type_list', 'type_name', 'status_name'])->findOrEmpty();
    }

    /**
     * 通过交易流水号查询支付信息以及支付方式()
     * @param int $site_id
     * @param string $out_trade_no
     * @return array
     */
    public function getInfoByOutTradeNo(int $site_id, string $out_trade_no, string $channel){
        $where = array(
            ['site_id', '=', $site_id],
            ['out_trade_no', '=', $out_trade_no]
        );
        $pay = $this->model->where($where)->append(['pay_type_list', 'type_name', 'status_name'])->findOrEmpty()->toArray();
        if(!empty($pay)){
            //todo  校验场景控制支付方式
            $pay['pay_type_list'] = array_values((new CorePayChannelService())->getAllowPayTypeByCahnnel($site_id, $channel, $pay['pay_type_list']));
        }
        return  $pay;
    }
    /**
     * 去支付
     * @param $site_id
     * @param $out_trade_no
     * @param $type
     * @param $channel
     * @param string $quit_url
     * @param string $buyer_id
     * @return mixed
     */
    public function pay($site_id, $out_trade_no, $type, $channel, string $openid, string $return_url = '', string $quit_url = '', string $buyer_id = ''){
        $pay = $this->findPayInfoByOutTradeNo($site_id, $out_trade_no);
        if($pay->isEmpty()) throw new PayException('ALIPAY_TRANSACTION_NO_NOT_EXIST');
        if($pay['status'] == PayDict::STATUS_ING)  throw new PayException('PAYMENT_LOCK');
        if($pay['status'] == PayDict::STATUS_ED)  throw new PayException('PAY_SUCCESS');
        if($pay['status'] == PayDict::STATUS_CALCLE)  throw new PayException('PAY_IS_REMOVE');
        $money = $pay['money'];
        $body = $pay['body'];
        $trade_type = $pay['trade_type'];
//        $allow_type = OrderTypeDict::getAllowPayType($trade_type);//当前支付允许使用的支付方式
//        if(!in_array($type, $allow_type)){
//            throw new PayException('PAYMENT_METHOD_NOT_SUPPORT');//业务不支持
//        }
        if(!in_array($type, array_column((new CorePayChannelService())->getAllowPayTypeByCahnnel($site_id, $channel, OrderTypeDict::getAllowPayType($trade_type)), 'key')))  throw new PayException('PAYMENT_METHOD_NOT_SCENE');//场景不支持
        $pay_result = $this->pay_event->init($site_id, $channel, $type)->pay($out_trade_no, $money, $body, $return_url, $quit_url, $buyer_id, $openid ?? '');
        //todo  特殊支付方式会直接返回支付状态,状态如果为已支付会直接支付
        if(!empty($pay_result['status']) && $pay_result['status'] == PayDict::STATUS_ED){
            $this->paySuccess($site_id, [
                'status' => PayDict::STATUS_ED,
                'type' => $type,
                'out_trade_no' => $out_trade_no
            ]);
            return true;
        }
        //将支付设置为支付中
        $pay->save(
            [
                'type' => $type,
                'status' => PayDict::STATUS_ING,
                'channel' => $channel
            ]
        );
        PayReturnTo::invoke(['site_id' => $site_id, 'out_trade_no' => $out_trade_no], secs:15);
        return $pay_result;
    }

    /**
     * 支付单据恢复到待支付
     * @param int $site_id
     * @param string $out_trade_no
     * @return void
     */
    public function returnTo(int $site_id, $pay_item){
        if(is_object($pay_item)){
            $pay = $pay_item;
        }else{
            $out_trade_no = $pay_item;
            $pay = $this->findPayInfoByOutTradeNo($site_id, $out_trade_no);
        }
        if($pay->isEmpty()) return true;
        if($pay['status'] != PayDict::STATUS_ING)  return true;
        if(empty($pay->type)) return true;
        //尝试取消或关闭第三方支付
        try{
            $close = $this->close($site_id, $out_trade_no);
        }catch(\Throwable $e){
            $close = false;
        }

        //todo  交易流水号在同渠道已经不能用了
//        if($close){
//            $data = array(
//                'status' => PayDict::STATUS_WAIT,
//                'type' => '',
//                'channel' => ''
//            );
//            $pay->save($data);
//        }

        return $close;
    }

    /**
     * 关闭支付
     * @param int $site_id
     * @param string $out_trade_no
     * @return true
     */
    public function close(int $site_id, string $out_trade_no){
        $pay = $this->findPayInfoByOutTradeNo($site_id, $out_trade_no);
        if($pay->isEmpty()) throw new PayException('ALIPAY_TRANSACTION_NO_NOT_EXIST');
        if($pay['status'] != PayDict::STATUS_ING)  throw new PayException('TREAT_PAYMENT_IS_OPEN');
        if(empty($pay->type)) throw new PayException('TREAT_PAYMENT_IS_OPEN');
        //尝试取消或关闭第三方支付
        $close = $this->pay_event->init($site_id, $pay->channel, $pay->type)->close($out_trade_no);
        if(!$close){//有问题查询第三方订单详情
            $order = $this->pay_event->init($site_id, $pay->channel, $pay->type)->getOrder($out_trade_no);
            if(!empty($order)){
                if($order['status'] == OnlinePayDict::SUCCESS){//如果已支付,就将支付调整为已支付
                    $this->paySuccess($site_id, [
                        'out_trade_no' => $out_trade_no,
                        'type' => $pay->type
                    ]);
                    return false;
                }
            }
        }
        //支付关闭
        $this->payClose($site_id,[
            'out_trade_no' => $out_trade_no
        ]);
        return true;
    }



    /**
     * 支付完成
     * @param $out_trade_no
     * @param $type
     * @param $trade_no
     * @return void
     */
    public function payNotify(int $site_id, string $out_trade_no, string $type, array $params = []){
        $pay = $this->findPayInfoByOutTradeNo($site_id, $out_trade_no);

        if($pay->isEmpty()) throw new PayException('ALIPAY_TRANSACTION_NO_NOT_EXIST');
        if($pay['status'] == PayDict::STATUS_ED)  throw new PayException('PAY_SUCCESS');
        if($pay['status'] == PayDict::STATUS_CALCLE)  throw new PayException('PAY_IS_REMOVE');
        $status = $params['status'];
        switch($status){
            case OnlinePayDict::SUCCESS://支付成功
                $this->paySuccess($site_id,[
                    'out_trade_no' => $out_trade_no,
                    'type' => $type
                ]);
                break;
            case OnlinePayDict::CLOSED://支付关闭
                $this->payClose($site_id,[
                    'out_trade_no' => $out_trade_no,
                    'type' => $type
                ]);
                break;
            case OnlinePayDict::NOTPAY://未支付
                //todo  主动去校验支付状态
                $this->check($site_id,[
                    'out_trade_no' => $out_trade_no,
                    'type' => $type
                ]);
                break;

        }
        return true;
    }


    /**
     * 异步通知
     * @param int $site_id
     * @param string $type
     * @return null
     */
    public function notify(int $site_id, string $channel, string $type, string $action){
        $callback = function($out_trade_no, $params) use($site_id,$type, $action){
            try {
                switch($action){
                    case 'pay'://支付结果通知
                        return $this->payNotify($site_id, $out_trade_no, $type, $params);
                        break;
                    case 'refund':
                        return (new CoreRefundService())->refundNotify($site_id, $out_trade_no, $type, $params);
                        break;
                }

            } catch (PayException $e) {
                return false;
            }
        };
        return $this->pay_event->init($site_id, $channel, $type)->notify($action, $callback);
    }

    /**
     * 重置支付,更换新的交易流水号
     * @param int $site_id
     * @param string $out_trade_no
     * @param float $money
     * @return string|null
     */
    public function reset(int $site_id, string $out_trade_no, float $money = null){
        $pay = $this->findPayInfoByOutTradeNo($site_id, $out_trade_no);
        if($pay->isEmpty()) throw new PayException('ALIPAY_TRANSACTION_NO_NOT_EXIST');
        if(!in_array($pay['status'], [
            PayDict::STATUS_WAIT,
            PayDict::STATUS_ING
        ]))  throw new PayException('IS_PAY_REMOVE_NOT_RESETTING');//只有待支付可以重置支付
        if($pay['status'] == PayDict::STATUS_ING){
            if(!$this->close($site_id, $pay)){
                throw new PayException('DOCUMENT_IS_PAY_REMOVE');
            }
        }
        if(!$money){
            $money = $pay->money;
        }
        $new_out_trade_no = $this->create($site_id, $pay->main_type, $pay->main_id, $money, $pay->trade_type, $pay->body);
        //todo  需要考虑是业务调用重置支付,还是支付重置反馈业务
        return $new_out_trade_no;
    }

    /**
     * 校验支付订单的状态
     * @param int $site_id
     * @param array $data
     * @return void
     */
    public function check(int $site_id, array $data){
        $out_trade_no = $data['out_trade_no'];
        $pay = $this->findPayInfoByOutTradeNo($site_id, $out_trade_no);
        if($pay->isEmpty()) throw new PayException('ALIPAY_TRANSACTION_NO_NOT_EXIST');
        if($pay['status'] == PayDict::STATUS_ED)  throw new PayException('PAY_SUCCESS');//单据已支付
        if($pay['status'] == PayDict::STATUS_CALCLE)  throw new PayException('PAY_IS_REMOVE');//单据已取消
        //查询第三方支付单据
        $pay_info = $this->pay_event->init($site_id, $pay->channel, $pay->type)->getOrder($out_trade_no);
        $type = $pay['type'];
        if(empty($pay_info))
            return false;
        $status = $pay_info['status'];
        switch($status){
            case OnlinePayDict::SUCCESS://支付成功
                $this->paySuccess($site_id,[
                    'out_trade_no' => $out_trade_no,
                    'type' => $type
                ]);
                break;
            case OnlinePayDict::CLOSED://支付关闭
                $this->payClose($site_id,[
                    'out_trade_no' => $out_trade_no,
                    'type' => $type
                ]);
                break;
            case OnlinePayDict::NOTPAY://未支付
                //todo  主动去校验支付状态
                $this->check($site_id,[
                    'out_trade_no' => $out_trade_no,
                    'type' => $type
                ]);
                break;
        }
        return true;
    }

    /**
     * 支付成功
     * @param $site_id
     * @param $params
     * @return bool
     */
    public function paySuccess($site_id, $params){
        $out_trade_no = $params['out_trade_no'];
        $pay = $this->findPayInfoByOutTradeNo($site_id, $out_trade_no);
        $type = $params['type'];
        $trade_type = $pay->trade_type;
        $data = array(
            'pay_time' => time(),
            'status' => PayDict::STATUS_ED,
            'type' => $type,
            'trade_no' => $params['trade_no'] ?? '',
            'voucher' => $params['voucher'] ?? '',
            'mch_id' => $params['mch_id'] ?? '',
        );
        //允许修改的值
        $allow_field = array('trade_no', 'voucher', 'status', 'pay_time', 'type', 'mch_id');
        // 启动事务
        Db::startTrans();
        try {
            $pay->allowField($allow_field)->save($data);
            $result = event('PaySuccess', ['out_trade_no' => $out_trade_no, 'trade_type' => $trade_type, 'site_id' => $site_id]);
            if(!check_event_result($result)){
                return false;
            }
            // 提交事务
            Db::commit();
            return true;
        } catch (\Throwable $e) {
            // 回滚事务
            Db::rollback();
            throw new PayException($e->getMessage());
        }
        return true;
    }

    /**
     * 单据关闭
     * @param $site_id
     * @param $data
     * @return true
     */
    public function payClose($site_id, $data){
        $out_trade_no = $data['out_trade_no'];
        $this->model->where([
            ['site_id', '=', $site_id],
            ['out_trade_no', '=', $out_trade_no]
        ])->update([
            'status' => PayDict::STATUS_CALCLE
        ]);
        //todo  可能操作相关的订单关闭
//        event();
        return true;
    }
}