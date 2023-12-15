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


namespace addon\hello_world\app\listener;

/**
 * 站点端布局
 */
class SiteLayout
{
    public function handle()
    {
        return [
            "name" => get_lang("dict_site_layout.hellow_world"),
            "key" => "hellow",
            "image" => "static/resource/images/system/layout-hellow.jpg",
            "sort" => 1
        ];
    }
}