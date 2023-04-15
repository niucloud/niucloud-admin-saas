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

use app\enum\member\MemberAccountEnum;
use app\enum\member\MemberWithdrawEnum;
use app\model\member\MemberAccountLog;
use app\model\member\MemberWithdraw;
use app\service\admin\BaseAdminService;
use app\service\core\member\CoreMemberAccountService;
use app\service\core\member\CoreMemberService;
use app\service\core\member\CoreMemberWithdrawService;
use extend\exception\AdminException;
use extend\exception\ApiException;

/**
 * 会员提现服务层
 * Class MemberWithdrawService
 * @package app\service\admin\member
 */
class MemberWithdrawService extends BaseAdminService
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

        $field = 'id,site_id,withdraw_no,member_id,transfer_type,transfer_realname,transfer_mobile,transfer_bank,transfer_account,transfer_voucher,transfer_remark,transfer_fail_reason,transfer_status,transfer_time,apply_money,rate,service_money,money,audit_time,status,remark,create_time,refuse_reason,transfer_no';
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
        $field = 'id,site_id,withdraw_no,member_id,transfer_type,transfer_realname,transfer_mobile,transfer_bank,transfer_account,transfer_voucher,transfer_remark,transfer_fail_reason,transfer_status,transfer_time,apply_money,rate,service_money,money,audit_time,status,remark,create_time,refuse_reason,transfer_no';
        return $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->with(['memberInfo', 'transfer'])->field($field)->findOrEmpty()->toArray();
    }

    /**
     * @param int $id
     * @param $data
     * @return void
     */
    public function audit(int $id, string $action, $data){
        $core_member_withdraw_service = new CoreMemberWithdrawService();
        return $core_member_withdraw_service->audit($this->site_id, $id, $action, $data);
    }


    /**
     * 转账
     * @param $id
     * @param $data
     * @return true
     */
    public function transfer(int $id, array $data){
        $core_member_withdraw_service = new CoreMemberWithdrawService();
        return $core_member_withdraw_service->transfer($this->site_id, $id, $data);
    }

}