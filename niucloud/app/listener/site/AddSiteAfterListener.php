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


use app\dict\diy\TemplateDict;
use app\service\admin\diy\DiyRouteService;
use app\service\admin\diy\DiyService;

/**
 * 添加站点成功后事件
 */
class AddSiteAfterListener
{
    /**
     * 初始化站点
     * @param array $params
     */
    public function handle($params = [])
    {
        $site_id = $params[ 'site_id' ];
        request()->siteId($site_id);

        $count = count($params[ 'main_app' ]);
        $addon = array_merge([ '' ], $params[ 'main_app' ]);

        foreach ($addon as $k => $v) {
            if ($count > 1) {
                // 站点多应用，使用系统的页面
                if ($k == 0) {
                    $is_start = 1;
                } else {
                    $is_start = 0;
                }
            } else {
                // 站点单应用，将应用的设为使用中
                if ($k == 0) {
                    $is_start = 0;
                } else {
                    $is_start = 1;
                }
            }

            // 设置 首页 默认模板
            $this->setDiyData([
                'key' => 'DIY_INDEX',
                'type' => 'index',
                'addon' => $v,
                'is_start' => $is_start,
                'site_id' => $site_id
            ]);

            // 设置 个人中心 默认模板
            $this->setDiyData([
                'key' => 'DIY_MEMBER_INDEX',
                'type' => 'member_index',
                'addon' => $v,
                'is_start' => $is_start,
                'site_id' => $site_id
            ]);
        }

    }

    /**
     * 设置 首页/个人中心 的第一个模板 设置为启动页
     * @param $params
     */
    private function setDiyData($params)
    {
        $addon = $params[ 'addon' ] ?? '';
        $addon_flag = $params[ 'key' ];

        // 默认
        $default_template = TemplateDict::getTemplate([
            'key' => [ $params[ 'key' ] ]
        ]);

        $addon_template_info = array_shift($default_template);

        // 查询插件定义的页面类型
        $addon_template = TemplateDict::getTemplate([
            'type' => $params[ 'type' ],
            'addon' => $addon
        ]);

        if (!empty($addon_template)) {
            $addon_flag = array_keys($addon_template)[ 0 ];
            $addon_template_info = array_shift($addon_template);
        }

        $diy_service = new DiyService();
        $addon_index_template = $diy_service->getFirstPageData($addon_flag, $addon);

        if (!empty($addon_index_template)) {

            $diy_service->add([
                "title" => $addon_index_template[ 'title' ],
                "name" => $addon_flag,
                "type" => $addon_flag,
                "template" => $addon_index_template[ 'template' ],
                "mode" => $addon_index_template[ 'mode' ],
                "value" => json_encode($addon_index_template[ 'data' ]),
                "is_default" => 1,
                "is_change" => 0
            ]);

            $diy_page_list = $diy_service->getList([
                [ 'site_id', '=', $params[ 'site_id' ] ],
                [ 'type', '=', $params[ 'key' ] ]
            ], 'id,name,type');

            // 多应用时，将首页和个人中心设为系统的
            foreach ($diy_page_list as $k => $v) {
                if ($v[ 'name' ] == $params[ 'key' ]) {
                    $diy_service->setUse($v[ 'id' ]);
                    break;
                }
            }

            if ($params[ 'is_start' ] == 1) {
                // 查询链接，设置启动页
                $other_page = (new DiyRouteService())->getList([ 'url' => $addon_template_info[ 'page' ], 'addon' => $addon ]);
                if (!empty($other_page)) {

                    $diy_service->changeTemplate([
                        'type' => $params[ 'key' ], // 页面类型
                        'name' => $other_page[ 0 ][ 'name' ], // 链接名称标识
                        'parent' => $other_page[ 0 ][ 'parent' ], // 链接父级名称标识
                        'page' => $other_page[ 0 ][ 'page' ], // 链接路由
                        'title' => $other_page[ 0 ][ 'title' ], // 链接标题
                        'action' => $other_page[ 0 ][ 'action' ] // 是否存在操作，decorate 表示支持装修
                    ]);

                }

            }

        }
    }
}
