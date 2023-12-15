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

namespace app\validate\member;

use think\facade\Lang;
use think\Validate;

/**
 * 会员设置验证
 * Class LoginConfig
 * @package app\validate\member
 */
class MemberConfig extends Validate
{
    protected $rule = [
        'length' => 'number|checkLength'
    ];

    protected $message = [
        'length.number' => 'validate_member_config.length_number',
    ];

    protected $scene = [
        'set' => ['length'],
    ];

    /**
     * 自定义验证 长度
     * @param $value
     * @param $rule
     * @param array $data
     * @return Lang|true
     */
    protected function checkLength($value, $rule, $data = [])
    {
        $length = (int)$value;
        $prefix_len = strlen($data['prefix'] ?? '');
        if (empty($length)) return get_lang("validate_member_config.length_number");
        if (($length - $prefix_len < 4) || $length > 30) return get_lang("validate_member_config.length_between");
        return true;
    }

}