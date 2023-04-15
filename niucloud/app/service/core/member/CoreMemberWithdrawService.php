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

use app\enum\member\MemberWithdrawEnum;
use app\enum\pay\PayEnum;
use app\enum\pay\TransferEnum;
use app\enum\withdraw\WithdrawTypeEnum;
use app\model\member\MemberWithdraw;
use app\service\core\BaseCoreService;
use app\service\core\pay\CoreTransferService;
use extend\exception\CommonException;
use think\facade\Db;

/**
 * 会员提现
 * Class CoreMemberAccountService
 * @package app\service\core\member
 */
class CoreMemberWithdrawService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberWithdraw();
    }

    /**
     * 获取对象
     * @param int $site_id
     * @param int $id
     * @return MemberWithdraw|array|mixed|\think\Model
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
        $withdraw = $this->find($site_id, $id);
        if($withdraw->isEmpty()) throw new CommonException(302004);
        if($withdraw['status'] != MemberWithdrawEnum::WAIT_AUDIT) throw new CommonException(302011);
        switch($action){
            case 'agree'://同意
                $this->agree($site_id, $withdraw, $data);
                break;
            case 'refuse'://拒绝
                $this->refuse($site_id, $withdraw, $data);
                break;
        }
        return true;
    }

    /**
     * 审核通过
     * @param MemberWithdraw $withdraw
     * @param $data
     * @return true
     */
    public function agree(int $site_id, MemberWithdraw $withdraw, array $data = []){
        $withdraw->save([
            'audit_time' => time(),
            'status' => MemberWithdrawEnum::WAIT_TRANSFER
        ]);
        $config = (new CoreMemberConfigService())->getWithdrawConfig($site_id);
        if($config['is_auto_transfer']){
            try {
                $this->transfer($site_id, $withdraw['id']);
            } catch (\Throwable $e) {

            }
        }
        return true;
    }

    /**
     * 拒绝
     * @param MemberWithdraw $withdraw
     * @param $data
     * @return true
     */
    public function refuse(int $site_id, MemberWithdraw $withdraw, array $data){
        $withdraw->save([
            'audit_time' => time(),
            'status' => MemberWithdrawEnum::WAIT_TRANSFER,
            'refuse_reason' => $data['refuse_reason']
        ]);
        $this->returnMember($site_id, $withdraw);
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
        $withdraw = $this->find($site_id, $id);
        if($withdraw->isEmpty()) throw new CommonException(302004);
        if($withdraw['status'] != MemberWithdrawEnum::WAIT_TRANSFER) throw new CommonException(302010);
        $transfer_no = $withdraw['transfer_no'];
        if(!$transfer_no){
            $transfer_no = (new CoreTransferService())->create($site_id, PayEnum::MEMBER, $withdraw['member_id'], $withdraw['money'], WithdrawTypeEnum::MEMBER_WITHDRAW, get_lang(302012));
            $withdraw->save(
                [
                    'transfer_no' => $transfer_no
                ]
            );
        }

        if(empty($transfer_type)){
            $transfer_type = $withdraw['transfer_type'];
        }
        if($transfer_type != TransferEnum::OFFLINE){
            $data['transfer_type'] = $withdraw['transfer_type'];
            $data['transfer_realname'] = $withdraw['transfer_realname'];
            $data['transfer_mobile'] = $withdraw['transfer_mobile'];
            $data['transfer_bank'] = $withdraw['transfer_bank'];
            $data['transfer_account'] = $withdraw['transfer_account'];
            if($transfer_type == TransferEnum::WECHAT){
                $member = (new CoreMemberService())->find($site_id, $withdraw['member_id']);
                $data['openid'] = $member['wx_openid'];
            }
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
        $withdraw = $this->model->where(
            [
                ['site_id', '=', $site_id],
                ['transfer_no', '=', $transfer_no]
            ]
        )->findOrEmpty();
        if($withdraw->isEmpty()) throw new CommonException(302004);
        if($withdraw['status'] != MemberWithdrawEnum::WAIT_TRANSFER) throw new CommonException(302010);
        $withdraw->save([
            'status' => MemberWithdrawEnum::TRANSFERED,
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
        if($member->isEmpty()) throw new CommonException(301005);
        $config = (new CoreMemberConfigService())->getWithdrawConfig($site_id);
        $is_open = $config['is_open'];
        if($is_open == 0) throw new CommonException(302001);
        $apply_money = $data['apply_money'];
        if($apply_money < $config['min']) throw new CommonException(302002);
        $transfer_type = $data['transfer_type'];
        if(!in_array($transfer_type, $config['transfer_type'])) throw new CommonException(302003);
        $service_money = format_round_money($apply_money * $config['rate']/100);
        $min = $config['min'];
        if($apply_money < $min) throw new CommonException(302009);
//        $apply_money, $transfer_type, $transfer_realname, $transfer_mobile, $transfer_bank, $transfer_account
        $money = $apply_money - $service_money;
        $data = array(
            'member_id' => $member_id,
            'site_id' => $site_id,
            'status' => MemberWithdrawEnum::WAIT_AUDIT,
            'apply_money' => $apply_money,
            'service_money' => $service_money,
            'money' => $money,
            'transfer_type' => $transfer_type,
            'transfer_realname' => $data['transfer_realname'] ?? '',
            'transfer_mobile' => $data['transfer_mobile'] ?? '',
            'transfer_bank' => $data['transfer_bank'] ?? '',
            'transfer_account' => $data['transfer_account'] ?? '',
            'rate' => $config['rate'],
        );
        $withdraw = $this->model->create($data);
        //扣除可提现零钱
        $member_account_service = new CoreMemberAccountService();
        $member_account_service->addLog($site_id, $member_id, 'money', $apply_money, 'withdraw', get_lang(302008), $withdraw->id);
        $member->save(
            [
                'money_withdrawing' => $member['money_withdrawing'] + $apply_money
            ]
        );
        if($config['is_auto_verify']){
            $core_member_withdraw_service = new CoreMemberWithdrawService();
            $core_member_withdraw_service->audit($site_id, $withdraw->id, 'agree');
        }
        return true;
    }

    /**
     * 当前可用的转账方式
     * @param $site_id
     * @return array|array[]
     */
    public function getTransferType($site_id){
        $config = (new CoreMemberConfigService())->getWithdrawConfig($site_id);
        return TransferEnum::getTransferType($config['transfer_type'], false);
    }



    /**
     * 返还用户的可提现零钱
     * @param int $site_id
     * @param MemberWithdraw $withdraw
     * @return true
     */
    public function returnMember(int $site_id, MemberWithdraw $withdraw){
        $core_member_account_service = new CoreMemberAccountService();
        $core_member_account_service->addLog($site_id, $withdraw->member_id, 'money', -$withdraw->apply_money, 'withdraw', get_lang(302007), $withdraw->id);
        $core_member_service = new CoreMemberService();
        $member = $core_member_service->find($site_id, $withdraw->member_id);
        if($member->isEmpty()) throw new CommonException(301005);
        $member->save(
            [
                'money_withdrawing' => $member['money_withdrawing'] + $withdraw->apply_money
            ]
        );
        return true;
    }
}