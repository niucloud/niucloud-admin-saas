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

use app\service\admin\BaseAdminService;
use app\service\admin\member\MemberService;
use app\service\admin\site\SiteService;
use app\service\admin\sys\SystemService;
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

            'today_data' => [
                'member_count' => 1,
                'order_money' => 1388.5,
                'visit_count' => 650,
                'total_member_count' => 0,
                'total_order_money' => 13851.12,
                'total_visit_count' => 6580,
            ],
            'system' => [],
            'version' => [],
            'visit_stat' => [
                'date' => [],
                'value' => [980,1323,882,762,865,923,1105]
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
        $data['today_data']['total_member_count'] = (new MemberService())->getCount();
        $data['system'] = (new SystemService())->getInfo();
        $data['version'] = $data['system']['version'] ?? [];
        $time = time();
        for ($i=1; $i<=7; $i++) $data['visit_stat']['date'][] = date('Y-m-d', strtotime( '+' . $i-7 .' days', $time));
        $man_count = (new MemberService())->getCount([ ['sex', '=', '1'] ]);
        $woman_count = (new MemberService())->getCount([ ['sex', '=', '2'] ]);
        $data['member_stat']['value'] = [$man_count, $woman_count, (int)($data['today_data']['total_member_count'] - $man_count - $woman_count)];
        $data['site_info'] = (new SiteService())->getInfo($this->site_id);

        return $data;
    }

    




}