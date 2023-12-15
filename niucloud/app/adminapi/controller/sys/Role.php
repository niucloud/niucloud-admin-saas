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

use app\dict\sys\RoleStatusDict;
use app\service\admin\sys\RoleService;
use core\base\BaseAdminController;
use think\db\exception\DbException;
use think\Response;

class Role extends BaseAdminController
{
    public function lists()
    {
        $data = $this->request->params([
            ['role_name', ''],
        ]);
        $list = (new RoleService())->getPage($data);
        return success($list);

    }

    /**
     * 用户组详情
     * @param $role_id
     * @return Response
     */
    public function info($role_id)
    {
        return success((new RoleService())->getInfo($role_id));
    }

    /**
     * 获取全部权限
     * @return Response
     */
    public function all()
    {
        return success((new RoleService())->getAll());
    }

    /**
     * 新增用户组
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            ['role_name', ''],
            ['rules', []],
            ['status', RoleStatusDict::ON],
        ]);
        $this->validate($data, 'app\validate\sys\Role.add');
        (new RoleService())->add($data);
        return success('ADD_SUCCESS');
    }


    /**
     * 更新用户组
     */
    public function edit($role_id)
    {
        $data = $this->request->params([
            ['role_name', ''],
            ['rules', []],
            ['status', RoleStatusDict::ON],
        ]);
        $this->validate($data, 'app\validate\sys\Role.edit');
        (new RoleService())->edit($role_id, $data);
        return success('EDIT_SUCCESS');
    }


    /**
     * 删除单个用户组
     * @param $role_id
     * @return Response
     * @throws DbException
     */
    public function del($role_id)
    {
        (new RoleService())->del($role_id);
        return success('DELETE_SUCCESS');
    }

}
