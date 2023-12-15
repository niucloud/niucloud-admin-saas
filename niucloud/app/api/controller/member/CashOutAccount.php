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

use app\service\api\member\MemberCashOutAccountService;
use core\base\BaseApiController;
use think\Response;

class CashOutAccount extends BaseApiController
{
    /**
     * 提现账户列表
     * @return Response
     */
    public function lists(){
        $data = $this->request->params([
            ['account_type', '']
        ]);
        return success((new MemberCashOutAccountService())->getPage($data));
    }

    /**
     * 提现账户信息
     * @param int $account_id
     * @return Response
     */
    public function info(int $account_id){
        return success((new MemberCashOutAccountService())->getInfo($account_id));
    }

    /**
     * 查询首条提现账户按账户类型
     * @return Response
     */
    public function firstInfo(){
        $data = $this->request->params([
            ['account_type', '']
        ]);
        return success((new MemberCashOutAccountService())->getFirstInfo($data));
    }

    /**
     * 添加提现账号
     * @return Response
     */
    public function add(){
        $data = $this->request->params([
            ['account_type', ''],
            ['bank_name', ''],
            ['realname', ''],
            ['account_no', '']
        ]);
        $this->validate($data, 'app\validate\member\CashOutAccount.addOrEdit');
        $id = (new MemberCashOutAccountService())->add($data);
        return success('ADD_SUCCESS', [ 'id' => $id ]);
    }

    /**
     * 编辑提现账号
     * @param int $account_id
     * @return Response
     */
    public function edit(int $account_id){
        $data = $this->request->params([
            ['account_type', ''],
            ['bank_name', ''],
            ['realname', ''],
            ['account_no', '']
        ]);
        $this->validate($data, 'app\validate\member\CashOutAccount.addOrEdit');
        (new MemberCashOutAccountService())->edit($account_id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 删除提现账号
     * @param int $account_id
     * @return Response
     */
    public function del(int $account_id){
        (new MemberCashOutAccountService())->del($account_id);
        return success('DELETE_SUCCESS');
    }
}