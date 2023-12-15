<?php

return [
    'DIY_INDEX' => [
        'hello_world_index' => [ // 页面标识
            "title" => "hello world 首页", // 页面名称
            'cover' => '', // 页面封面图
            'preview' => '', // 页面预览图
            'desc' => '', // 页面描述
            'mode' => 'diy', // 页面模式：diy：自定义，fixed：固定
            // 页面数据源
            "data" => [
                "global" => [
                    "title" => "hello world首页页面",
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
                    ]
                ]
            ]
        ]
    ]
];