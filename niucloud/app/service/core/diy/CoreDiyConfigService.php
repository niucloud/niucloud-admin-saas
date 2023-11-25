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

namespace app\service\core\diy;

use app\dict\sys\ConfigKeyDict;
use app\model\sys\SysConfig;
use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;
use think\Model;

/**
 * 自定义配置相关
 * Class CoreDiyConfigService
 * @package app\service\core\diy
 */
class  CoreDiyConfigService extends BaseCoreService
{
    /**
     * 获取底部导航
     * @param int $site_id
     * @return array
     */
    public function getBottomConfig(int $site_id)
    {
        $info = ( new CoreConfigService() )->getConfig($site_id, ConfigKeyDict::DIY_BOTTOM)[ 'value' ] ?? [];
        if (empty($info)) {

            $info = [
                'backgroundColor' => '#ffffff',
                'textColor' => '#606266',
                'textHoverColor' => '#007aff',
                'type' => 1,
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
                        "text" => "会员",
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
            ];
        }
        return $info;
    }

    /**
     * 配置底部导航
     * @param int $site_id
     * @param array $data
     * @return SysConfig|bool|Model
     */
    public function setBottomConfig(int $site_id, array $data)
    {
        return ( new CoreConfigService() )->setConfig($site_id, ConfigKeyDict::DIY_BOTTOM, $data);
    }

}
