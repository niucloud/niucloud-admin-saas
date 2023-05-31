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

namespace app\service\core\member;

use app\dict\cash_out\CashOutTypeDict;
use app\dict\member\MemberAccountTypeDict;
use app\dict\member\MemberCashOutDict;
use app\dict\pay\PayDict;
use app\dict\pay\TransferDict;
use app\model\member\MemberCashOut;
use app\service\core\pay\CoreTransferService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use think\facade\Cache;
use think\facade\Db;

/**
 * 会员提现
 * Class CoreMemberAccountService
 * @package app\service\core\member
 */
class CoreMemberCashOutService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberCashOut();
    }

    /**
     * 获取对象
     * @param int $site_id
     * @param int $id
     * @return MemberCashOut|array|mixed|\think\Model
     */
    public function find(int $site_id, int $id){
        return $this->model->where([
            ['site_id', '=', $site_id],
            ['id', '=', $id],
        ])->findOrEmpty();
    }

    /**
     * @param int $id
     * @param $data
     * @return void
     */
    public function audit(int $site_id, int $id, string $action, $data = []){

        $cash_out = $this->find($site_id, $id);
        if($cash_out->isEmpty()) throw new CommonException('CASHOUT_LOG_NOT_EXIST');
        if($cash_out['status'] != MemberCashOutDict::WAIT_AUDIT) throw new CommonException('CASHOUT_STATUS_NOT_IN_WAIT_AUDIT');
        switch($action){
            case 'agree'://同意
                $this->agree($site_id, $cash_out, $data);
                break;
            case 'refuse'://拒绝
                $this->refuse($site_id, $cash_out, $data);
                break;
        }
        return true;
    }

    /**
     * 审核通过
     * @param MemberCashOut $cash_out
     * @param $data
     * @return true
     */
    public function agree(int $site_id, MemberCashOut $cash_out, array $data = []){
        $cash_out->save([
            'audit_time' => time(),
            'status' => MemberCashOutDict::WAIT_TRANSFER
        ]);
        $config = (new CoreMemberConfigService())->getCashOutConfig($site_id);
        if($config['is_auto_transfer']){
            try {
                $this->transfer($site_id, $cash_out['id']);
            } catch (\Throwable $e) {

            }
        }
        return true;
    }

    /**
     * 拒绝
     * @param MemberCashOut $cash_out
     * @param $data
     * @return true
     */
    public function refuse(int $site_id, MemberCashOut $cash_out, array $data){
        $cash_out->save([
            'audit_time' => time(),
            'status' => MemberCashOutDict::REFUSE,
            'refuse_reason' => $data['refuse_reason']
        ]);
        $this->returnMember($site_id, $cash_out);
        return true;
    }

    /**
     * 转账
     * @param int $site_id
     * @param int $id
     * @param array $data
     * @return true
     */
    public function transfer(int $site_id, int $id, array $data = []){
        $transfer_type = $data['transfer_type'] ?? '';

        $cash_out = $this->find($site_id, $id);
        if($cash_out->isEmpty()) throw new CommonException('RECHARGE_LOG_NOT_EXIST');
        if($cash_out['status'] != MemberCashOutDict::WAIT_TRANSFER) throw new CommonException('CASHOUT_STATUS_NOT_IN_WAIT_TRANSFER');
        $transfer_no = $cash_out['transfer_no'];
        if(!$transfer_no){
            $transfer_no = (new CoreTransferService())->create($site_id, PayDict::MEMBER, $cash_out['member_id'], $cash_out['money'], CashOutTypeDict::MEMBER_CASH_OUT, get_lang('MEMBER_CASHOUT_TRANSFER'));
            $cash_out->save(
                [
                    'transfer_no' => $transfer_no
                ]
            );
        }

        if($transfer_type != TransferDict::OFFLINE){
            $data['transfer_type'] = $cash_out['transfer_type'];
            $data['transfer_realname'] = $cash_out['transfer_realname'];
            $data['transfer_mobile'] = $cash_out['transfer_mobile'];
            $data['transfer_bank'] = $cash_out['transfer_bank'];
            $data['transfer_account'] = $cash_out['transfer_account'];
            $transfer_type = $cash_out['transfer_type'];
            if($transfer_type == TransferDict::WECHAT){
                $member = (new CoreMemberService())->find($site_id, $cash_out['member_id']);
                $data['openid'] = $member['wx_openid'];
            }
        }else{
            $transfer_type = $cash_out['transfer_type'];
        }

        $result = (new CoreTransferService())->transfer($site_id, $transfer_no, $transfer_type, $data);
        return true;

    }


    /**
     * 提现转账完成
     * @param $site_id
     * @param $transfer_no
     * @return void
     */
    public function transferFinish($site_id, $transfer_no){
        $cash_out = $this->model->where(
            [
                ['site_id', '=', $site_id],
                ['transfer_no', '=', $transfer_no]
            ]
        )->findOrEmpty();

        if($cash_out->isEmpty()) throw new CommonException('RECHARGE_LOG_NOT_EXIST');
        if($cash_out['status'] != MemberCashOutDict::WAIT_TRANSFER) throw new CommonException('CASHOUT_STATUS_NOT_IN_WAIT_TRANSFER');
        $cash_out->save([
            'status' => MemberCashOutDict::TRANSFERED,
            'transfer_time' => time()
        ]);
        return true;
    }

    /**
     * 申请提现
     * @param $data
     * @return true
     */
    public function apply(int $site_id, int $member_id, array $data){
        $core_member_service = new CoreMemberService();
        $member = $core_member_service->find($site_id, $member_id);

        if($member->isEmpty()) throw new CommonException('MEMBER_NOT_EXIST');
        $config = (new CoreMemberConfigService())->getCashOutConfig($site_id);
        $is_open = $config['is_open'];
        if($is_open == 0) throw new CommonException('CASHOUT_NOT_OPEN');
        $apply_money = $data['apply_money'];
        if($apply_money < $config['min']) throw new CommonException('CASHOUT_MONEY_TOO_LITTLE');
        $transfer_type = $data['transfer_type'];
        if(!in_array($transfer_type, $config['transfer_type'])) throw new CommonException('CASHOUT_TYPE_NOT_OPEN');
        $service_money = format_round_money($apply_money * $config['rate']/100);
        $min = $config['min'];
        if($apply_money < $min) throw new CommonException('CASHOUT_MONEY_TOO_LITTLE');
//        $apply_money, $transfer_type, $transfer_realname, $transfer_mobile, $transfer_bank, $transfer_account
        $money = $apply_money - $service_money;
        $account_type = $data['account_type'] ?? MemberAccountTypeDict::MONEY;

        $cash_out_account = [];
        if ($transfer_type != TransferDict::WECHAT) {
            $cash_out_account = (new CoreMemberCashOutAccountService())->getInfo($data['account_id'], $site_id, $member_id);
            if (empty($cash_out_account)) throw new CommonException('CASH_OUT_ACCOUNT_NOT_EXIST');
        }

        Db::startTrans();
        try {
            $data = array(
                'member_id' => $member_id,
                'site_id' => $site_id,
                'cash_out_no' => $this->createCashOutNo($site_id),
                'status' => MemberCashOutDict::WAIT_AUDIT,
                'account_type' => $account_type,
                'apply_money' => $apply_money,
                'service_money' => $service_money,
                'money' => $money,
                'transfer_type' => $transfer_type,
                'transfer_realname' => $cash_out_account['realname'] ?? '',
                'transfer_mobile' => $member['mobile'] ?? '',
                'transfer_bank' => $cash_out_account['bank_name'] ?? '',
                'transfer_account' => $cash_out_account['account_no'] ?? '',
                'rate' => $config['rate'],
            );
            $cash_out = $this->model->create($data);
            //扣除对应账户金额
            $member_account_service = new CoreMemberAccountService();

            $member_account_service->addLog($site_id, $member_id, $account_type, -$apply_money, 'cash_out', get_lang('MEMBER_APPLY_CASHOUT'), $cash_out->id);
            $member->save(
                [
                    $account_type.'_cash_outing' => $member[$account_type.'_cash_outing'] + $apply_money
                ]
            );
            if ($config['is_auto_verify']) {
                $core_member_cash_out_service = new CoreMemberCashOutService();
                $core_member_cash_out_service->audit($site_id, $cash_out->id, 'agree');
            }
            Db::commit();
        }catch ( \Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
        return true;
    }

    /**
     * 当前可用的转账方式
     * @param $site_id
     * @return array|array[]
     */
    public function getTransferType($site_id){
        $config = (new CoreMemberConfigService())->getCashOutConfig($site_id);
        return TransferDict::getTransferType($config['transfer_type'], false);
    }



    /**
     * 返还用户的对应账户
     * @param int $site_id
     * @param MemberCashOut $cash_out
     * @return true
     */
    public function returnMember(int $site_id, MemberCashOut $cash_out){
        $core_member_account_service = new CoreMemberAccountService();

        $core_member_account_service->addLog($site_id, $cash_out->member_id, $cash_out->account_type, $cash_out->apply_money, 'cash_out', get_lang('CASHOUT_IS_REFUSE'), $cash_out->id);
        $core_member_service = new CoreMemberService();
        $member = $core_member_service->find($site_id, $cash_out->member_id);
        if($member->isEmpty()) throw new CommonException('MEMBER_NOT_EXIST');
        $member->save(
            [
                $cash_out->account_type.'_cash_outing' => $member[$cash_out->account_type.'_cash_outing'] - $cash_out->apply_money
            ]
        );
        return true;
    }
    /**
     * 创建订单编号
     * @param int $site_id
     * @return string
     */
    public function createCashOutNo(int $site_id)
    {
        $time_str = date('YmdHi');
        $max_no = Cache::get("cash_out_no_" . $site_id . "_" . $time_str);

        if (!isset($max_no) || empty($max_no)) {
            $max_no = 1;
        } else {
            $max_no = $max_no + 1;
        }
        $cash_out_no = $time_str . $site_id . sprintf('%03d', $max_no);
        Cache::set("cash_out_no_" . $site_id . "_" . $time_str, $max_no);
        return $cash_out_no;
    }
}