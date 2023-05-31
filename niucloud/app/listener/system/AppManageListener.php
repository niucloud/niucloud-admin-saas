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
                    "name" => get_lang('dict_app_manage.system_app'),
                    "sort" => 10
                ]
            ],
            [
                "addon" => "",
                "title" => get_lang('dict_app_manage.message_manage'),
                "category" => "basic",
                "desc" => get_lang('dict_app_manage.message_manage'),
                "icon" => "static/resource/images/app/message_icon.png",
                "cover" => "static/resource/images/app/message_cover.png",
                "url" => "/setting/notice/template"
            ],
            [
                "addon" => "",
                "title" => get_lang('dict_app_manage.member_recharge'),
                "category" => "basic",
                "desc" => get_lang('dict_app_manage.member_recharge'),
                "icon" => "static/resource/images/app/recharge_icon.png",
                "cover" => "static/resource/images/app/recharge_cover.png",
                "url" => "/finance/recharge"
            ],
        ];
        return $data;
    }
}