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

namespace app\adminapi\controller\pay;

use app\dict\pay\PayDict;
use app\service\admin\pay\PayService;
use core\base\BaseAdminController;

class Pay extends BaseAdminController
{
    /**
     * 待审核支付记录
     * @param array $where
     * @return mixed
     */
    public function audit(){
        $data = $this->request->params([
            ['create_time', []],
            ['out_trade_no', ''],
            ['status', '']
        ]);
        return success(data: (new PayService())->getAuditPage($data));
    }

    /**
     * 查询详情
     * @param string $out_trade_no
     * @return \think\Response
     */
    public function detail(int $id){
        return success(data: (new PayService())->getDetail($id));
    }

    /**
     * 支付审核通过
     * @param string $out_trade_no
     * @return \think\Response
     */
    public function pass(string $out_trade_no){
        return success(data: (new PayService())->pass($out_trade_no));
    }

    /**
     * 审核拒绝
     * @param string $out_trade_no
     */
    public function refuse(string $out_trade_no){
        $reason = input('reason', '');
        return success(data: (new PayService())->refuse($out_trade_no, $reason));
    }
}