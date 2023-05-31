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
 * 页面数据
 * Class TemplateDict
 * @package app\dict\diy
 */
class PagesDict
{

    /**
     * 获取页面数据
     * @param string $type
     * @return array|string|null
     */
    public static function getPages($type = '')
    {
        $system_pages = [
            'DIY_INDEX' => [
                'default_index' => [ // 页面标识
                    "title" => "首页", // 页面名称
                    'cover' => '', // 页面封面图
                    'preview' => '', // 页面预览图
                    'desc' => '', // 页面描述
                    // 页面数据源
                    "data" => [
                        "global" => [
                            "title" => "首页",
                            "pageBgColor" => "#F8F8F8",
                            'bgUrl' => '',
                            'imgWidth' => '',
                            'imgHeight' => '',
                            "bottomTabBarSwitch" => true,
                            "template" => [
                                'textColor' => "#303133",
                                "pageBgColor" => "",
                                "componentBgColor" => "",
                                "topRounded" => 0,
                                "bottomRounded" => 0,
                                "elementBgColor" => "",
                                "topElementRounded" => 0,
                                "bottomElementRounded" => 0,
                                "margin" => [
                                    "top" => 0,
                                    "bottom" => 0,
                                    "both" => 0
                                ]
                            ],
                            'topStatusBar' => [
                                'bgColor' => "#ffffff",
                                'isTransparent' => false,
                                'isShow' => true,
                                'style' => 'style-1',
                                'textColor' => "#333333",
                                'textAlign' => 'center',
                            ],
                            'popWindow' => [
                                'imgUrl' => "",
                                'imgWidth' => '',
                                'imgHeight' => '',
                                'count' => -1,
                                'show' => 0,
                                'link' => [
                                    'name' => ""
                                ],
                            ]
                        ],
                        "value" => [
                            [
                                "path" => "edit-image-ads",
                                "id" => "4640ld4k1pu0",
                                "componentName" => "ImageAds",
                                "componentTitle" => "图片广告",
                                "uses" => 0,
                                "list" => [
                                    [
                                        "link" => [
                                            "name" => ""
                                        ],
                                        "imageUrl" => "static/resource/images/diy/banner.png",
                                        "imgWidth" => 750,
                                        "imgHeight" => 320,
                                        "id" => "2xuytp7622w0"
                                    ]
                                ],
                                "ignore" => [],
                                "pageBgColor" => "",
                                "componentBgColor" => "",
                                "topRounded" => 0,
                                "bottomRounded" => 0,
                                "elementBgColor" => "",
                                "topElementRounded" => 0,
                                "bottomElementRounded" => 0,
                                "margin" => [
                                    "top" => 0,
                                    "bottom" => 0,
                                    "both" => 0
                                ]
                            ],
                            [
                                "path" => "edit-graphic-nav",
                                "id" => "282cpxba4534",
                                "componentName" => "GraphicNav",
                                "componentTitle" => "图文导航",
                                "uses" => 0,
                                "layout" => "horizontal",
                                "navTitle" => "",
                                "mode" => "graphic",
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
                                "ignore" => [],
                                "pageBgColor" => "",
                                "componentBgColor" => "rgba(255, 255, 255, 1)",
                                "topRounded" => 0,
                                "bottomRounded" => 0,
                                "elementBgColor" => "",
                                "topElementRounded" => 0,
                                "bottomElementRounded" => 0,
                                "margin" => [
                                    "top" => 0,
                                    "bottom" => 0,
                                    "both" => 0
                                ],
                                "list" => [
                                    [
                                        "title" => "文章资讯",
                                        "link" => [
                                            "parent" => "SYSTEM_LINK",
                                            "name" => "ARTICLE_LIST",
                                            "title" => "文章资讯",
                                            "url" => "/pages/article/list"
                                        ],
                                        "imageUrl" => "static/resource/images/diy/article_list.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "66rwqy8vxog0",
                                        "imgWidth" => 176,
                                        "imgHeight" => 176
                                    ],
                                    [
                                        "title" => "个人资料",
                                        "link" => [
                                            "parent" => "MEMBER_LINK",
                                            "name" => "MEMBER_PERSONAL",
                                            "title" => "个人资料",
                                            "url" => "/pages/member/personal"
                                        ],
                                        "imageUrl" => "static/resource/images/diy/my_personal.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "30cdezm3f6e0",
                                        "imgWidth" => 176,
                                        "imgHeight" => 176
                                    ],
                                    [
                                        "title" => "我的余额",
                                        "link" => [
                                            "parent" => "MEMBER_LINK",
                                            "name" => "MEMBER_BALANCE",
                                            "title" => "我的余额",
                                            "url" => "/pages/member/balance"
                                        ],
                                        "imageUrl" => "static/resource/images/diy/my_balance.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "20l5hypbzvfk",
                                        "imgWidth" => 176,
                                        "imgHeight" => 176
                                    ],
                                    [
                                        "title" => "我的积分",
                                        "link" => [
                                            "parent" => "MEMBER_LINK",
                                            "name" => "MEMBER_POINT",
                                            "title" => "我的积分",
                                            "url" => "/pages/member/point"
                                        ],
                                        "imageUrl" => "static/resource/images/diy/my_point.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "7bdb8wyt3g00",
                                        "imgWidth" => 176,
                                        "imgHeight" => 176
                                    ]
                                ]
                            ],
                            [
                                "path" => "edit-article",
                                "id" => "524jcssmp8c0",
                                "componentName" => "Article",
                                "componentTitle" => "文章",
                                "uses" => 0,
                                "sources" => "initial",
                                "count" => 8,
                                "articleIds" => [],
                                "ignore" => [],
                                "pageBgColor" => "",
                                "componentBgColor" => "rgba(255, 255, 255, 1)",
                                "topRounded" => 0,
                                "bottomRounded" => 0,
                                "elementBgColor" => "",
                                "topElementRounded" => 0,
                                "bottomElementRounded" => 0,
                                "margin" => [
                                    "top" => 0,
                                    "bottom" => 0,
                                    "both" => 0
                                ]
                            ]
                        ]
                    ]
                ]
            ],
            'DIY_MEMBER_INDEX' => [
                'default_member_index_one' => [
                    "title" => "个人中心（风格一）", // 页面名称
                    'cover' => '', // 页面封面图
                    'preview' => '', // 页面预览图
                    'desc' => '', // 页面描述
                    // 页面数据源
                    "data" => [
                        "global" => [
                            "title" => "个人中心（风格一）",
                            "pageBgColor" => "#F8F8F8",
                            'bgUrl' => '',
                            'imgWidth' => '',
                            'imgHeight' => '',
                            "bottomTabBarSwitch" => true,
                            "template" => [
                                'textColor' => "#303133",
                                "pageBgColor" => "",
                                "componentBgColor" => "",
                                "topRounded" => 0,
                                "bottomRounded" => 0,
                                "elementBgColor" => "",
                                "topElementRounded" => 0,
                                "bottomElementRounded" => 0,
                                "margin" => [
                                    "top" => 0,
                                    "bottom" => 0,
                                    "both" => 12
                                ]
                            ],
                            'topStatusBar' => [
                                'bgColor' => "#ffffff",
                                'isTransparent' => false,
                                'isShow' => true,
                                'style' => 'style-1',
                                'textColor' => "#333333",
                                'textAlign' => 'center',
                            ],
                            'popWindow' => [
                                'imgUrl' => "",
                                'imgWidth' => '',
                                'imgHeight' => '',
                                'count' => -1,
                                'show' => 0,
                                'link' => [
                                    'name' => ""
                                ],
                            ]
                        ],
                        "value" => [
                            [
                                "path" => "edit-member-info",
                                "id" => "67qv49qgxp00",
                                "componentName" => "MemberInfo",
                                "componentTitle" => "会员信息",
                                "uses" => 0,
                                "ignore" => [],
                                "pageBgColor" => "",
                                "componentBgColor" => "",
                                "topRounded" => 9,
                                "bottomRounded" => 9,
                                "elementBgColor" => "",
                                "topElementRounded" => 0,
                                "bottomElementRounded" => 0,
                                "margin" => [
                                    "top" => 12,
                                    "bottom" => 6,
                                    "both" => 16
                                ],
                                "textColor" => "#FFFFFF",
                                "bgUrl" => "static/resource/images/diy/member_style1_bg.png"
                            ],
                            [
                                "path" => "edit-graphic-nav",
                                "id" => "62b7d7hl4ok",
                                "componentName" => "GraphicNav",
                                "componentTitle" => "图文导航",
                                "uses" => 0,
                                "layout" => "horizontal",
                                "navTitle" => "我的服务",
                                "mode" => "graphic",
                                "showStyle" => "fixed",
                                "rowCount" => 4,
                                "pageCount" => 2,
                                "carousel" => [
                                    "type" => "circle",
                                    "color" => "#FFFFFF"
                                ],
                                "imageSize" => 25,
                                "aroundRadius" => 25,
                                "font" => [
                                    "size" => 12,
                                    "weight" => "bold",
                                    "color" => "#303133"
                                ],
                                "pageBgColor" => "",
                                "componentBgColor" => "rgba(255, 255, 255, 1)",
                                "topRounded" => 9,
                                "bottomRounded" => 9,
                                "elementBgColor" => "",
                                "topElementRounded" => 0,
                                "bottomElementRounded" => 0,
                                "margin" => [
                                    "top" => 6,
                                    "bottom" => 6,
                                    "both" => 16
                                ],
                                "ignore" => [],
                                "list" => [
                                    [
                                        "title" => "个人资料",
                                        "link" => [
                                            "parent" => "MEMBER_LINK",
                                            "name" => "MEMBER_PERSONAL",
                                            "title" => "个人资料",
                                            "url" => "/pages/member/personal"
                                        ],
                                        "imageUrl" => "static/resource/images/diy/horz_m_personal.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "xvlauaflc6o",
                                        "imgWidth" => 100,
                                        "imgHeight" => 100
                                    ],
                                    [
                                        "title" => "我的余额",
                                        "link" => [
                                            "parent" => "MEMBER_LINK",
                                            "name" => "MEMBER_BALANCE",
                                            "title" => "我的余额",
                                            "url" => "/pages/member/balance"
                                        ],
                                        "imageUrl" => "static/resource/images/diy/horz_m_balance.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "63bjscck5n40",
                                        "imgWidth" => 100,
                                        "imgHeight" => 100
                                    ],
                                    [
                                        "title" => "我的积分",
                                        "link" => [
                                            "parent" => "MEMBER_LINK",
                                            "name" => "MEMBER_POINT",
                                            "title" => "我的积分",
                                            "url" => "/pages/member/point"
                                        ],
                                        "imageUrl" => "static/resource/images/diy/horz_m_point.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "4qiczw54t8g0",
                                        "imgWidth" => 100,
                                        "imgHeight" => 100
                                    ],
                                    [
                                        "title" => "联系客服",
                                        "link" => [
                                            "name" => ""
                                        ],
                                        "imageUrl" => "static/resource/images/diy/horz_m_service.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "2eqwfkdphpgk",
                                        "imgWidth" => 100,
                                        "imgHeight" => 100
                                    ]
                                ]
                            ],
                            [
                                "path" => "edit-graphic-nav",
                                "uses" => 0,
                                "id" => "33yn28534fs0",
                                "componentName" => "GraphicNav",
                                "componentTitle" => "图文导航",
                                "ignore" => [],
                                "layout" => "vertical",
                                "navTitle" => "",
                                "mode" => "graphic",
                                "showStyle" => "fixed",
                                "rowCount" => 4,
                                "pageCount" => 2,
                                "carousel" => [
                                    "type" => "circle",
                                    "color" => "#FFFFFF"
                                ],
                                "imageSize" => 25,
                                "aroundRadius" => 25,
                                "font" => [
                                    "size" => 13,
                                    "weight" => "normal",
                                    "color" => "rgba(0, 0, 0, 1)"
                                ],
                                "list" => [
                                    [
                                        "title" => "个人资料",
                                        "link" => [
                                            "name" => ""
                                        ],
                                        "imageUrl" => "static/resource/images/diy/vert_m_personal.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "4xc4kw9xlqu0",
                                        "imgWidth" => 88,
                                        "imgHeight" => 88
                                    ],
                                    [
                                        "title" => "我的余额",
                                        "link" => [
                                            "name" => ""
                                        ],
                                        "imageUrl" => "static/resource/images/diy/vert_m_balance.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "4555rq0cc1q0",
                                        "imgWidth" => 88,
                                        "imgHeight" => 88
                                    ],
                                    [
                                        "title" => "我的积分",
                                        "link" => [
                                            "name" => ""
                                        ],
                                        "imageUrl" => "static/resource/images/diy/vert_m_point.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "1gq3uxox0fk0",
                                        "imgWidth" => 88,
                                        "imgHeight" => 88
                                    ],
                                    [
                                        "title" => "联系客服",
                                        "link" => [
                                            "name" => ""
                                        ],
                                        "imageUrl" => "static/resource/images/diy/vert_m_service.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "6gqbh1tvyr00",
                                        "imgWidth" => 88,
                                        "imgHeight" => 88
                                    ],
                                    [
                                        "id" => "6xhwid2el5c0",
                                        "title" => "开发者联盟",
                                        "imageUrl" => "static/resource/images/diy/vert_m_develop.png",
                                        "imgWidth" => 88,
                                        "imgHeight" => 88,
                                        "link" => [
                                            "name" => ""
                                        ],
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ]
                                    ]
                                ],
                                "pageBgColor" => "",
                                "componentBgColor" => "rgba(255, 255, 255, 1)",
                                "topRounded" => 9,
                                "bottomRounded" => 9,
                                "elementBgColor" => "",
                                "topElementRounded" => 0,
                                "bottomElementRounded" => 0,
                                "margin" => [
                                    "top" => 6,
                                    "bottom" => 12,
                                    "both" => 16
                                ]
                            ]
                        ]
                    ]
                ],
                'default_member_index_two' => [
                    "title" => "个人中心（风格二）", // 页面名称
                    'cover' => '', // 页面封面图
                    'preview' => '', // 页面预览图
                    'desc' => '', // 页面描述
                    // 页面数据源
                    "data" => [
                        "global" => [
                            "title" => "个人中心（风格二）",
                            "pageBgColor" => "#F8F8F8",
                            "bgUrl" => "static/resource/images/diy/member_style2_bg.png",
                            'imgWidth' => 750,
                            'imgHeight' => 403,
                            "bottomTabBarSwitch" => true,
                            "template" => [
                                'textColor' => "#303133",
                                "pageBgColor" => "",
                                "componentBgColor" => "",
                                "topRounded" => 0,
                                "bottomRounded" => 0,
                                "elementBgColor" => "",
                                "topElementRounded" => 0,
                                "bottomElementRounded" => 0,
                                "margin" => [
                                    "top" => 0,
                                    "bottom" => 0,
                                    "both" => 12
                                ]
                            ],
                            'topStatusBar' => [
                                'bgColor' => "#ffffff",
                                'isTransparent' => false,
                                'isShow' => true,
                                'style' => 'style-1',
                                'textColor' => "#333333",
                                'textAlign' => 'center',
                            ],
                            'popWindow' => [
                                'imgUrl' => "",
                                'imgWidth' => '',
                                'imgHeight' => '',
                                'count' => -1,
                                'show' => 0,
                                'link' => [
                                    'name' => ""
                                ],
                            ]
                        ],
                        "value" => [
                            [
                                "path" => "edit-member-info",
                                "id" => "67qv49qgxp00",
                                "componentName" => "MemberInfo",
                                "componentTitle" => "会员信息",
                                "uses" => 0,
                                "ignore" => [],
                                "pageBgColor" => "",
                                "componentBgColor" => "",
                                "topRounded" => 0,
                                "bottomRounded" => 0,
                                "elementBgColor" => "",
                                "topElementRounded" => 0,
                                "bottomElementRounded" => 0,
                                "margin" => [
                                    "top" => 0,
                                    "bottom" => 0,
                                    "both" => 0
                                ],
                                "textColor" => "#FFFFFF",
                                "bgUrl" => ""
                            ],
                            [
                                "path" => "edit-graphic-nav",
                                "id" => "62b7d7hl4ok",
                                "componentName" => "GraphicNav",
                                "componentTitle" => "图文导航",
                                "uses" => 0,
                                "layout" => "horizontal",
                                "navTitle" => "我的服务",
                                "mode" => "graphic",
                                "showStyle" => "fixed",
                                "rowCount" => 4,
                                "pageCount" => 2,
                                "carousel" => [
                                    "type" => "circle",
                                    "color" => "#FFFFFF"
                                ],
                                "imageSize" => 25,
                                "aroundRadius" => 25,
                                "font" => [
                                    "size" => 12,
                                    "weight" => "bold",
                                    "color" => "#303133"
                                ],
                                "pageBgColor" => "",
                                "componentBgColor" => "rgba(255, 255, 255, 1)",
                                "topRounded" => 9,
                                "bottomRounded" => 9,
                                "elementBgColor" => "",
                                "topElementRounded" => 0,
                                "bottomElementRounded" => 0,
                                "margin" => [
                                    "top" => 0,
                                    "bottom" => 6,
                                    "both" => 16
                                ],
                                "ignore" => [],
                                "list" => [
                                    [
                                        "title" => "个人资料",
                                        "link" => [
                                            "parent" => "MEMBER_LINK",
                                            "name" => "MEMBER_PERSONAL",
                                            "title" => "个人资料",
                                            "url" => "/pages/member/personal"
                                        ],
                                        "imageUrl" => "static/resource/images/diy/horz_m_personal.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "xvlauaflc6o",
                                        "imgWidth" => 100,
                                        "imgHeight" => 100
                                    ],
                                    [
                                        "title" => "我的余额",
                                        "link" => [
                                            "parent" => "MEMBER_LINK",
                                            "name" => "MEMBER_BALANCE",
                                            "title" => "我的余额",
                                            "url" => "/pages/member/balance"
                                        ],
                                        "imageUrl" => "static/resource/images/diy/horz_m_balance.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "63bjscck5n40",
                                        "imgWidth" => 100,
                                        "imgHeight" => 100
                                    ],
                                    [
                                        "title" => "我的积分",
                                        "link" => [
                                            "parent" => "MEMBER_LINK",
                                            "name" => "MEMBER_POINT",
                                            "title" => "我的积分",
                                            "url" => "/pages/member/point"
                                        ],
                                        "imageUrl" => "static/resource/images/diy/horz_m_point.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "4qiczw54t8g0",
                                        "imgWidth" => 100,
                                        "imgHeight" => 100
                                    ],
                                    [
                                        "title" => "联系客服",
                                        "link" => [
                                            "name" => ""
                                        ],
                                        "imageUrl" => "static/resource/images/diy/horz_m_service.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "2eqwfkdphpgk",
                                        "imgWidth" => 100,
                                        "imgHeight" => 100
                                    ]
                                ]
                            ],
                            [
                                "path" => "edit-graphic-nav",
                                "uses" => 0,
                                "id" => "33yn28534fs0",
                                "componentName" => "GraphicNav",
                                "componentTitle" => "图文导航",
                                "ignore" => [],
                                "layout" => "vertical",
                                "navTitle" => "",
                                "mode" => "graphic",
                                "showStyle" => "fixed",
                                "rowCount" => 4,
                                "pageCount" => 2,
                                "carousel" => [
                                    "type" => "circle",
                                    "color" => "#FFFFFF"
                                ],
                                "imageSize" => 25,
                                "aroundRadius" => 25,
                                "font" => [
                                    "size" => 13,
                                    "weight" => "normal",
                                    "color" => "rgba(0, 0, 0, 1)"
                                ],
                                "list" => [
                                    [
                                        "title" => "个人资料",
                                        "link" => [
                                            "name" => ""
                                        ],
                                        "imageUrl" => "static/resource/images/diy/vert_m_personal.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "4xc4kw9xlqu0",
                                        "imgWidth" => 88,
                                        "imgHeight" => 88
                                    ],
                                    [
                                        "title" => "我的余额",
                                        "link" => [
                                            "name" => ""
                                        ],
                                        "imageUrl" => "static/resource/images/diy/vert_m_balance.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "4555rq0cc1q0",
                                        "imgWidth" => 88,
                                        "imgHeight" => 88
                                    ],
                                    [
                                        "title" => "我的积分",
                                        "link" => [
                                            "name" => ""
                                        ],
                                        "imageUrl" => "static/resource/images/diy/vert_m_point.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "1gq3uxox0fk0",
                                        "imgWidth" => 88,
                                        "imgHeight" => 88
                                    ],
                                    [
                                        "title" => "联系客服",
                                        "link" => [
                                            "name" => ""
                                        ],
                                        "imageUrl" => "static/resource/images/diy/vert_m_service.png",
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ],
                                        "id" => "6gqbh1tvyr00",
                                        "imgWidth" => 88,
                                        "imgHeight" => 88
                                    ],
                                    [
                                        "id" => "777g7jxbtfc0",
                                        "title" => "开发者联盟",
                                        "imageUrl" => "static/resource/images/diy/vert_m_develop.png",
                                        "imgWidth" => 96,
                                        "imgHeight" => 96,
                                        "link" => [
                                            "name" => ""
                                        ],
                                        "label" => [
                                            "control" => false,
                                            "text" => "热门",
                                            "textColor" => "#FFFFFF",
                                            "bgColorStart" => "#F83287",
                                            "bgColorEnd" => "#FE3423"
                                        ]
                                    ]
                                ],
                                "pageBgColor" => "",
                                "componentBgColor" => "rgba(255, 255, 255, 1)",
                                "topRounded" => 9,
                                "bottomRounded" => 9,
                                "elementBgColor" => "",
                                "topElementRounded" => 0,
                                "bottomElementRounded" => 0,
                                "margin" => [
                                    "top" => 6,
                                    "bottom" => 12,
                                    "both" => 16
                                ]
                            ]

                        ]
                    ]
                ]
            ]
        ];
        $pages = ( new DictLoader("UniappPages") )->load($system_pages);
        if (empty($type)) {
            return $pages;
        }
        return $pages[ $type ] ?? '';
    }

}