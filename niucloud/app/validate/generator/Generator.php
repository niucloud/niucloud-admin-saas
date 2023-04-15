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

namespace app\validate\generator;


use think\Validate;

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2023-01-07
 * Time: 18:08
 */
class Generator extends Validate
{

    protected $rule = [
        'table_name' => 'require|max:64',
        'table_content' => 'require|max:64',
    ];

    protected $message = [
        'table_name.require' => 'validate_generator.table_name_require',
        'table_name.max' => 'validate_generator.table_name_max',
        'table_content.require' => 'validate_generator.table_content_require',
        'table_content.max' => 'validate_generator.table_content_max',
    ];

    protected $scene = [
        'add' => ['table_name'],
        "update" => ['table_name','table_content','class_name', 'module_name', 'table_column'],
        "create" => ['id'],
    ];
}