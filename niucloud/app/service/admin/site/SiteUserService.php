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

namespace app\service\admin\site;

use app\enum\sys\UserEnum;
use app\model\sys\SysUser;
use app\model\sys\SysUserRole;
use app\service\admin\BaseAdminService;
use app\service\admin\user\UserRoleService;
use app\service\admin\user\UserService;
use Exception;

/**
 * 站点用户服务层
 * Class BaseService
 * @package app\service
 */
class SiteUserService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysUser();
    }

    /**
     * 管理端获取用户列表(对应站点用户列表)
     * @param array $where
     * @return mixed
     */
    public function getPage(array $where)
    {

        $field = 'uid,username,head_img,real_name,last_ip,last_time,login_count,status';
        $user_search = [
            'username' => $where['username'],
            'realname' => $where['realname'],
            'create_time' => $where['create_time']
        ];
        $role_search = [
            ['userrole.site_id', '=', $this->site_id],
        ];
        if (!empty($where['role'])) {
            $role_search[] = ['userrole.role_ids', 'like', '%"' . $where['role'] . '"%'];
        }

        $search_model = $this->model->withSearch(['username', 'realname', 'create_time'], $user_search)->field($field)->withJoin(['userrole'])->where($role_search)->order('uid desc')->append(['status_name']);
        return $this->pageQuery($search_model, function ($item, $key) {
            $userrole = $item?->userrole;
            //先实现
            if (!empty($userrole)) {
                $item_role_ids = json_decode($userrole->role_ids, true) ?? [];
                $item->userrole->role_ids = $item_role_ids;
                $item->userrole->role_array = (new UserRoleService())->getRoleByUserRoleIds($item_role_ids, $this->site_id);
            }
        });
    }

    /**
     * 用户详情(站点用户详情)
     * @param int $uid
     * @return array
     */
    public function getInfo(int $uid)
    {
        $where = array(
            ['uid', '=', $uid],
        );
        $field = 'uid, username, head_img, real_name, last_ip, last_time, create_time, login_count, status, is_del, delete_time, update_time';
        $user = $this->model::where($where)->field($field)->with(['userrole'])->findOrEmpty();
        if ($user->isEmpty())
            return [];

        if (!empty($user?->userrole)) {
            $user->userrole->appendData(['role_array' => (new UserRoleService())->getRoleByUserRoleIds($user->userrole->role_ids ?? [], $this->site_id)]);
        }

        return $user->append(['status_name'])->toArray();
    }

    /**
     * 添加当前站点用户
     * @param int $site_id
     * @param array $data
     * @return bool
     * @throws Exception
     */
    public function add(array $data)
    {
        return (new UserService())->addSiteUser($data, $this->site_id);
    }

    /**
     * 编辑站点用户
     * @param int $uid
     * @param array $data
     */
    public function update(int $uid, array $data)
    {
        return (new UserService())->updateSiteUser($uid, $data, $this->site_id);
    }

    /**
     * 修改字段
     * @param int $uid
     * @param string $field
     * @param $data
     * @return bool|true
     */
    public function modify(int $uid, string $field, $data)
    {
        $field_name = match ($field) {
            'password' => 'password',
            'real_name' => 'real_name',
            'head_img' => 'head_img',
        };
        return (new UserService())->update($uid, [$field_name => $data]);
    }

    /**
     * 删除
     * @param int $uid
     * @return mixed
     */
    public function del(int $uid)
    {
        $where = [
            ['uid', '=', $uid],
            ['site_id', '=', $this->site_id]
        ];
        SysUserRole::where($where)->delete();
        return true;
    }

    /**
     * 锁定
     * @param int $uid
     * @return bool|true
     */
    public function lock(int $uid){
        return (new UserService())->update($uid, ['status' => UserEnum::OFF]);
    }

    /**
     * 解锁
     * @param int $uid
     * @return bool|true
     */
    public function unlock(int $uid){
        return (new UserService())->update($uid, ['status' => UserEnum::ON]);
    }
}