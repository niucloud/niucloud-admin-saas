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

namespace app\adminapi\controller\member;

use app\adminapi\controller\BaseAdminController;
use app\enum\pay\TransferEnum;
use app\service\admin\member\MemberWithdrawService;
use think\Response;

class Withdraw extends BaseAdminController
{
    /**
     * 提现列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['member_id', ''],
            ['status', ''],
            ['create_time', []],
        ]);
        return success((new MemberWithdrawService())->getPage($data));
    }

    /**
     * 提现详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new MemberWithdrawService())->getInfo($id));
    }

    public function audit($id, $action)
    {
        $data = $this->request->params([
            ['refuse_reason', ''],
        ]);
        (new MemberWithdrawService())->audit($id, $action, $data);
        return success(100000);
    }

    /**
     * 转账方式
     * @return Response
     */
    public function getTransferType()
    {
        return success(TransferEnum::getTransferType([], false));
    }

    /**
     * 转账方式
     * @param $id
     * @return Response
     */
    public function transfer($id)
    {
        $data = $this->request->params([
            ['transfer_voucher', ''],
            ['transfer_remark', ''],
            ['transfer_type', '']
        ]);
        (new MemberWithdrawService())->transfer($id, $data);
        return success(100000);
    }

}
