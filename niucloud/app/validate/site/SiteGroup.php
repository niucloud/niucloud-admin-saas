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

namespace app\validate\site;

use think\Validate;

/**
 * 站点分组验证类
 * Class SiteGroup
 * @package app\validate\site
 */
class SiteGroup extends Validate
{


    protected $rule =   [
        'group_name'  => 'require|max:20',
        'group_roles'   => 'require',
    ];

    protected $message  =   [
        'group_name.require' => 'validate_site.group_name_require',
        'group_name.max'     => 'validate_site.group_name_max',
        'group_roles.require' => 'validate_site.group_roles_require',

    ];

    protected $scene = [
        'add'  =>  ['group_name', 'group_roles'],
        'edit'  =>  ['group_name', 'group_roles'],
    ];
}