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

    /**
     * 获取页面模板
     * @param string $type
     * @return array|string
     */
    public static function getTemplate($type = '')
    {
        $system_pages = [
            'DIY_INDEX' => [
                'title' => get_lang('dict_diy.page_index'),
                'page' => 'pages/index/index',
            ],
            'DIY_MEMBER_INDEX' => [
                'title' => get_lang('dict_diy.page_member_index'),
                'page' => 'pages/member/index',
            ],
            'DIY_PAGE' => [
                'title' => get_lang('dict_diy.page_diy'),
                'page' => 'pages/index/diy',
            ]
        ];
        $pages = (new DictLoader("UniappTemplate"))->load($system_pages);
        if (empty($type)) {
            return $pages;
        }
        return $pages[ $type ] ?? '';
    }

}