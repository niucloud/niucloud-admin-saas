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

use app\dict\member\MemberAccountTypeDict;
use app\service\admin\member\MemberAccountService;
use app\service\admin\member\MemberService;
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
            ['member_id', ''],
            ['from_type', ''],
            ['create_time', []],
            ['keywords', ''],
        ]);
        $data['account_type'] = 'point';
        return success((new MemberAccountService())->getPage($data));
    }

    /**
     * 会员积分统计（用于会员积分统计窗口）
     */
    public function sumPoint()
    {
        $data = $this->request->params([
            ['member_id', ''],
        ]);
        $member_account_service = new MemberAccountService();
        $member_service = new MemberService();

        if (empty($data['member_id'])) {
            $commission_data = [
                'point_get' => $member_service->getSum('point_get'),//累计
                'point_use' => abs($member_account_service->getExpensesSumAccount(MemberAccountTypeDict::POINT)),
            ];
            return success($commission_data);
        } else {
            $info = $member_account_service->getMemberAccountInfo($data['member_id']);
            $commission_data = [
                'point_get' => $info['point_get'],
                'point_use' => abs($member_account_service->getExpensesSumAccount(MemberAccountTypeDict::POINT, $data['member_id'])),
            ];
            return success($commission_data);
        }
    }

    /**
     * 余额流水
     * @return Response
     */
    public function balance()
    {
        $data = $this->request->params([
            ['member_id', ''],
            ['from_type', ''],
            ['create_time', []],
            ['keywords', ''],
        ]);
        $data['account_type'] = 'balance';
        return success((new MemberAccountService())->getPage($data));
    }

    /**
     * 可提现余额流水
     * @return Response
     */
    public function money()
    {
        $data = $this->request->params([
            ['member_id', ''],
            ['from_type', ''],
            ['create_time', []],
            ['keywords', ''],
        ]);
        $data['account_type'] = 'money';
        return success((new MemberAccountService())->getPage($data));
    }

    /**
     * 积分账户调整
     */
    public function adjustPoint()
    {
        $data = $this->request->params([
            ['member_id', ''],
            ['account_data', 0],
            ['memo', ''],
        ]);
        $res = (new MemberAccountService())->adjustPoint($data);
        return success('SUCCESS', ['id' => $res]);
    }

    /**
     * 余额账户调整
     */
    public function adjustBalance()
    {
        $data = $this->request->params([
            ['member_id', ''],
            ['account_data', 0],
            ['memo', ''],
        ]);
        $res = (new MemberAccountService())->adjustBalance($data);
        return success('SUCCESS', ['id' => $res]);
    }

    /**
     * 零钱调整
     * @return Response
     */
    public function adjustMoney()
    {
        $data = $this->request->params([
            ['member_id', ''],
            ['account_data', 0],
            ['memo', ''],
        ]);
        $res = (new MemberAccountService())->adjustMoney($data);
        return success('SUCCESS', ['id' => $res]);
    }

    /**
     * 会员佣金
     * @return Response
     */
    public function commission()
    {
        $data = $this->request->params([
            ['member_id', ''],
            ['from_type', ''],
            ['create_time', []],
            ['keywords', ''],
        ]);
        $data['account_type'] = 'commission';
        return success((new MemberAccountService())->getPage($data));
    }

    /**
     * 会员佣金统计（用于会员账户统计窗口）
     */
    public function sumCommission()
    {
        $data = $this->request->params([
            ['member_id', ''],
        ]);
        $member_account_service = new MemberAccountService();
        $member_service = new MemberService();

        if (empty($data['member_id'])) {
            $commission_data = [
                'total_commission' => $member_service->getSum('commission_get'),//累计
                'commission' => $member_service->getSum('commission'),//未提现
                'withdrawn_commission' => $member_account_service->getWithdrawnCommission(),//已提现
                'commission_cash_outing' => $member_service->getSum('commission_cash_outing'),//提现中
            ];
            return success($commission_data);
        } else {
            $info = $member_account_service->getMemberAccountInfo($data['member_id']);
            $commission_data = [
                'commission' => $info['commission'],
                'commission_cash_outing' => $info['commission_cash_outing'],
                'withdrawn_commission' => $member_account_service->getWithdrawnCommission($data['member_id']),//已提现
                'total_commission' => $info['commission_get'],
            ];
            return success($commission_data);
        }
    }

    /**
     * 会员余额统计（用于会员账户统计窗口）
     */
    public function sumBalance()
    {
        $data = $this->request->params([
            ['member_id', ''],
        ]);
        $member_account_service = new MemberAccountService();
        if (empty($data['member_id'])) {

            $balance_data = [
                MemberAccountTypeDict::BALANCE => number_format($member_account_service->getSumAccount(MemberAccountTypeDict::BALANCE), 2),
                MemberAccountTypeDict::MONEY => number_format($member_account_service->getSumAccount(MemberAccountTypeDict::MONEY), 2),
            ];
            return success($balance_data);
        } else {
            return success($member_account_service->getMemberAccountInfo($data['member_id']));
        }
    }

    /**
     * 账户变化类型
     * @param string $account_type
     * @return Response
     */
    public function changeType(string $account_type)
    {
        $res = (new MemberAccountService())->getFromType($account_type);
        return success($res);
    }

    /**
     * 账户类型
     */
    public function accountType()
    {
        return success(MemberAccountTypeDict::getType());
    }


}
