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
 * 自定义链接
 * Class PageEnum
 * @package app\enum\sys
 */
class LinkEnum
{
    /**
     * 获取页面类型
     * @return array
     */
    public static function getLink()
    {
        $system_links = [
            [
                'name' => 'SYSTEM_LINK',
                'title' => get_lang('enum_diy.system_link'),
                'url' => '',
                'child_list' => [
                    [
                        'name' => 'INDEX',
                        'title' => get_lang('enum_diy.system_link_index'),
                        'url' => '/pages/index/index',
                        'is_share' => 1
                    ],
                    [
                        'name' => 'ARTICLE_LIST',
                        'title' => get_lang('enum_diy.system_link_article_list'),
                        'url' => '/pages/article/list',
                        'is_share' => 1
                    ],
                ]
            ],
            [
                'name' => 'MEMBER_LINK',
                'title' => get_lang('enum_diy.member_link'),
                'child_list' => [
                    [
                        'name' => 'MEMBER_CENTER',
                        'title' => get_lang('enum_diy.member_index'),
                        'url' => '/pages/member/index',
                        'is_share' => 0
                    ],
                    [
                        'name' => 'MEMBER_PERSONAL',
                        'title' => get_lang('enum_diy.member_my_personal'),
                        'url' => '/pages/member/personal',
                        'is_share' => 0
                    ],
                    [
                        'name' => 'MEMBER_BALANCE',
                        'title' => get_lang('enum_diy.member_my_balance'),
                        'url' => '/pages/member/balance',
                        'is_share' => 0
                    ],
                    [
                        'name' => 'MEMBER_POINT',
                        'title' => get_lang('enum_diy.member_my_point'),
                        'url' => '/pages/member/point',
                        'is_share' => 0
                    ],
                    [
                        'name' => 'MEMBER_COMMISSION',
                        'title' => get_lang('enum_diy.member_my_commission'),
                        'url' => '/pages/member/commission',
                        'is_share' => 0
                    ]
                ]
            ],
            [
                'name' => 'DIY_PAGE',
                'title' => get_lang('enum_diy.diy_page'),
                'url' => '',
                'child_list' => []
            ],
            [
                'name' => 'DIY_LINK',
                'title' => get_lang('enum_diy.diy_link'),
                'url' => '',
                'child_list' => []
            ]
        ];
        return (new AddonLoader("UniappLink"))->load($system_links);;
    }

}