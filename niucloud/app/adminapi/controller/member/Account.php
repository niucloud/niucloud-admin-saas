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
use app\service\admin\member\MemberAccountService;
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
     * 零钱流水
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
        return success(100011, [ 'id' => $res ]);
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
        return success(100011, [ 'id' => $res ]);
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


}
