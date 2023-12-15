<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\validate\addon;

use app\dict\addon\AddonDict;
use think\Validate;

/**
 * 开发插件
 */
class AddonDevelop extends Validate
{


    protected $rule = [
        'key' => 'require|regex:/^[a-zA-Z][a-zA-Z0-9_]{0,19}$/',
        'type' => 'require|checkType',
    ];

    protected $message = [
        'key.require' => 'validate_addon.key_require',
        'key.regex' => 'validate_addon.key_regex',
        'type.require' => 'validate_addon.type_require',
    ];

    protected $scene = [
        "add" => ['key', 'type'],
        "edit" => ['type']
    ];

    protected function checkType($value, $rule, $data = [])
    {
        return (!empty($value) && isset(AddonDict::getType()[$value])) ? true : get_lang("validate_addon.not_exit_type");
    }
}
