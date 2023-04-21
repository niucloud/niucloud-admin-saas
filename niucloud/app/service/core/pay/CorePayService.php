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
use app\enum\order\OrderTypeEnum;
use app\enum\pay\OnlinePayEnum;
use app\enum\pay\PayEnum;
use app\job\pay\PayReturnTo;
use app\model\pay\Pay;
use app\service\core\BaseCoreService;
use app\service\core\member\CoreMemberService;
use extend\exception\PayException;
use think\facade\Log;
use think\facade\Db;

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
     * @param string|int $main
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
            $pay['pay_type_list'] = array_values((new CorePayConfigService())->getPayList($site_id, array_intersect(ChannelEnum::getAllowPayType($channel), $pay['pay_type_list'])));
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
        if($pay->isEmpty()) throw new PayException(700000);
        if($pay['status'] == PayEnum::STATUS_ING)  throw new PayException(700002);
        if($pay['status'] == PayEnum::STATUS_ED)  throw new PayException(700003);
        if($pay['status'] == PayEnum::STATUS_CALCLE)  throw new PayException(700004);
        $money = $pay['money'];
        $body = $pay['body'];
        $trade_type = $pay['trade_type'];
        $allow_type = OrderTypeEnum::getAllowPayType($trade_type);//当前支付允许使用的支付方式
        if(!in_array($type, $allow_type)){
            throw new PayException(700001);//业务不支持
        }
        if(!in_array($type, ChannelEnum::getAllowPayType($channel)))  throw new PayException(700006);//场景不支持

        $pay_result = $this->pay_event->pay($site_id, $type, $out_trade_no, $money, $body, $channel, $return_url, $quit_url, $buyer_id, $openid ?? '');
        //将支付设置为支付中
        $pay->save(
            [
                'type' => $type,
                'status' => PayEnum::STATUS_ING
            ]
        );
        create_queue(PayReturnTo::class, ['site_id' => $site_id, 'out_trade_no' => $out_trade_no], 15);
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
        if($pay['status'] != PayEnum::STATUS_ING)  return true;
        if(empty($pay->type)) return true;
        //尝试取消或关闭第三方支付
        try{
            $close = $this->close($site_id, $out_trade_no);
        }catch(\Throwable $e){
            $close = false;
        }
        if($close){
            $data = array(
                'status' => PayEnum::STATUS_WAIT,
                'type' => ''
            );
            $pay->save($data);
        }

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
        if($pay->isEmpty()) throw new PayException(700000);
        if($pay['status'] != PayEnum::STATUS_ING)  throw new PayException(700007);
        if(empty($pay->type)) throw new PayException(700007);
        //尝试取消或关闭第三方支付
        $close = $this->pay_event->close($site_id, $pay->type, $out_trade_no);
        if(!$close){//有问题查询第三方订单详情
            $order = $this->pay_event->getOrder($site_id, $pay->type, $out_trade_no);
            if(empty($order))
                return true;
            if(!empty($order) && $order['status'] == OnlinePayEnum::SUCCESS){//如果已支付,就将支付调整为已支付
                $this->finish($site_id, $out_trade_no, $pay->type);
                return false;
            }
            return true;
        }
        return true;
    }
    /**
     * 退款
     * @param $site_id
     * @param $out_trade_no
     * @param float $money
     * @return void
     */
    public function refundCreate($site_id, $main, $out_trade_no, float $money){
        $refund_no = create_no('pay', $main);
        $data = array(
            'site_id' => $site_id,
            'money' => $money,
            'trade_type' => $trade_type,
            'body' => $body,
            'out_trade_no' => $out_trade_no
        );
        $this->model->create($data);
        return $out_trade_no;
    }

    public function refund($site_id, $refund_no){

    }

    /**
     * 支付完成
     * @param $out_trade_no
     * @param $type
     * @param $trade_no
     * @return void
     */
    public function finish(int $site_id, $out_trade_no, string $type, array $params = []){
        $pay = $this->findPayInfoByOutTradeNo($site_id, $out_trade_no);

        if($pay->isEmpty()) throw new PayException(700000);
        if($pay['status'] == PayEnum::STATUS_ED)  throw new PayException(700003);
        if($pay['status'] == PayEnum::STATUS_CALCLE)  throw new PayException(700004);
        $trade_type = $pay->trade_type;
        $data = array(
            'pay_time' => time(),
            'status' => PayEnum::STATUS_ED,
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

    }


    /**
     * 异步通知
     * @param int $site_id
     * @param string $type
     * @return null
     */
    public function notify(int $site_id, string $type, string $action){
        Log::write('pay__'.$site_id.'_'.$type.'_'.$action);
        $callback = function($out_trade_no, $params) use($site_id,$type, $action){
            try {
                switch($action){
                    case 'pay'://支付结果通知
                        return $this->finish($site_id, $out_trade_no, $type, $params);
                        break;
                    case 'refund':

                        break;
                }

            } catch (PayException $e) {
                Log::write('pay__'.$site_id.'_'.$type.'_'.$e->getMessage());
                return false;
            }
        };
        return $this->pay_event->notify($site_id, $type, $callback);

//        return true;
    }


    /**
     * 支付取消
     * @param int $site_id
     * @param string $out_trade_no
     * @return void
     */
    public function cancel(int $site_id, string $out_trade_no){
        $pay = $this->findPayInfoByOutTradeNo($site_id, $out_trade_no);
        if($pay->isEmpty()) throw new PayException(700000);
        if($pay['status'] == PayEnum::STATUS_ED)  throw new PayException(700003);//已支付不能取消
        if($pay['status'] == PayEnum::STATUS_CALCLE)  throw new PayException(700004);//已取消不能重复取消
        $type = $pay->type;
        if($pay['status'] == PayEnum::STATUS_ING){
            //尝试关闭相关支付
            $result = $this->pay_event->close($site_id, $type, $out_trade_no);
            if($result){

            }else{//根据返回值来进行下一步操作  支付已完成就将支付完成

            }

        }
    }

    public function reset(int $site_id, string $out_trade_no, float $money){
        $pay = $this->findPayInfoByOutTradeNo($site_id, $out_trade_no);
        if($pay->isEmpty()) throw new PayException(700000);
        if(!in_array($pay['status'], [
            PayEnum::STATUS_WAIT,
            PayEnum::STATUS_ING
        ]))  throw new PayException(700011);//只有待支付可以重置支付
        if($pay['status'] == PayEnum::STATUS_ING){
            if(!$this->returnTo($site_id, $pay)){
                throw new PayException(700012);
            }
        }
        $out_trade_no = create_no('pay', $pay['main_id']);
        $data = array(
            'out_trade_no' => $out_trade_no,
            'money' => $money
        );
        $pay->save($data);
        //todo  需要考虑是业务调用重置支付,还是支付重置反馈业务
        return $out_trade_no;
    }
}