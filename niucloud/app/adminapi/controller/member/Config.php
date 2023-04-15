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
use app\service\admin\member\MemberConfigService;
use think\Response;

class Config extends BaseAdminController
{
    /**
     * 获取登录设置
     * @return Response
     */
    public function getLoginConfig()
    {
        return success(( new MemberConfigService() )->getLoginConfig());
    }

    /**
     * 注册与登录设置
     * @return Response
     */
    public function setLoginConfig()
    {
        $data = $this->request->params([
            [ 'is_username', 1 ],
            [ 'is_mobile', 0 ],
            [ 'is_auth_register', 1 ],
            [ 'is_bind_mobile', 0 ],
        ]);
        $this->validate($data, 'app\validate\member\LoginConfig.set');
        ( new MemberConfigService() )->setLoginConfig($data);
        return success(100004);
    }

    /**
     * 获取提现设置
     * @return Response
     */
    public function getWithdrawConfig()
    {
        return success(( new MemberConfigService() )->getWithdrawConfig());
    }

    /**
     * 提现设置
     * @return Response
     */
    public function setWithdrawConfig()
    {
        $data = $this->request->params([
            [ 'is_open', 0 ], //是否开启
            [ 'min', 0.01 ], //最低提现金额
            [ 'rate', 0 ], //提现手续费比率
            [ 'is_auto_verify', 0 ], //是否自动审核
            [ 'is_auto_transfer', 0 ], //是否自动转账
            [ 'transfer_type', [] ]  //转账方式
        ]);
        $this->validate($data, 'app\validate\member\WithdrawConfig.set');
        ( new MemberConfigService() )->setWithdrawConfig($data);
        return success(100016);
    }

}
