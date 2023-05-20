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
 * 应用管理
 * Class AppManage
 * @package app\listener\hello_world
 */
class AppManageListener
{
    /**
     * 应用管理
     * @param $data
     */
    public function handle()
    {
        $data = [
            "category" => [
                //插件如果要单独分类展示，需要专门定义
                [
                    "key" => "hello_world_category",
                    "name" => "第三方应用",
                ],
            ],
            [
                "addon" => "hello_world",
                "title" => "hello world",
                "category" => "hello_world_category",  //设置插件对应展示分类，默认basic
                "desc" => "hello world 应用展示",
                "icon" => addon_resource("hello_world", "icon.png"),  //图标
                "cover" => "",  //封面
                "url" => "/hello_world"
            ],
        ];
        return $data;
    }
}