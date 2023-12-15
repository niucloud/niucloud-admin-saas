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

namespace app\service\admin\pay;

use app\dict\pay\PayDict;
use app\model\pay\Pay;
use app\service\core\paytype\CoreOfflineService;
use core\base\BaseAdminService;

/**
 * 支付服务层
 */
class PayService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Pay();
    }

    /**
     * 待审核支付记录
     * @param array $where
     * @return mixed
     */
    public function getAuditPage(array $where){
        $field = 'id, out_trade_no, type, money, body, voucher, create_time, trade_id, trade_type, status';
        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ], ['type', '=', PayDict::OFFLINEPAY] ])->withSearch([ 'create_time', 'out_trade_no', 'status' ], $where)->field($field)->append([ 'type_name' ])->order('create_time desc');
        return $this->pageQuery($search_model);
    }

    /**
     * 获取交易详情
     * @param int $id
     * @return void
     */
    public function getDetail(int $id){
        $field = 'id,out_trade_no,trade_type,trade_id,trade_no,body,money,voucher,status,create_time,pay_time,cancel_time,type,channel,fail_reason';
        return $this->model->where([ [ 'site_id', '=', $this->site_id ], ['id', '=', $id ] ])
            ->field($field)
            ->append([ 'type_name', 'channel_name', 'status_name' ])
            ->findOrEmpty()
            ->toArray();
    }

    /**
     * 支付审核通过
     * @param string $out_trade_no
     * @return null
     */
    public function pass(string $out_trade_no) {
        return (new CoreOfflineService())->pass($this->site_id, $out_trade_no);
    }

    /**
     * 支付审核未通过
     * @param string $out_trade_no
     * @param string $reason
     * @return void
     */
    public function refuse(string $out_trade_no, string $reason) {
        return (new CoreOfflineService())->refuse($this->site_id, $out_trade_no, $reason);
    }

    /**
     * 统计支付数据
     * @param $where
     * @return int
     * @throws \think\db\exception\DbException
     */
    public function payCount($where)
    {
        return $this->model->where($where)->count();
    }
}
