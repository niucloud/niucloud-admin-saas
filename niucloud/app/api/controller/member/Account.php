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
use app\service\api\member\MemberAccountService;
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
        ]);
        $data[] = ['account_type', '=', 'point'];
        return success((new MemberAccountService())->getPage($data));
    }

    /**
     * 余额流水
     * @return Response
     */
    public function balance(){
        $data = $this->request->params([
        ]);
        $data[] = ['account_type', '=', 'balance'];
        return success((new MemberAccountService())->getPage($data));
    }


}
