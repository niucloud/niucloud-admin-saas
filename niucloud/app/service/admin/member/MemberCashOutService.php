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

namespace app\service\admin\member;

use app\dict\member\MemberCashOutDict;
use app\model\member\MemberCashOut;
use app\service\core\member\CoreMemberCashOutService;
use core\base\BaseAdminService;

/**
 * 会员提现服务层
 */
class MemberCashOutService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberCashOut();
    }

    /**
     * 会员提现列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {

        $field = 'id,member_cash_out.site_id,cash_out_no,member_cash_out.member_id,account_type,transfer_type,transfer_realname,transfer_mobile,transfer_bank,transfer_account,transfer_fail_reason,transfer_status,transfer_time,apply_money,rate,service_money,member_cash_out.money,audit_time,member_cash_out.status,remark,member_cash_out.create_time,refuse_reason,transfer_no';
        $member_where = [];
        if(!empty($where['keywords']))
        {
            $member_where = [['member.member_no|member.nickname|member.mobile', '=', $where['keywords']]];
        }
        $search_model = $this->model->where([['member_cash_out.site_id', '=', $this->site_id]])->withSearch(['member_id','status', 'join_create_time' => 'create_time', 'audit_time', 'transfer_time', 'transfer_type', 'cash_out_no'],$where)->with(['transfer'])->withJoin(["member" => function($query){
                $query->field("member.nickname, member.headimg, member.mobile, member.member_id, member.member_no");
            }])->where($member_where)->field($field)->order('create_time desc')->append(['status_name', 'transfer_status_name', 'transfer_type_name', 'account_type_name']);
        return $this->pageQuery($search_model);
    }

    /**
     * 提现详情
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,cash_out_no,member_id,account_type,transfer_type,transfer_realname,transfer_mobile,transfer_bank,transfer_account,transfer_fail_reason,transfer_status,transfer_time,apply_money,rate,service_money,money,audit_time,status,remark,create_time,refuse_reason,transfer_no';
        return $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->with(['memberInfo', 'transfer'])->field($field)->append(['status_name', 'transfer_status_name', 'transfer_type_name', 'account_type_name'])->findOrEmpty()->toArray();
    }

    /**
     * @param int $id
     * @param string $action
     * @param $data
     * @return true|null
     */
    public function audit(int $id, string $action, $data){
        $core_member_cash_out_service = new CoreMemberCashOutService();
        return $core_member_cash_out_service->audit($this->site_id, $id, $action, $data);
    }


    /**
     * 转账
     * @param int $id
     * @param array $data
     * @return true
     */
    public function transfer(int $id, array $data){
        $core_member_cash_out_service = new CoreMemberCashOutService();
        return $core_member_cash_out_service->transfer($this->site_id, $id, $data);
    }

    /**
     * 统计数据
     * @return array
     */
    public function stat()
    {
        $stat = [];
        //已提现
        $stat['transfered'] = $this->model->where([['status', '=', MemberCashOutDict::TRANSFERED], ['site_id', '=', $this->site_id]])->sum("apply_money");
        //所有金额（包括提现中，已提现）
        $all_money = $this->model->where([['status', '>=', 0], ['site_id', '=', $this->site_id]])->sum("apply_money");

        $stat['cash_outing'] = $all_money - $stat['transfered'];
        return $stat;
    }

}