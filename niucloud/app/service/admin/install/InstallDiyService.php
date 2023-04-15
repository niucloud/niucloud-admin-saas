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

namespace app\service\admin\install;

use app\enum\diy\LinkEnum;
use app\model\diy\Diy;
use app\model\diy\DiyRoute;
use app\service\admin\BaseAdminService;

/**
 * 系统安装
 * Class InstallDiyService
 * @package app\service\admin\install
 */
class InstallDiyService extends BaseAdminService
{

    /**
     * 安装
     */
    public function install(array $params = [])
    {
        $this->installDiy($params);
        return true;
    }

    /**
     * 安装自定义数据
     */
    public function installDiy(array $params = [])
    {
        $link = LinkEnum::getLink();

        $diy_route_list = [];
        $sort = 0;
        foreach ($link as $k => $v) {
            if (!empty($v[ 'child_list' ])) {
                foreach ($v[ 'child_list' ] as $ck => $cv) {
                    if (!empty($cv[ 'url' ])) {
                        $diy_route_list[] = [
                            'title' => $cv[ 'title' ],
                            'name' => $cv[ 'name' ],
                            'page' => $cv[ 'url' ],
                            'is_share' => $cv[ 'is_share' ],
                            'sort' => $sort
                        ];
                        $sort++;
                    }
                }
            }
        }

        $diy_route = new DiyRoute();
//        $diy_route->where([ [ 'id', '>', 0 ] ])->delete();
        $diy_route->replace()->insertAll($diy_route_list);

        $diy = new Diy();

        $page_data = [
            [
                "site_id" => $params[ 'site_id' ],
                "title" => "首页",
                "name" => "DIY_INDEX",
                "type" => "DIY_INDEX",
                'is_default' => 1,
                'create_time' => time(),
                'update_time' => time(),
                "value" => json_encode([
                    "global" => [
                        "title" => "首页",
                        "pageBgColor" => "#F8F8F8",
                        "tabbarSwitch" => true
                    ],
                    "value" => [
                        [
                            "path" => "edit-image-ads",
                            "id" => "4640ld4k1pu0",
                            "componentName" => "ImageAds",
                            "componentTitle" => "图片广告",
                            "maxCount" => 0,
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
                            ]
                        ],
                        [
                            "path" => "edit-graphic-nav",
                            "id" => "282cpxba4534",
                            "componentName" => "GraphicNav",
                            "componentTitle" => "图文导航",
                            "maxCount" => 0,
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
                            "maxCount" => 0,
                            "sources" => "initial",
                            "count" => 8,
                            "articleIds" => []
                        ]
                    ]
                ])
            ],
            [
                "site_id" => $params[ 'site_id' ],
                "title" => "个人中心",
                "name" => "DIY_MEMBER_INDEX",
                "type" => "DIY_MEMBER_INDEX",
                'is_default' => 1,
                'create_time' => time(),
                'update_time' => time(),
                "value" => json_encode([
                    "global" => [
                        "title" => "个人中心",
                        "pageBgColor" => "#F8F8F8",
                        "tabbarSwitch" => true
                    ],
                    "value" => [
                        [
                            "path" => "edit-member-info",
                            "id" => "67qv49qgxp00",
                            "componentName" => "MemberInfo",
                            "componentTitle" => "会员信息",
                            "maxCount" => 0,
                            "height" => 20
                        ],
                        [
                            "path" => "edit-horz-blank",
                            "id" => "39dehg9v8u00",
                            "componentName" => "HorzBlank",
                            "componentTitle" => "辅助空白",
                            "maxCount" => 0,
                            "height" => 20
                        ],
                        [
                            "path" => "edit-graphic-nav",
                            "id" => "62b7d7hl4ok",
                            "componentName" => "GraphicNav",
                            "componentTitle" => "图文导航",
                            "maxCount" => 0,
                            "layout" => "vertical",
                            "navTitle" => "我的服务",
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
                            "list" => [
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
                                    "id" => "xvlauaflc6o",
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
                                    "id" => "63bjscck5n40",
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
                                    "id" => "4qiczw54t8g0",
                                    "imgWidth" => 176,
                                    "imgHeight" => 176
                                ],
                                [
                                    "title" => "联系客服",
                                    "link" => [
                                        "name" => ""
                                    ],
                                    "imageUrl" => "static/resource/images/diy/my_service.png",
                                    "label" => [
                                        "control" => false,
                                        "text" => "热门",
                                        "textColor" => "#FFFFFF",
                                        "bgColorStart" => "#F83287",
                                        "bgColorEnd" => "#FE3423"
                                    ],
                                    "id" => "2eqwfkdphpgk",
                                    "imgWidth" => 176,
                                    "imgHeight" => 176
                                ]
                            ]
                        ]
                    ]
                ])
            ]
        ];
//        $diy->where([ [ 'name', 'in', [ 'DIY_INDEX', 'DIY_MEMBER_INDEX' ] ] ])->update([ 'is_default' => 0 ]);
        $diy->insertAll($page_data);
        return true;
    }

}