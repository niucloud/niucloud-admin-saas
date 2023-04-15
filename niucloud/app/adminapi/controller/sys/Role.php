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

use app\adminapi\controller\BaseAdminController;
use app\enum\sys\RoleStatusEnum;
use app\service\admin\sys\RoleService;
use think\Response;

class Role extends BaseAdminController
{
    public function lists(){
        $data = $this->request->params([
            ['role_name', ''],
        ]);
        $list = (new RoleService())->getPage($data);
        return success($list);

    }

    /**
     * 用户组详情
     * @param $uid
     * @return Response
     */
    public function info($role_id){
        return success((new RoleService())->getInfo($role_id));
    }

    /**
     * 获取全部权限
     * @return Response
     */
    public function all(){
        return success((new RoleService())->getAll());
    }
    /**
     * 新增用户组
     * @return Response
     */
    public function add(){
        $data = $this->request->params([
            ['role_name', ''],
            ['rules', []],
            ['status', RoleStatusEnum::ON],
        ]);
        $this->validate($data, 'app\validate\sys\Role.add');
        (new RoleService())->add($data);
        return success(100011);
    }


    /**
     * 更新用户组
     */
    public function update($role_id){
        $data = $this->request->params([
            ['role_name', ''],
            ['rules', []],
            ['status', RoleStatusEnum::ON],
        ]);
        $this->validate($data, 'app\validate\sys\Role.update');
        (new RoleService())->update($role_id, $data);
        return success(100004);
    }


    /**
     * 删除单个用户组
     * @param $uid
     */
    public function del($role_id){
        (new RoleService())->del($role_id);
        return success(100003);
    }

}
