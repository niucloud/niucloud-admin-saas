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

namespace app\service\admin\stat;

use app\model\order\RechargeOrder;
use app\service\admin\site\SiteService;
use core\base\BaseAdminService;
use think\db\exception\DbException;


/**
 * 站点统计服务层
 * Class StatService
 * @package app\service\admin\stat
 */
class SiteStatService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 获取站点统计数据
     * @return int[]
     */
    public function getIndexData(){
        $data = [
            'site_info' => '',

        ];
        $data['site_info'] = (new SiteService())->getInfo($this->site_id);
        $site_create_time = strtotime($data['site_info']['create_time']);
        $site_expire_time = strtotime($data['site_info']['expire_time']);
        $data['site_info']['mix'] = (number_format((time() - $site_create_time) / ($site_expire_time - $site_create_time), 2) * 100).'%';
        $data['site_info']['over_date'] = $site_expire_time - time() > 0 ? number_format(($site_expire_time - time())/ 86400, 2) : 0;

        return $data;
    }

    /**
     * 订单金额
     * @param $start_time
     * @param $end_time
     * @return float
     */
    public function orderMoney($start_time, $end_time)
    {
        $where[] = [
            ['site_id', '=', $this->site_id],
            ['order_status', '>', 0],
            ['create_time', 'between', [$start_time, $end_time]]
        ];
        return (new RechargeOrder())->where($where)->sum('order_money');
    }

    /**
     * 订单数量
     * @param $start_time
     * @param $end_time
     * @return int
     * @throws DbException
     */
    public function orderCount($start_time, $end_time)
    {
        $where[] = [
            ['site_id', '=', $this->site_id],
            ['order_status', '>', 0],
            ['create_time', 'between', [$start_time, $end_time]]
        ];
        return (new RechargeOrder())->where($where)->count('order_id');
    }






}