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
 * 自定义链接
 * Class LinkDict
 * @package app\dict\diy
 */
class LinkDict
{
    public static function getLink()
    {
        $system_links = [
            'SYSTEM_LINK' => [
                'key' => '',
                'addon_title' => get_lang('dict_diy.system_title'),
                'title' => get_lang('dict_diy.system_link'),
                'child_list' => [
                    [
                        'name' => 'INDEX',
                        'title' => get_lang('dict_diy.system_link_index'),
                        'url' => '/app/pages/index/index',
                        'is_share' => 1,
                        'action' => 'decorate' // 默认空，decorate 表示支持装修
                    ],
                ]
            ],
            'MEMBER_LINK' => [
                'key' => '',
                'addon_title' => get_lang('dict_diy.system_title'),
                'title' => get_lang('dict_diy.member_link'),
                'child_list' => [
                    [
                        'name' => 'MEMBER_CENTER',
                        'title' => get_lang('dict_diy.member_index'),
                        'url' => '/app/pages/member/index',
                        'is_share' => 1,
                        'action' => 'decorate'
                    ],
                    [
                        'name' => 'MEMBER_PERSONAL',
                        'title' => get_lang('dict_diy.member_my_personal'),
                        'url' => '/app/pages/member/personal',
                        'is_share' => 1,
                        'action' => ''
                    ],
                    [
                        'name' => 'MEMBER_BALANCE',
                        'title' => get_lang('dict_diy.member_my_balance'),
                        'url' => '/app/pages/member/balance',
                        'is_share' => 1,
                        'action' => ''
                    ],
                    [
                        'name' => 'MEMBER_POINT',
                        'title' => get_lang('dict_diy.member_my_point'),
                        'url' => '/app/pages/member/point',
                        'is_share' => 1,
                        'action' => ''
                    ],
                    [
                        'name' => 'MEMBER_COMMISSION',
                        'title' => get_lang('dict_diy.member_my_commission'),
                        'url' => '/app/pages/member/commission',
                        'is_share' => 1,
                        'action' => ''
                    ],
                    [
                        'name' => 'MEMBER_ADDRESS',
                        'title' => get_lang('dict_diy.member_my_address'),
                        'url' => '/app/pages/member/address',
                        'is_share' => 1,
                        'action' => ''
                    ]
                ]
            ],
            'DIY_PAGE' => [
                'key' => '',
                'addon_title' => '',
                'title' => get_lang('dict_diy.diy_page'),
                'child_list' => []
            ],
            'DIY_LINK' => [
                'key' => '',
                'addon_title' => '',
                'title' => get_lang('dict_diy.diy_link'),
                'child_list' => []
            ]
        ];
        return ( new DictLoader("UniappLink") )->load($system_links);
    }

}