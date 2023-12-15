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

use app\service\admin\site\SiteGroupService;
use app\service\admin\site\SiteService;
use app\service\admin\sys\SystemService;
use app\service\core\addon\CoreAddonService;
use app\service\core\member\CoreMemberService;
use core\base\BaseAdminService;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;


/**
 * 统计服务层
 * Class StatService
 * @package app\service\admin\stat
 */
class StatService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 获取统计数据
     * @return int[]
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getIndexData()
    {
        $data = [
            'today_data' => [
                'member_count' => 1,
                'site_count' => 2,
                'visit_count' => 675,
                'total_member_count' => 0,
                'total_site_count' => 0,
                'total_visit_count' => 6840,
            ],
            'system' => [],
            'version' => [],
//            'visit_stat' => [
//                'date' => [],
//                'value' => [980, 1323, 882, 762, 865, 923, 1105]
//            ],
            'site_stat' => [
                'date' => [],
                'value' => []
            ],
            'member_stat' => [
                'type' => ['男', '女', '未知'],
                'value' => []
            ],
            'site_group_stat' => [
                'type' => [],
                'value' => []
            ],
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

        $day_start_time = strtotime(date('Y-m-d'));
        //当天结束之间
        $day_end_time = $day_start_time + 86400;
        $data['today_data']['total_member_count'] = (new CoreMemberService())->getCount();
        $data['today_data']['today_member_count'] = (new CoreMemberService())->getCount(['create_time' => get_start_and_end_time_by_day()]);
        $data['today_data']['total_site_count'] = (new SiteService())->getCount();
        $data['today_data']['today_site_count'] = (new SiteService())->getCount(['create_time' => [$day_start_time, $day_end_time]]);
        $data['today_data']['norma_site_count'] = (new SiteService())->getCount(['status' => [1],'app_type' => ['site']]);
        $data['today_data']['expire_site_count'] = (new SiteService())->getCount(['status' => [2]]);

        $data['system'] = (new SystemService())->getInfo();
        $data['version'] = $data['system']['version'] ?? [];
        $time = time();
        for ($i = 1; $i <= 7; $i++){
            $item_day = date('Y-m-d', strtotime('+' . $i - 7 . ' days', $time));
            $data['site_stat']['date'][] = $item_day;
            $data['site_stat']['value'][] = (new SiteService())->getCount(['create_time' => get_start_and_end_time_by_day($item_day)]);
        }
        $man_count = (new CoreMemberService())->getCount(['sex' => '1']);
        $woman_count = (new CoreMemberService())->getCount(['sex' => '2']);
        $data['member_stat']['value'] = [$man_count, $woman_count, (int)($data['today_data']['total_member_count'] - $man_count - $woman_count)];

        $site_group_list = (new SiteGroupService())->getAll();

        if(!empty($site_group_list)){
            foreach($site_group_list as $v){
                $data['site_group_stat']['type'][] = $v['group_name'];
                $data['site_group_stat']['value'][] = (new SiteService())->getCount(['group_id' => $v['group_id']]);
            }
        }
        $app_count = (new CoreAddonService())->getLocalAddonCount();
        $app_installed_count = (new CoreAddonService())->getCount();
        $app = [
            'app_count' => $app_count,
            'app_no_installed_count' => $app_count-$app_installed_count,
            'app_installed_count' => $app_installed_count,
        ];
        $data['app'] = $app;
        return $data;
    }


}