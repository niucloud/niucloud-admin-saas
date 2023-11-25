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

namespace app\adminapi\controller\user;

use app\service\admin\user\UserService;
use core\base\BaseAdminController;
use think\Response;

class User extends BaseAdminController
{
    public function lists()
    {
        $data = $this->request->params([
            ['username', ''],
            ['real_name', '']
        ]);

        $list = (new UserService())->getUserAdminPage($data);
        return success($list);

    }

    /**
     * 用户详情
     * @param $uid
     * @return Response
     */
    public function info($uid)
    {
        return success((new UserService())->getUserAdminInfo($uid));
    }

    public function pages()
    {
        $data = $this->request->params([
            ['username', ''],
            ['realname', ''],
            ['create_time', []],
        ]);
        $list = (new UserService())->getUserAllPage($data);
        return success($list);
    }

    public function checkUserIsExist() {
        $data = $this->request->params([
            ['username', ''],
        ]);
        $is_exist = (new UserService())->checkUsername($data['username']);
        return success(data:$is_exist);
    }
}
