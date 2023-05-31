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
 * 自定义链接
 * Class LinkDict
 * @package app\dict\diy
 */
class LinkDict
{
    /**
     * 获取链接
     * @return array
     */
    public static function getLink()
    {
        $system_links = [
            'SYSTEM_LINK' => [
                'title' => get_lang('dict_diy.system_link'),
                'child_list' => [
                    [
                        'name' => 'INDEX',
                        'title' => get_lang('dict_diy.system_link_index'),
                        'url' => '/pages/index/index',
                        'is_share' => 1
                    ],
                    [
                        'name' => 'ARTICLE_LIST',
                        'title' => get_lang('dict_diy.system_link_article_list'),
                        'url' => '/pages/article/list',
                        'is_share' => 1
                    ],
                ]
            ],
            'MEMBER_LINK' => [
                'title' => get_lang('dict_diy.member_link'),
                'child_list' => [
                    [
                        'name' => 'MEMBER_CENTER',
                        'title' => get_lang('dict_diy.member_index'),
                        'url' => '/pages/member/index',
                        'is_share' => 0
                    ],
                    [
                        'name' => 'MEMBER_PERSONAL',
                        'title' => get_lang('dict_diy.member_my_personal'),
                        'url' => '/pages/member/personal',
                        'is_share' => 0
                    ],
                    [
                        'name' => 'MEMBER_BALANCE',
                        'title' => get_lang('dict_diy.member_my_balance'),
                        'url' => '/pages/member/balance',
                        'is_share' => 0
                    ],
                    [
                        'name' => 'MEMBER_POINT',
                        'title' => get_lang('dict_diy.member_my_point'),
                        'url' => '/pages/member/point',
                        'is_share' => 0
                    ],
                    [
                        'name' => 'MEMBER_COMMISSION',
                        'title' => get_lang('dict_diy.member_my_commission'),
                        'url' => '/pages/member/commission',
                        'is_share' => 0
                    ]
                ]
            ],
            'DIY_PAGE' => [
                'title' => get_lang('dict_diy.diy_page'),
                'child_list' => []
            ],
            'DIY_LINK' => [
                'title' => get_lang('dict_diy.diy_link'),
                'child_list' => []
            ]
        ];
        return ( new DictLoader("UniappLink") )->load($system_links);
    }

}