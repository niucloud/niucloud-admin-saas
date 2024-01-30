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
    public static function getLink($params = [])
    {
        $system_links = [
            'SYSTEM_LINK' => [
                'title' => get_lang('dict_diy.system_link'),
                'addon_info' => [
                    'title' => '系统',
                    'key' => 'app'
                ],
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
                'title' => get_lang('dict_diy.member_link'),
                'addon_info' => [
                    'title' => '系统',
                    'key' => 'app'
                ],
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
                'title' => get_lang('dict_diy.diy_page'),
                'addon_info' => [
                    'title' => '系统',
                    'key' => 'app'
                ],
                'child_list' => []
            ],
            'DIY_LINK' => [
                'title' => get_lang('dict_diy.diy_link'),
                'addon_info' => [
                    'title' => '系统',
                    'key' => 'app'
                ],
                'child_list' => []
            ]
        ];

        // 查询存在页面路由的应用插件列表
        if (!empty($params[ 'query' ]) && $params[ 'query' ] == 'addon') {
            $system = [
                'app' => [
                    'title' => '系统',
                    'key' => 'app'
                ]
            ];
            $addons = (new DictLoader("UniappLink"))->load([], $params);
            $app = array_merge($system, $addons);
            return $app;
        } else {
            return (new DictLoader("UniappLink"))->load($system_links, $params);
        }
    }

}