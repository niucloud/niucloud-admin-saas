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

namespace app\enum\diy;

use core\addon\AddonLoader;

/**
 * 自定义页面类型
 * Class PageEnum
 * @package app\enum\sys
 */
class PageEnum
{

    /**
     * 获取页面类型
     * @param string $type
     * @return array|string
     */
    public static function getPageType($type = '')
    {
        $system_pages = [
            'DIY_INDEX' => [
                'title' => get_lang('enum_diy.page_index'),
                'page' => 'pages/index/index',
            ],
            'DIY_MEMBER_INDEX' => [
                'title' => get_lang('enum_diy.page_member_index'),
                'page' => 'pages/member/index',
            ],
            'DIY_PAGE' => [
                'title' => get_lang('enum_diy.page_diy'),
                'page' => 'pages/index/diy',
            ]
        ];
        $pages = (new AddonLoader("UniappPages"))->load($system_pages);
        if (empty($type)) {
            return $pages;
        }
        return $pages[ $type ] ?? '';
    }

}