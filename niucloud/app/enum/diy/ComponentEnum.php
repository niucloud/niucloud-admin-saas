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
 * 基础组件
 * Class Page
 * @package app\enum\sys
 */
class ComponentEnum
{

    /**
     * 获取页面类型
     * @return array
     */
    public static function getComponent()
    {
        $system_components = [
            'BASICS' => [
                'title' => get_lang('enum_diy.component_type_basics'),
                'list' => [
                    'Text' => [
                        'title' => '标题',
                        'icon' => 'iconfont-iconbiaoti',
                        'path' => 'edit-text', // 编辑组件属性
                        'support_page' => [], // 支持页面
                        'max_count' => 0, // 最大添加数量
                        'sort' => 10001,
                        'value' => [
                            "style" => "style-1",
                            "styleName" => "风格1",
                            "text" => "标题栏",
                            "link" => [
                                "name" => ""
                            ],
                            "textColor" => "#303133",
                            "fontSize" => 16,
                            "fontWeight" => "normal",
                            "textAlign" => "left",
                            "subTitle" => [
                                "text" => "副标题",
                                "color" => "#999999",
                                "fontSize" => 14,
                                "control" => false,
                                "fontWeight" => "normal"
                            ],
                            "more" => [
                                "text" => "查看更多",
                                "control" => false,
                                "isShow" => true,
                                "link" => [
                                    "name" => ""
                                ],
                                "color" => "#999999"
                            ]
                        ]
                    ],
                    'ImageAds' => [
                        'title' => '图片广告',
                        'icon' => 'iconfont-icontupianguanggao1',
                        'path' => 'edit-image-ads', // 编辑组件属性
                        'support_page' => [], // 支持页面
                        'max_count' => 0, // 最大添加数量
                        'sort' => 10002,
                        'value' => [
                            "list" => [
                                [
                                    "link" => [
                                        "name" => ""
                                    ],
                                    "imageUrl" => "",
                                    "imgWidth" => 0,
                                    "imgHeight" => 0
                                ]
                            ]
                        ]
                    ],
                    'GraphicNav' => [
                        'title' => '图文导航',
                        'icon' => 'iconfont-icontuwendaohang2',
                        'path' => 'edit-graphic-nav',
                        'support_page' => [],
                        'max_count' => 0,
                        'sort' => 10003,
                        'value' => [
                            "layout" => "horizontal",
                            "navTitle" => "",
                            "mode" => "graphic",
                            "type" => "img",
                            "showStyle" => "fixed",
                            "rowCount" => 4,
                            "pageCount" => 2,
                            "carousel" => [
                                "type" => "circle",
                                "color" => "#FFFFFF"
                            ],
                            "imageSize" => 40,
                            "aroundRadius" => 25,
                            "font" => [
                                "size" => 14,
                                "weight" => "normal",
                                "color" => "#303133"
                            ],
                            "list" => [
                                [
                                    "title" => "",
                                    "link" => [
                                        "name" => ""
                                    ],
                                    "imageUrl" => "",
                                    "label" => [
                                        "control" => false,
                                        "text" => "热门",
                                        "textColor" => "#FFFFFF",
                                        "bgColorStart" => "#F83287",
                                        "bgColorEnd" => "#FE3423"
                                    ]
                                ],
                                [
                                    "title" => "",
                                    "link" => [
                                        "name" => ""
                                    ],
                                    "imageUrl" => "",
                                    "label" => [
                                        "control" => false,
                                        "text" => "热门",
                                        "textColor" => "#FFFFFF",
                                        "bgColorStart" => "#F83287",
                                        "bgColorEnd" => "#FE3423"
                                    ]
                                ],
                                [
                                    "title" => "",
                                    "link" => [
                                        "name" => ""
                                    ],
                                    "imageUrl" => "",
                                    "label" => [
                                        "control" => false,
                                        "text" => "热门",
                                        "textColor" => "#FFFFFF",
                                        "bgColorStart" => "#F83287",
                                        "bgColorEnd" => "#FE3423"
                                    ]
                                ],
                                [
                                    "title" => "",
                                    "link" => [
                                        "name" => ""
                                    ],
                                    "imageUrl" => "",
                                    "label" => [
                                        "control" => false,
                                        "text" => "热门",
                                        "textColor" => "#FFFFFF",
                                        "bgColorStart" => "#F83287",
                                        "bgColorEnd" => "#FE3423"
                                    ]
                                ]
                            ],
                        ]
                    ],
                    'Article' => [
                        'title' => '文章',
                        'icon' => 'iconfont-iconwenzhang',
                        'path' => 'edit-article',
                        'support_page' => [],
                        'max_count' => 0,
                        'sort' => 10004,
                        'value' => [
                            'sources' => 'initial',
                            'count' => 8,
                            'articleIds' => []
                        ],
                    ],
                    'HorzBlank' => [
                        'title' => '辅助空白',
                        'icon' => 'iconfont-iconfuzhukongbai1',
                        'path' => 'edit-horz-blank',
                        'support_page' => [],
                        'max_count' => 0,
                        'sort' => 10005,
                        'value' => [
                            'height' => 20
                        ],
                    ],
                    'MemberInfo' => [
                        'title' => '会员信息',
                        'icon' => 'iconfont-iconhuiyuanzhongxin',
                        'path' => 'edit-member-info',
                        'support_page' => [ 'DIY_MEMBER_INDEX' ],
                        'max_count' => 0,
                        'sort' => 10006,
                        'value' => [
                            'height' => 20
                        ],
                    ],
                ],
            ],
        ];
        return (new AddonLoader("UniappComponent"))->load($system_components);
    }

}