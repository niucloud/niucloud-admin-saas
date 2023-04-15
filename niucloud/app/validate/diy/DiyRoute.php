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

namespace app\validate\diy;

/**
 * 自定义路由表验证器
 * Class DiyRoute
 * @package app\validate\diy
 */
class DiyRoute extends \think\Validate
{

    protected $rule = [
        'title' => 'require',
        'name' => 'require',
        'page' => 'require',
        'sort' => 'number',
    ];

    protected $message = [];

    protected $scene = [
        "add" => [ 'title', 'name', 'page' ],
        "update" => [ 'title', 'name', 'page' ]
    ];

}