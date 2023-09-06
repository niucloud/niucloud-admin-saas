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
                'page' => 'pages/index/index',
                'action' => 'decorate' // 页面是否装修标识，为空标识不装修，decorate：装修
            ],
            'DIY_MEMBER_INDEX' => [
                'title' => get_lang('dict_diy.page_member_index'),
                'page' => 'pages/member/index',
                'action' => 'decorate'
            ],
            'DIY_PAGE' => [
                'title' => get_lang('dict_diy.page_diy'),
                'page' => 'pages/index/diy',
                'action' => ''
            ]
        ];

        $pages = (new DictLoader("UniappTemplate"))->load($system_pages);

        if (!empty($params['type']) && !empty($pages[$params['type']])) {
            return [$params['type'] => $pages[$params['type']]];
        }

        if (!empty($params['action'])) {
            $temp = [];
            foreach ($pages as $k => $v) {
                if (isset($v['action']) && $params['action'] == $v['action']) {
                    $temp[$k] = $v;
                }

            }
            return $temp;
        }

        return $pages;
    }

}