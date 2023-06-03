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

namespace app\validate\notice;

use think\Validate;

/**
 * Class Menu
 * @package app\validate\notice
 */
class Menu extends Validate
{

    //用户名或密码的规范可能是从数据库中获取的
    protected $rule = [
        'menu_name' => 'require',
        'menu_key' => 'unique:sys_menu',//防止key值重复
        'menu_type' => 'require|checkMenuType',
        'methods' => 'requireWith:api_url|checkMethodType',
        'router_path' => 'requireIf:menu_type,0|requireIf:menu_type,1',
        'view_path' => 'requireIf:menu_type,1'

    ];

    protected $message = [
        'menu_name.require' => 'validate_menu.menu_name_require',
        'router_path.requireIf' => 'validate_menu.router_path_requireif',
        'view_path.requireIf' => 'validate_menu.view_path_requireif',

        'methods.requireWith' => 'validate_menu.methods_requirewith',
    ];

}