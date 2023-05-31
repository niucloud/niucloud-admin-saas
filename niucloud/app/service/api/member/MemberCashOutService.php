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

use app\dict\member\MemberCashOutDict;
use app\model\member\MemberCashOut;
use app\service\core\member\CoreMemberCashOutService;
use app\service\core\member\CoreMemberConfigService;
use core\base\BaseApiService;
use core\exception\ApiException;
use core\exception\CommonException;

/**
 * 会员提现服务层
 */
class MemberCashOutService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberCashOut();
    }

    /**
     * 会员提现列表
     * @param array $where
     * @return mixed
     */
    public function getPage(array $where = [])
    {
        $where['member_id'] = $this->member_id;
        $where['site_id'] = $this->site_id;
        $field = 'id,site_id,cash_out_no,member_id,account_type,transfer_type,transfer_realname,transfer_mobile,transfer_bank,transfer_account,transfer_status,transfer_time,apply_money,rate,service_money,money,audit_time,status,remark,create_time,refuse_reason';
        $search_model = $this->model->where($where)->withSearch(['member_id','status', 'create_time'],$where)->with(['memberInfo', 'transfer'])->field($field)->append(['account_type_name', 'transfer_type_name', 'status_name', 'transfer_status_name'])->order('create_time desc');

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
        $field = 'id,site_id,cash_out_no,member_id,transfer_type,transfer_realname,transfer_mobile,transfer_bank,transfer_account,transfer_fail_reason,transfer_time,apply_money,rate,service_money,money,audit_time,status,remark,create_time,refuse_reason';
        return $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id]])->with(['memberInfo', 'transfer'])->field($field)->append(['account_type_name', 'transfer_type_name', 'status_name', 'transfer_status_name'])->findOrEmpty()->toArray();
    }


    /**
     * 申请提现
     * @param $data
     * @return true
     */
    public function apply(array $data){

        return (new CoreMemberCashOutService())->apply($this->site_id, $this->member_id, $data);
    }


    /**
     * 撤销提现申请
     * @param int $site_id
     * @param int $member_id
     * @param int $id
     * @return true
     */
    public function cancel(int $id){
        $cash_out = $this->model->where([
            ['site_id', '=', $this->site_id],
            ['id', '=', $id],
            ['member_id', '=', $this->member_id],
        ])->findOrEmpty();

        if($cash_out->isEmpty()) throw new ApiException('RECHARGE_LOG_NOT_EXIST');
        if($cash_out['status'] != MemberCashOutDict::WAIT_AUDIT) throw new CommonException('CASHOUT_STATUS_NOT_IN_WAIT_AUDIT');
        $cash_out->save(

            [
                'cancel_time' => time(),
                'status' => MemberCashOutDict::CANCEL
            ]
        );
        (new CoreMemberConfigService())->returnMember($this->site_id, $cash_out);
        return true;
    }

    /**
     * 获取提现配置
     * @return array
     */
    public function getCashOutConfig(){
        return (new CoreMemberConfigService())->getCashOutConfig($this->site_id);
    }

}