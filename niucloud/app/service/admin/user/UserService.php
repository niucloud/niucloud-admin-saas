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

namespace app\service\admin\user;


use app\dict\sys\UserDict;
use app\model\sys\SysUser;
use app\service\admin\auth\LoginService;
use core\base\BaseAdminService;
use core\exception\AdminException;
use Exception;
use think\db\exception\DbException;
use think\facade\Db;
use think\Model;

/**
 * 用户服务层
 * Class BaseService
 * @package app\service
 */
class UserService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
       $this->model = new SysUser();
    }

    /**
     * 用户列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where)
    {
        return $this->getPageList($this->model, $where, 'uid,username,head_img,real_name,last_ip,last_time,login_count,status', 'uid desc',['status_name']);
    }


    /**
     * 用户详情
     * @param int $uid
     * @return array
     */
    public function getInfo(int $uid){
        $where = array(
            ['uid', '=', $uid],
        );
        $field = 'uid, username, head_img, real_name, last_ip, last_time, create_time, login_count, status, delete_time, update_time';
        $user = $this->model->where($where)->field($field)->append(['status_name'])->findOrEmpty();
        return $user->toArray();
    }

    /**
     * 获取用户列表（用于平台整体用户管理）
     * @param array $where
     * @return array
     */
    public function getUserAdminPage(array $where)
    {
        $field = 'uid, username, head_img, real_name, last_ip, last_time, create_time, login_count, status, delete_time, update_time';
        $order = 'create_time desc';
        $search_model = $this->model->withSearch(['username', 'realname', 'create_time'], $where)->field($field)->with(['roles' => function($query) {
        $query->field('uid, site_id, is_admin')->with('siteInfo');
        }])->order($order);
        return $this->pageQuery($search_model);

    }

    /**
     * 获取用户列表（用于平台整体用户管理）
     * @param int $uid
     * @return array
     */
    public function getUserAdminInfo(int $uid)
    {
        $field = 'uid, username, head_img, real_name, last_ip, last_time, create_time, login_count, status, delete_time, update_time';
        return $this->model->where([['uid', '=', $uid]])->field($field)->with(['roles' => function($query) {
            $query->field('uid, site_id, is_admin')->with('siteInfo');
        }])->findOrEmpty()->toArray();

    }

    /**
     * 添加用户（添加用户，不添加站点）
     * @param array $data
     * @return bool
     * @throws Exception
     */
    public function add(array $data){
        $user_data = [
            'username' => $data['username'],
            'head_img' => $data['head_img'],
            'status' => $data['status'],
            'real_name' => $data['real_name'],
            'password' => create_password($data['password'])
        ];
        $user = $this->model->create($user_data);
        return $user?->uid;
    }

    /**
     * 添加对应站点用户(添加站点，同时添加站点用户,用于添加站点以及站点添加站点用户)
     * @param $data
     * @param $site_id
     * @return bool
     */
    public function addSiteUser($data, $site_id)
    {
        Db::startTrans();
        try {
            //添加用户
            $uid = $this->add($data);
            $role_ids = $data['role_ids'] ?? [];
            $is_admin = $data['is_admin'] ?? 0;
            //创建用户站点管理权限
            (new UserRoleService())->add($uid, ['role_ids' => $role_ids, 'is_admin' => $is_admin], $site_id);
            Db::commit();
            return $uid;
        } catch ( Exception $e) {
            Db::rollback();
            throw new AdminException($e->getMessage());
        }
    }

    /**
     * 更新对应站点用户
     * @param $uid
     * @param $data
     * @param $site_id
     * @return true
     */
    public function editSiteUser($uid, $data, $site_id)
    {
        Db::startTrans();
        try {
            //添加用户
            $this->edit($uid, $data);
            $role_ids = $data['role_ids'] ?? [];
            $is_admin = $data['is_admin'] ?? 0;
            //创建用户站点管理权限
            (new UserRoleService())->edit($site_id, $uid, $role_ids);
            Db::commit();
            return true;
        } catch ( Exception $e) {
            Db::rollback();
            throw new AdminException($e->getMessage());
        }
    }

    /**
     * 检测用户名是否重复
     * @param $username
     * @return bool
     * @throws DbException
     */
    public function checkUsername($username)
    {
        $count = $this->model->where([['username', '=', $username]])->count();
        if($count > 0)
        {
            return true;
        }
        else return false;
    }

    /**
     * 用户模型对象
     * @param int $uid
     * @return SysUser|array|mixed|Model
     */
    public function find(int $uid){

        $user = $this->model->findOrEmpty($uid);
        if ($user->isEmpty())
            throw new AdminException('USER_NOT_EXIST');
        return $user;
    }

    /**
     * 编辑用户
     * @param int $uid
     * @param array $data
     * @return true
     */
    public function edit(int $uid, array $data){
        $user = $this->find($uid);
        $user_data = [
        ];
        $is_off_status = false;
        if(isset($data['status'])){
            $user_data['status'] = $data['status'];
            if($data['status'] == UserDict::OFF)
                $is_off_status = true;
        }
        if(isset($data['head_img'])){
            $user_data['head_img'] = $data['head_img'];
        }
        if(isset($data['real_name'])){
            $user_data['real_name'] = $data['real_name'];
        }

        $password = $data['password'] ?? '';
        $is_change_password = false;
        if(!empty($password) && !check_password($password, $user->password)){
            $user_data['password'] = create_password($password);
            $is_change_password = true;
        }
        if(empty($user_data))
            return true;
        //更新用户信息
        $user->save($user_data);
        //更新权限  禁用用户  修改密码 都会清理token
        if($is_off_status || $is_change_password){
            LoginService::clearToken($uid);
        }
        return true;
    }

    /**
     * 删除
     * @param int $uid
     * @return true
     */
    public function del(int $uid){
        $where = [
            ['uid', '=', $uid]
        ];
        $this->model->where($where)->delete();
        return true;

    }

    /**
     * 通过账号获取管理员信息
     * @param string $username
     * @return SysUser|array|mixed|Model
     */
    public function getUserInfoByUsername(string $username){
        return $this->model->where([['username', '=',$username]])->findOrEmpty();
    }

}