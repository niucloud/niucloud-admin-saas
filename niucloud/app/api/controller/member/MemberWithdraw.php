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

namespace app\api\controller\member;

use app\api\controller\BaseApiController;
use app\enum\pay\TransferEnum;
use app\service\api\login\AuthService;
use app\service\api\member\MemberService;
use app\service\api\member\MemberWithdrawService;
use think\Response;

class MemberWithdraw extends BaseApiController
{

    /**
     * 会员提现列表
     * @return Response
     */
    public function lists(){
        $data = $this->request->params([
            ['status', ''],
        ]);
        return success((new MemberWithdrawService())->getPage($data));
    }

    /**
     * 提现详情
     * @return Response
     */
    public function info($id){
        return success((new MemberWithdrawService())->getInfo($id));
    }

    /**
     * 提现配置
     * @return Response
     */
    public function config(){
        return success((new MemberWithdrawService())->getWithdrawConfig());
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
     * 绑定手机号
     * @return void
     */
    public function apply(){
        $data = $this->request->params([
            ['apply_money', 0],
            ['transfer_type',  ''],
            ['transfer_realname', ''],
            ['transfer_mobile',  ''],
            ['transfer_bank', ''],
            ['transfer_account',  ''],
        ]);
        return success((new MemberWithdrawService())->apply($data));
    }

    /**
     * 撤销提现申请
     * @param $id
     * @return Response
     */
    public function cancel($id){
        return success((new MemberWithdrawService())->cancel($id));
    }

}
