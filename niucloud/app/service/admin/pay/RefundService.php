<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\service\admin\pay;

use app\dict\pay\PayDict;
use app\model\pay\Pay;
use app\model\pay\Refund;
use app\service\core\pay\CoreRefundService;
use app\service\core\paytype\CoreOfflineService;
use core\base\BaseAdminService;

/**
 * 退款服务层
 */
class RefundService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Refund();
    }

    /**
     * 退款账户记录
     * @param array $where
     * @return mixed
     */
    public function getPage(array $where){
        $field = 'id,refund_no,out_trade_no,type,channel,money,reason,status,create_time,refund_time,close_time,fail_reason,voucher,trade_type,trade_id,refund_type,main_type,main_id';
        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ 'create_time', 'out_trade_no', 'refund_no', 'status' ], $where)->field($field)->append([ 'type_name', 'status_name' ])->order('create_time desc');
        return $this->pageQuery($search_model);
    }

    /**
     * 获取退款详情
     * @param string $refund_no
     * @return array
     */
    public function getDetail(string $refund_no){
        $field = 'id,refund_no,out_trade_no,type,channel,money,reason,status,create_time,refund_time,close_time,fail_reason,voucher,trade_type,trade_id,refund_type,main_type,main_id';
        return $this->model->where([ ['refund_no', '=', $refund_no ], [ 'site_id', '=', $this->site_id ] ])
            ->field($field)
            ->append([ 'type_name', 'status_name', 'refund_type_name' ])
            ->findOrEmpty()
            ->toArray();
    }

    /**
     * 支付审核通过
     * @param array $data
     * @return bool
     */
    public function refund(array $data) {
        return (new CoreRefundService())->refund($this->site_id, $data['refund_no'], $data['voucher'], $data['refund_type'], PayDict::USER, $this->uid);
    }

}
