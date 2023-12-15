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

namespace app\adminapi\controller\sys;

use app\dict\sys\MenuDict;
use app\dict\sys\MenuTypeDict;
use app\dict\sys\MethodDict;
use app\service\admin\install\InstallSystemService;
use app\service\admin\sys\MenuService;
use core\base\BaseAdminController;
use think\Response;

class Menu extends BaseAdminController
{

    /**
     * 菜单列表(todo  限制只有平台端可以访问)
     * @return Response
     */
    public function lists($app_type)
    {

        return success((new MenuService())->getAllMenuList($app_type, 'all', 1));
    }

    /**
     * 菜单信息
     * @param $menu_key
     * @return Response
     */
    public function info($app_type, $menu_key)
    {
        return success((new MenuService())->get($app_type, $menu_key));
    }

    /**
     * 新增菜单接口
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            ['menu_name', ''],
            ['menu_type', 0],
            ['menu_key', ''],
            ['parent_key', ''],
            ['app_type', ''],
            ['icon', ''],
            ['api_url', ''],
            ['view_path', ''],
            ['router_path', ''],

            ['methods', ''],
            ['sort', 0],

            ['status', MenuDict::ON],
            ['is_show', 0],
        ]);
        $this->validate($data, 'app\validate\sys\Menu.add');
        (new MenuService())->add($data);
        return success('ADD_SUCCESS');
    }

    /**
     * 菜单或接口更新
     */
    public function edit($app_type, $menu_key)
    {
        $data = $this->request->params([
            ['menu_name', ''],
            ['parent_key', ''],

            ['menu_type', 0],
            ['icon', ''],
            ['api_url', ''],
            ['router_path', ''],
            ['view_path', ''],

            ['methods', ''],
            ['sort', 0],

            ['status', MenuDict::ON],
            ['is_show', 0],
        ]);
        $this->validate($data, 'app\validate\sys\Menu.edit');
        (new MenuService())->edit($app_type, $menu_key, $data);
        return success('EDIT_SUCCESS');
    }


    /**
     * 获取菜单类型静态资源
     * @return Response
     */
    public function getMenuType()
    {
        return success(MenuTypeDict::getMenuType());
    }

    /**
     * 获取请求方式
     * @return Response
     */
    public function getMethodType()
    {
        return success(MethodDict::getMethodType());
    }

    /**
     * 删除菜单
     * @param $menu_key
     * @return Response
     */
    public function del($app_type, $menu_key)
    {
        (new MenuService())->del($app_type, $menu_key);
        return success('DELETE_SUCCESS');
    }

    public function refreshMenu()
    {
        (new InstallSystemService())->install();
        return success('REFRESH_SUCCESS');
    }

    /**
     * 查询菜单信息
     */
    public function getSystem()
    {
        return success( (new MenuService())->getSystemMenu('all', 1));
    }

    /**
     * 查询应用权限信息
     */
    public function getAddonMenu($app_key)
    {
        return success( (new MenuService())->getAddonMenu($app_key,'all', 1));
    }
}
