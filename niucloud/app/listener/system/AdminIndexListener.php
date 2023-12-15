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
 * 平台首页加载事件
 * Class AdminIndexListenerIndex
 * @package app\listener\system
 */
class AdminIndexListener
{
    public function handle()
    {
        return [
            [
                "name" => get_lang("dict_admin_index.system"),
                "view_path" => "index/index"
            ]
        ];
    }
}