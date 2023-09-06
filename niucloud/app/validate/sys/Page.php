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

use think\Validate;

/**
 * 分页验证
 * Class Page
 * @package app\validate\sys
 */
class Page extends Validate
{

    protected $rule = [
        'page' => 'number|min:1',
        'limit' => 'number|between:1,120',
    ];

    protected $message = [
        'page.number' => 'validate_page.page_error',
        'page.min' => 'validate_page.page_error',
        'limit.number' => 'validate_page.limit_number',
        'limit.between' => 'validate_page.limit_between',
    ];
}