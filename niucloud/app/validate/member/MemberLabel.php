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

use think\Validate;

/**
 * 会员标签验证
 * Class Member
 * @package app\validate\member
 */
class MemberLabel extends Validate
{


    protected $rule =   [
        'label_name'  => 'require|max:30',
        'memo'  => 'max:200',
        'sort'  => 'number',

    ];

    protected $message  =   [
        'label_name.require' => 'validate_member.label_name_require',
        'label_name.max'     => 'validate_member.label_name_max',
        'memo.max'     => 'validate_member.memo_max',
        'sort.number'     => 'validate_member.sort_number',
    ];

    protected $scene = [
        'add'  =>  ['label_name', 'memo', 'sort'],
        'edit'  =>  ['label_name', 'memo', 'sort'],
    ];
}