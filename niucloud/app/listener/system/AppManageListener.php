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

namespace app\listener\system;

/**
 * 应用信息
 * Class AppInit
 * @package app\listener\system
 */
class AppManageListener
{
    public function handle()
    {
        $data = [
            "category" =>[

                [
                    "key" => "basic",
                    "name" => "系统应用"
                ]
            ],
            [
                "addon" => "",
                "title" => "消息管理",
                "category" => "basic",
                "desc" => "消息管理",
                "icon" => "static/resource/images/app/message_icon.png",
                "cover" => "static/resource/images/app/message_cover.png",
                "url" => "/setting/message/template"
            ],
            [
                "addon" => "",
                "title" => "会员充值",
                "category" => "basic",
                "desc" => "会员充值",
                "icon" => "static/resource/images/app/recharge_icon.png",
                "cover" => "static/resource/images/app/recharge_cover.png",
                "url" => "/finance/recharge"
            ],
        ];
        return $data;
    }
}