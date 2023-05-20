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
use app\service\api\member\MemberAccountService;
use core\base\BaseApiController;
use think\Response;

/**
 * 会员账户
 * Class Account
 * @package app\api\controller\member
 */
class Account extends BaseApiController
{
    /**
     * 积分流水
     * @return Response
     */
    public function point(){
        $data = $this->request->params([
            ['from_type', '']
        ]);
        $data['account_type'] = MemberAccountEnum::POINT;
        return success((new MemberAccountService())->getPage($data));
    }

    /**
     * 余额流水
     * @return Response
     */
    public function balance(){
        $data = $this->request->params([
            ['from_type', '']
        ]);
        $data['account_type'] = MemberAccountEnum::BALANCE;
        return success((new MemberAccountService())->getPage($data));
    }

    /**
     * 零钱流水
     * @return Response
     */
    public function money(){
        $data = $this->request->params([
            ['from_type', '']
        ]);
        $data['account_type'] = MemberAccountEnum::MONEY;
        return success((new MemberAccountService())->getPage($data));
    }

    /**
     * 账户记录数量
     * @return Response
     */
    public function count(){
        $data = $this->request->params([
            ['from_type', ''],
            ['account_type', '']
        ]);
        return success(data:(new MemberAccountService())->getCount($data));
    }

    /**
     * 佣金流水
     * @return Response
     */
    public function commission(){
        $data = $this->request->params([
            ['from_type', '']
        ]);
        $data['account_type'] = MemberAccountEnum::COMMISSION;
        return success((new MemberAccountService())->getPage($data));
    }

    /**
     * 账户来源
     * @param $account_type
     * @return Response
     */
    public function getFromType($account_type){

        return success(MemberAccountEnum::getFromType($account_type));
    }

}
