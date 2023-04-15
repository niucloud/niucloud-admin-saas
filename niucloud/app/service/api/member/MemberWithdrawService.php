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

namespace app\service\api\member;

use app\enum\member\MemberWithdrawEnum;
use app\model\member\MemberWithdraw;
use app\service\api\BaseApiService;
use app\service\core\member\CoreMemberAccountService;
use app\service\core\member\CoreMemberConfigService;
use app\service\core\member\CoreMemberService;
use app\service\core\member\CoreMemberWithdrawService;
use extend\exception\ApiException;
use extend\exception\CommonException;

/**
 * 会员提现服务层
 * Class MemberWithdrawService
 * @package app\service\admin\member
 */
class MemberWithdrawService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberWithdraw();
    }

    /**
     * 会员提现列表
     * @param array $where
     * @return mixed
     */
    public function getPage(array $where = [])
    {
        $where['member_id'] = $this->member_id;
        $field = 'id,site_id,withdraw_no,member_id,transfer_type,transfer_realname,transfer_mobile,transfer_bank,transfer_account,transfer_voucher,transfer_remark,transfer_status,transfer_time,apply_money,rate,service_money,money,audit_time,status,remark,create_time,refuse_reason';
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(['member_id','status', 'create_time'],$where)->with(['memberInfo', 'transfer'])->field($field)->order('create_time desc');

        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 提现详情
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,withdraw_no,member_id,transfer_type,transfer_realname,transfer_mobile,transfer_bank,transfer_account,transfer_voucher,transfer_remark,transfer_fail_reason,transfer_time,apply_money,rate,service_money,money,audit_time,status,remark,create_time,refuse_reason';
        return $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id]])->with(['memberInfo', 'transfer'])->field($field)->findOrEmpty()->toArray();
    }


    /**
     * 申请提现
     * @param $data
     * @return true
     */
    public function apply(array $data){

        return (new CoreMemberWithdrawService())->apply($this->site_id, $this->member_id, $data);
    }


    /**
     * 撤销提现申请
     * @param int $site_id
     * @param int $member_id
     * @param int $id
     * @return true
     */
    public function cancel(int $id){
        $withdraw = $this->model->where([
            ['site_id', '=', $this->site_id],
            ['id', '=', $id],
            ['member_id', '=', $this->member_id],
        ])->findOrEmpty();
        if($withdraw->isEmpty()) throw new ApiException(302004);
        if($withdraw['status'] != MemberWithdrawEnum::WAIT_AUDIT) throw new CommonException(302011);
        $withdraw->save(
            [
                'cancel_time' => time(),
                'status' => MemberWithdrawEnum::CANCEL
            ]
        );
        (new CoreMemberConfigService())->returnMember($this->site_id, $withdraw);
        return true;
    }

    /**
     * 获取提现配置
     * @return array
     */
    public function getWithdrawConfig(){
        return (new CoreMemberConfigService())->getWithdrawConfig($this->site_id);
    }

}