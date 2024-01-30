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

namespace app\listener\system;


/**
 * 底部导航
 */
class BottomNavigationListener
{
    /**
     * @param array $params
     * @return array|void
     */
    public function handle($params = [])
    {
        $key = 'app';

        if (!empty($params) && $params[ 'key' ] != $key) return;

        $addon_info = [
            'title' => '系统',
        ];
        return [
            'key' => $key,
            'info' => $addon_info,
            'value' => [
                'backgroundColor' => '#ffffff',
                'textColor' => '#606266',
                'textHoverColor' => '#007aff',
                'type' => '1',
                'list' => [
                    [
                        "text" => "首页",
                        "link" => [
                            "parent" => "SYSTEM_LINK",
                            "name" => "INDEX",
                            "title" => "首页",
                            "url" => "/app/pages/index/index"
                        ],
                        "iconPath" => "static/resource/images/tabbar/index.png",
                        "iconSelectPath" => "static/resource/images/tabbar/index-selected.png"
                    ],
                    [
                        "text" => "我的",
                        "link" => [
                            "parent" => "MEMBER_LINK",
                            "name" => "MEMBER_CENTER",
                            "title" => "个人中心",
                            "url" => "/app/pages/member/index"
                        ],
                        "iconPath" => "static/resource/images/tabbar/my.png",
                        "iconSelectPath" => "static/resource/images/tabbar/my-selected.png"
                    ]
                ]
            ]
        ];
    }
}
