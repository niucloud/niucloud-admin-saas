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

use think\Validate;

/**
 * 自定义页面验证器
 * Class Diy
 * @package app\validate\diy
 */
class Diy extends Validate
{

    protected $rule = [
        'title' => 'require',
        'name' => 'require',
        'type' => 'require',
        'value' => 'require',
        'is_default' => 'number|between:0,1',
    ];

    protected $message = [];

    protected $scene = [
        "add" => ['title', 'name', 'type', 'value', 'is_default'],
        "edit" => ['title', 'name', 'value', 'is_default'],
    ];

}