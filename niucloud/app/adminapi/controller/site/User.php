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

namespace app\adminapi\controller\site;

use app\dict\sys\UserDict;
use app\service\admin\site\SiteUserService;
use app\service\admin\user\UserService;
use core\base\BaseAdminController;
use Exception;
use think\Response;

/**
 * 站点用户接口
 * Class User
 * @package app\adminapi\controller\site
 */
class User extends BaseAdminController
{
    public function lists()
    {
        $data = $this->request->params([
            ['username', ''],
            ['realname', ''],
            ['role', ''],
            ['create_time', []],
            ['last_time', []],
        ]);
        $list = (new SiteUserService())->getPage($data);
        return success($list);

    }

    /**
     * 用户详情
     * @param $uid
     * @return Response
     */
    public function info($uid)
    {
        return success((new SiteUserService())->getInfo($uid));
    }

    /**
     * 新增用户
     * @return Response
     * @throws Exception
     */
    public function add()
    {
        $data = $this->request->params([
            ['uid', 0],
            ['username', ''],
            ['password', ''],
            ['real_name', ''],
            ['head_img', ''],
            ['status', UserDict::ON],
            ['role_ids', []]
        ]);
        if (!$data['uid']) $this->validate($data, 'app\validate\sys\User.add');
        $uid = (new SiteUserService())->add($data);
        return success('ADD_SUCCESS', ['uid' => $uid]);
    }


    /**
     * 更新用户
     */
    public function edit($uid)
    {
        $data = $this->request->params([
            ['real_name', ''],
            ['head_img', ''],
            ['status', UserDict::ON],
            ['role_ids', []],
            ['password', '']
        ]);
        (new SiteUserService())->edit($uid, $data);
        return success('MODIFY_SUCCESS');
    }

    /**
     * 更新字段
     * @param $uid
     * @param $field
     * @return Response
     */
    public function modify($uid, $field)
    {
        $data = $this->request->params([
            ['value', ''],
            ['field', $field]
        ]);
        $data[$field] = $data['value'];
//        $this->validate($data, 'app\validate\sys\User.modify');
        (new SiteUserService())->modify($uid, $field, $data['value']);
        return success('MODIFY_SUCCESS');
    }

    /**
     * 删除单个用户
     * @param $uid
     * @return Response
     */
    public function del($uid)
    {
        (new UserService())->del($uid);
        return success('DELETE_SUCCESS');
    }

    /**
     * 锁定用户
     */
    public function lock($uid)
    {

        (new SiteUserService())->lock($uid);
        return success('MODIFY_SUCCESS');
    }

    /**
     * 解锁用户
     */
    public function unlock($uid)
    {

        (new SiteUserService())->unlock($uid);
        return success('MODIFY_SUCCESS');
    }


}
