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

namespace app\validate\sys;

use app\dict\sys\FileDict;
use think\Validate;

/**
 * 组  验证类
 * Class AttachmentCategory
 * @package app\validate\sys
 */
class AttachmentCategory extends Validate
{

    protected $rule = [
        'name' => 'require',
        'type' => 'require|checkMenuType'
    ];

    protected $message = [
        'name.require' => 'validate_attachment.name_require',

    ];

    protected $scene = [
        'add' => ['name', 'type'],
        'edit' => ['name'],
    ];

    /**
     * 自定义验证 菜单类型
     * @param $value
     * @param $rule
     * @param array $data
     * @return bool|string
     */
    protected function checkMenuType($value, $rule, $data = [])
    {
        return isset(FileDict::getType()[$value]) ? true : get_lang("validate_attachment.not_exit_type");
    }


}