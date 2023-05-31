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

use app\dict\sys\MenuTypeDict;
use app\dict\sys\MethodDict;
use think\Validate;

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2023-01-07
 * Time: 18:08
 */
class Menu extends Validate
{

    //用户名或密码的规范可能是从数据库中获取的
    protected $rule = [
        'menu_name' => 'require',
//        'menu_key' => 'unique:sys_menu',//防止key值重复
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

    protected $scene = [
        'add' => ['menu_name', 'menu_type', 'menu_key', 'router_path', 'view_path', 'methods'],
        'edit' => ['menu_name', 'menu_type', 'router_path', 'view_path', 'methods'],//更新得时候因为key中有上下级关系,所以menu_key字段是不能更新得
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
        return isset(MenuTypeDict::getMenuType()[$value]) ? true : get_lang("validate_menu.not_exit_menu_type");
    }

    /**
     * 自定义验证 请求类型
     * @param $value
     * @param $rule
     * @param array $data
     * @return bool|string
     */
    protected function checkMethodType($value, $rule, $data = [])
    {
        return isset(MethodDict::getMethodType()[$value]) ? true : get_lang("validate_menu.not_exit_request_type");
    }

}