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

use app\model\order\Order;
use app\service\admin\member\MemberService;
use app\service\admin\site\SiteService;
use app\service\admin\sys\SystemService;
use app\service\core\member\CoreMemberService;
use Carbon\Carbon;
use core\base\BaseAdminService;
use think\facade\Db;


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

            'today_data' => [
                'member_count' => 1,
                'order_money' => 1388.5,
                'visit_count' => 650,
                'total_member_count' => 0,
                'total_order_money' => 13851.12,
                'total_visit_count' => 6580,
                'total_order_count' => 29
            ],
            'system' => [],
            'version' => [],
            'visit_stat' => [
                'date' => [],
                'value' => []
            ],
            'member_stat' => [
                'type' => ['男','女','未知'],
                'value' => []
            ],
            'site_info' => '',
            'about' => [
                [
                    'name' => 'Niucloud官方公众号',
                    'image' => 'static/resource/icon/index_icon/wx_qrcode.jpg',
                    'desc' => '微信扫码关注'
                ],
                [
                    'name' => '添加企业微信群',
                    'image' => 'static/resource/icon/index_icon/wework_qrcode.png',
                    'desc' => '更多内容请扫码加入'
                ]
            ]
        ];
        $data['today_data']['total_member_count'] = (new MemberService())->getCount([['create_time', '>=', Carbon::today()->timestamp]]);
        $data['today_data']['total_order_money'] = $this->orderMoney(Carbon::today()->timestamp, time());
        $data['today_data']['total_order_count'] = $this->orderCount(Carbon::today()->timestamp, time());
        $data['today_data']['total_visit_count'] = (new MemberService())->getCount([['last_visit_time', '>=', Carbon::today()->timestamp]]);
        $data['today_data']['today_member_visit_count'] = (new CoreMemberService())->getCount(['site_id' => $this->site_id,'last_visit_time' => get_start_and_end_time_by_day()]);

        $data['total_data']['total_member_count'] = (new MemberService())->getCount();
        $data['total_data']['total_order_money'] = number_format($this->orderMoney(0, time()), 2);
        $data['total_data']['total_order_count'] = $this->orderCount(0, time());
        $data['total_data']['total_visit_count'] = (new MemberService())->getCount();

        $data['system'] = (new SystemService())->getInfo();
        $data['version'] = $data['system']['version'] ?? [];
        $time = time();
        for ($i=1; $i<=7; $i++){
            $time_data = date('Y-m-d', strtotime( '+' . $i-7 .' days', $time));
            $data['visit_stat']['date'][] = $time_data;
            $time_arr = get_start_and_end_time_by_day($time_data);
            $data['visit_stat']['value'][] = (new MemberService())->getCount([[ '', 'exp', Db::raw('(`create_time` >= ' . $time_arr[0] . ')  and (`create_time` < ' . $time_arr[1] . ')') ]]);
        }
        $member_count = (new MemberService())->getCount();
        $man_count = (new MemberService())->getCount([ ['sex', '=', '1'] ]);
        $woman_count = (new MemberService())->getCount([ ['sex', '=', '2'] ]);
        $data['member_stat']['value'] = [$man_count, $woman_count, (int)($member_count - $man_count - $woman_count)];
        $data['site_info'] = (new SiteService())->getInfo($this->site_id);

        return $data;
    }

    /**
     * 订单金额
     * @param $start_time
     * @param $end_time
     */
    public function orderMoney($start_time, $end_time)
    {
        $where[] = [
            ['site_id', '=', $this->site_id],
            ['order_status', '>', 0],
            ['create_time', 'between', [$start_time, $end_time]]
        ];
        $money = (new Order())->where($where)->sum('order_money');
        return $money;
    }

      /**
     * 订单数量
     * @param $start_time
     * @param $end_time
     */
    public function orderCount($start_time, $end_time)
    {
        $where[] = [
            ['site_id', '=', $this->site_id],
            ['order_status', '>', 0],
            ['create_time', 'between', [$start_time, $end_time]]
        ];
        $money = (new Order())->where($where)->count('order_id');
        return $money;
    }






}