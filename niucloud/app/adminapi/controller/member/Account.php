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

use app\enum\member\MemberAccountEnum;
use app\service\admin\member\MemberAccountService;
use core\base\BaseAdminController;
use think\Response;

class Account extends BaseAdminController
{
    /**
     * 积分流水
     * @return Response
     */
    public function point()
    {
        $data = $this->request->params([
            [ 'member_id', '' ],
            [ 'from_type', '' ],
            [ 'create_time', [] ],
        ]);
        $data[ 'account_type' ] = 'point';
        return success(( new MemberAccountService() )->getPage($data));
    }

    /**
     * 余额流水
     * @return Response
     */
    public function balance()
    {
        $data = $this->request->params([
            [ 'member_id', '' ],
            [ 'from_type', '' ],
            [ 'create_time', [] ],
        ]);
        $data[ 'account_type' ] = 'balance';
        return success(( new MemberAccountService() )->getPage($data));
    }

    /**
     * 可提现余额流水
     * @return Response
     */
    public function money()
    {
        $data = $this->request->params([
            [ 'member_id', '' ],
            [ 'from_type', '' ],
            [ 'create_time', [] ],
        ]);
        $data[ 'account_type' ] = 'money';
        return success(( new MemberAccountService() )->getPage($data));
    }

    /**
     * 积分账户调整
     */
    public function adjustPoint()
    {
        $data = $this->request->params([
            [ 'member_id', '' ],
            [ 'account_data', 0 ],
            [ 'memo', '' ],
        ]);
        $res = ( new MemberAccountService() )->adjustPoint($data);
        return success('ADD_SUCCESS', [ 'id' => $res ]);
    }

    /**
     * 余额账户调整
     */
    public function adjustBalance()
    {
        $data = $this->request->params([
            [ 'member_id', '' ],
            [ 'account_data', 0 ],
            [ 'memo', '' ],
        ]);
        $res = ( new MemberAccountService() )->adjustBalance($data);
        return success('ADD_SUCCESS', [ 'id' => $res ]);
    }

    /**
     * 零钱调整
     * @return Response
     */
    public function adjustMoney()
    {
        $data = $this->request->params([
            [ 'member_id', '' ],
            [ 'account_data', 0 ],
            [ 'memo', '' ],
        ]);
        $res = ( new MemberAccountService() )->adjustMoney($data);
        return success('ADD_SUCCESS', [ 'id' => $res ]);
    }

    /**
     * 会员佣金
     * @return Response
     */
    public function commission()
    {
        $data = $this->request->params([
            [ 'member_id', '' ],
            [ 'from_type', '' ],
            [ 'create_time', [] ],
        ]);
        $data[ 'account_type' ] = 'commission';
        return success(( new MemberAccountService() )->getPage($data));
    }

    /**
     * 会员余额统计（用于会员账户统计窗口）
     */
    public function sumBalance()
    {
        $data = $this->request->params([
            [ 'member_id', '' ],
        ]);
        $member_account_service = new MemberAccountService();
        if(empty($data['member_id']))
        {

            $balance_data = [
                MemberAccountEnum::BALANCE => $member_account_service->getSumAccount(MemberAccountEnum::BALANCE),
                MemberAccountEnum::MONEY => $member_account_service->getSumAccount(MemberAccountEnum::MONEY),
            ];
            return success($balance_data);
        }else{
            return success($member_account_service->getMemberAccountInfo($data['member_id']));
        }
    }

    /**
     * 账户变化类型
     * @param $account_type
     */
    public function changeType(string $account_type)
    {
        $res = ( new MemberAccountService() )->getFromType($account_type);
        return success($res);
    }

    /**
     * 账户类型
     */
    public function accountType()
    {
        return success(MemberAccountEnum::getType());
    }


}
