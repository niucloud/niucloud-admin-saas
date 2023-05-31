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

use app\dict\diy\TemplateDict;

/**
 * 自定义页面验证器
 * Class Diy
 * @package app\validate\diy
 */
class Diy extends \think\Validate
{

    protected $rule = [
        'title' => 'require',
        'name' => 'require',
        'type' => 'checkType',
        'value' => 'require',
        'is_default' => 'number|between:0,1',
    ];

    protected $message = [];

    protected $scene = [
        "add" => [ 'title', 'name', 'type', 'value', 'is_default' ],
        "edit" => [ 'title', 'name', 'value', 'is_default' ],
    ];

    /**
     * 自定义验证 性别
     * @param $value
     * @param $rule
     * @param array $data
     * @return bool|string
     */
    protected function checkType($value, $rule, $data = [])
    {
        return isset(TemplateDict::getTemplate()[ $value ]) ? true : get_lang("validate_diy.type_not_exist");
    }

}