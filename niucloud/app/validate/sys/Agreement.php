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
 * 协议数据验证
 * Class Agreement
 * @package app\validate\sys
 */
class Agreement extends Validate
{

    protected $rule = [
        'title' => 'require|max:20',
        'content' => 'require',

    ];

    protected $message = [
        'title.require' => 'validate_agreement.title_require',
        'title.max' => 'validate_agreement.title_max',
        'content.require' => 'validate_agreement.content_require',
    ];

    protected $scene = [
        'update' => ['title', 'content'],
    ];

}