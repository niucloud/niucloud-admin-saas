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

namespace app\dict\diy;

use core\dict\DictLoader;

/**
 * 页面模板
 * Class TemplateDict
 * @package app\dict\diy
 */
class TemplateDict
{

    public static function getTemplate($params = [])
    {
        $system_pages = [
            'DIY_INDEX' => [
                'title' => get_lang('dict_diy.page_index'),
                'page' => '/app/pages/index/index',
                'action' => 'decorate' // 页面是否装修标识，为空标识不装修，decorate：装修
            ],
            'DIY_MEMBER_INDEX' => [
                'title' => get_lang('dict_diy.page_member_index'),
                'page' => '/app/pages/member/index',
                'action' => 'decorate'
            ],
            'DIY_PAGE' => [
                'title' => get_lang('dict_diy.page_diy'),
                'page' => '/app/pages/index/diy',
                'action' => ''
            ]
        ];

        // 查询存在模板页面的应用插件列表
        if (!empty($params[ 'query' ]) && $params[ 'query' ] == 'addon') {
            $system = [
                'app' => [
                    'title' => '系统',
                    'key' => 'app',
                    'list' => $system_pages
                ]
            ];
            $addon = (new DictLoader("UniappTemplate"))->load($params);
            $app = array_merge($system, $addon);
            return $app;
        } else {
            // 查询应用插件下的模板页面数据
            $pages = (new DictLoader("UniappTemplate"))->load($system_pages);
            if (!empty($params[ 'type' ])) {
                $temp = [];
                foreach ($params[ 'type' ] as $k => $v) {
                    if (!empty($pages[ $v ])) {
                        $temp[ $v ] = $pages[ $v ];
                    }
                }
                return $temp;
            }

            if (!empty($params[ 'action' ])) {
                $temp = [];
                foreach ($pages as $k => $v) {
                    if (isset($v[ 'action' ]) && $params[ 'action' ] == $v[ 'action' ]) {
                        $temp[ $k ] = $v;
                    }

                }
                return $temp;
            }

            return $pages;

        }
    }

}
