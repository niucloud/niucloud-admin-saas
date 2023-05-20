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

use app\enum\member\MemberAccountEnum;
use app\enum\pay\TransferEnum;
use app\service\api\member\MemberCashOutService;
use core\base\BaseApiController;
use think\Response;

class MemberCashOut extends BaseApiController
{

    /**
     * 会员提现列表
     * @return Response
     */
    public function lists()
    {
        $data = array_filter($this->request->params([
            [ 'status', '' ],
            [ 'account_type', '' ]
        ]), function($value){
            return $value !== '';
        });
        return success(( new MemberCashOutService() )->getPage($data));
    }

    /**
     * 提现详情
     * @return Response
     */
    public function info($id)
    {
        return success(( new MemberCashOutService() )->getInfo($id));
    }

    /**
     * 提现配置
     * @return Response
     */
    public function config()
    {
        return success(( new MemberCashOutService() )->getCashOutConfig());
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
     * 申请提现
     * @return void
     */
    public function apply()
    {
        $data = $this->request->params([
            [ 'apply_money', 0 ],
            [ 'account_type', MemberAccountEnum::MONEY ],
            [ 'transfer_type', '' ],
            [ 'account_id', 0 ]
        ]);
        $this->validate($data, 'app\validate\member\CashOut.apply');
        return success(( new MemberCashOutService() )->apply($data));
    }

    /**
     * 撤销提现申请
     * @param $id
     * @return Response
     */
    public function cancel($id)
    {
        return success(( new MemberCashOutService() )->cancel($id));
    }

}
