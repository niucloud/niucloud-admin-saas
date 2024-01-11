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

namespace app\listener\site;


use app\service\admin\diy\DiyService;

/**
 * 添加站点成功后事件
 * Class AddSiteAfterListener
 * @package app\listener\site
 */
class AddSiteAfterListener
{
    /**
     * 初始化站点
     * @param $data
     */
    public function handle($params = [])
    {
        if (count($params['main_app']) > 1) {
            $site_id = $params['site_id'];
            request()->siteId($site_id);

            $diy_service = new DiyService();

            // 设置 商城 首页 模板
            $index_flag = 'DIY_INDEX';
            $index_template_name = 'default_index';
            $index_template = $diy_service->getPageData($index_flag, $index_template_name);

            $diy_service->add([
                "title" => $index_template[ 'title' ],
                "name" => "DIY_INDEX",
                "type" => "DIY_INDEX",
                "template" => $index_template_name,
                "mode" => 'diy',
                "value" => json_encode($index_template['data']),
                "is_default" => 1,
                "is_change" => 0
            ]);
            // 设置 商城 个人中心 模板
            $member_index_flag = 'DIY_MEMBER_INDEX';
            $member_index_template_name = 'default_member_index_one';
            $member_index_template = $diy_service->getPageData($member_index_flag, $member_index_template_name);

            $diy_service->add([
                "title" => $member_index_template[ 'title' ],
                "name" => "DIY_MEMBER_INDEX",
                "type" => "DIY_MEMBER_INDEX",
                "template" => $member_index_template_name,
                "mode" => 'diy',
                "value" => json_encode($member_index_template['data']),
                "is_default" => 1,
                "is_change" => 0
            ]);
        }
    }
}
