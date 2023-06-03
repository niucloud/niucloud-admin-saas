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

use app\dict\member\MemberAccountChangeTypeDict;
use app\dict\member\MemberAccountTypeDict;
use app\dict\pay\PayDict;
use app\service\core\member\CoreMemberAccountService;
use app\service\core\pay\CorePayService;
use core\base\BaseCoreService;

/**
 * 支付服务层
 * Class CorePayEventService
 * @package app\service\core\pay
 */
class CoreBalanceService extends BaseCoreService
{

    private $site_id;//站点id
    private $config;//支付配置
    private $type;//支付类型
    private $channel;//支付渠道  (特殊点,转账也算是一种)

    public function __construct()
    {
        parent::__construct();
    }


    public function pay($params){
//        $password = $params['password'];
//        if(empty($password)){
//
//        }
        $site_id = $params['site_id'];
        $main_id = $params['main_id'];
        $main_type = $params['main_type'];
        $money = $params['money'];
        $out_trade_no = $params['out_trade_no'];//交易流水号
        switch($main_type){
            case 'member':

                //余额不足会抛出异常
                (new CoreMemberAccountService())->addLog($site_id, $main_id, MemberAccountTypeDict::BALANCE,
                    -$money, 'order', MemberAccountChangeTypeDict::getType('order')['name'] ?? '', $out_trade_no);

                break;
            case 'user':


                break;
        }
        return [
            'status' => PayDict::STATUS_ED,
            'out_trade_no' => $out_trade_no,
        ];
        //业务主体id
        //查询一下余额是否足够
        //生成账户变动记录,
//        if($member_id > 0){
//
//        }
        //可能会锁定一部分余额

    }

    /**
     * 订单退款
     * @param array $params
     * @return true
     */
    public function refund(array $params){
        $out_trade_no = $params['out_trade_no'];
        $money = $params['money'];
        $site_id = $params['site_id'];
        $refund_no = $params['refund_no'];
        $core_pay_service = new CorePayService();
        $pay = $core_pay_service->getInfoByOutTradeNo($out_trade_no);

        $main_id = $pay['main_id'];
        $main_type = $pay['main_type'];

        switch($main_type){
            case 'member':
                    //余额不足会抛出异常
                    (new CoreMemberAccountService())->addLog($site_id, $main_id, MemberAccountTypeDict::BALANCE,
                        $money, 'order_refund', MemberAccountChangeTypeDict::getType('order_refund')['name'] ?? '', $refund_no);

                break;
            case 'user':


                break;
        }
        return true;

    }

}