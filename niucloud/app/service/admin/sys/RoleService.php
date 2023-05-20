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

namespace app\service\admin\sys;

use app\enum\sys\RoleStatusEnum;
use app\model\sys\SysRole;
use app\model\sys\SysUserRole;
use core\base\BaseAdminService;
use core\exception\AdminException;
use think\facade\Cache;

/**
 * admin授权服务层
 * Class BaseService
 * @package app\service
 */
class RoleService extends BaseAdminService
{
    public static $cache_tag_name = 'role_cache';
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysRole();
    }

    /**
     * 管理端获取角色列表
     * @param array $data
     * @return mixed
     */
    public function getPage(array $data)
    {
        $where = [['site_id', '=', $this->site_id]];
        if(!empty($data['role_name'])) {
            $where[] = ['role_name', 'like', "%".$data['role_name']."%"];
        }
        $field = 'role_id,role_name,status,create_time';
        $search_model = $this->model->where($where)->field($field)->order('create_time desc')->append(['status_name']);
        $list = $this->pageQuery($search_model);
        return $list;
    }
    /**
     * 获取权限信息
     * @param int $role_id
     * @return mixed
     */
    public function getInfo(int $role_id){
        return $this->model->findOrEmpty($role_id)->append(['status_name'])->toArray();
    }

    /**
     * 获取站点下的所有权限
     * @return mixed
     */
    public function getAll()
    {
        $where = array(
            ['site_id', '=', $this->site_id],
            ['status', '=', 1]
        );
        return $this->model->where($where)->field('role_id,role_name,status,create_time')->select()->toArray();
    }
    /**
     * 新增权限
     * @param array $data
     */
    public function add(array $data){
        $data['create_time'] = time();
        $data['app_type'] = $this->app_type;
        $data['site_id'] = $this->site_id;
        $this->model->save($data);
        Cache::tag(self::$cache_tag_name.$this->site_id)->clear();
        return true;
    }

    /**
     * 更新权限
     * @param int $role_id
     * @param array $data
     */
    public function edit(int $role_id, array $data){
        $where = array(
            ['role_id', '=', $role_id],
            ['site_id', '=', $this->site_id],
        );
        $data['update_time'] = time();
        $this->model->update($data, $where);
        Cache::tag(self::$cache_tag_name.$this->site_id)->clear();
        return true;

    }
    /**
     * 获取模型对象
     * @param int $role_id
     * @return mixed
     */
    public function find(int $site_id, int $role_id){
        $where = array(
            ['role_id', '=', $role_id],
            ['site_id', '=', $site_id],
        );
        $role = $this->model->where($where)->findOrEmpty();
        if ($role->isEmpty())
            throw new AdminException('USER_ROLE_NOT_EXIST');
        return $role;
    }

    /**
     * 删除权限(saas应该不允许删除)
     * @param int $role_id
     * @return mixed
     * @throws \think\db\exception\DbException
     */
    public function del(int $role_id){
        $role = $this->find($this->site_id, $role_id);
        if(SysUserRole::where([['role_ids', 'like',['%"'.$role_id.'"%']]])->count() > 0)
            throw new AdminException('USER_ROLE_NOT_ALLOW_DELETE');
        $res = $role->delete();
        Cache::tag(self::$cache_tag_name.$this->site_id)->clear();
        return $res;

    }

    /**
     * 获取角色id为健名,角色名为键值的数据
     * @param int $site_id
     * @param string $app_type
     */
    public function getColumn(int $site_id){
        $cache_name = 'role_column_'.$site_id;
        return Cache::tag([MenuService::$cache_tag_name, self::$cache_tag_name.$this->site_id])->remember($cache_name,  function() use($site_id) {
            $where = [
                ['site_id', '=', $site_id]
            ];
            return $this->model->where($where)->column('role_name', 'role_id');
        });

    }

    /**
     * 通过权限组id获取菜单id
     * @param array $role_ids
     * @return array
     */
    public function getMenuIdsByRoleIds(int $site_id, array $role_ids){
        sort($role_ids);
        $cache_name = 'user_role_'.$site_id.'_'.md5(implode('_', $role_ids));
        return Cache::tag([MenuService::$cache_tag_name, self::$cache_tag_name.$site_id])->remember($cache_name,  function() use($role_ids) {
            $rules = $this->model::where([['role_id', 'IN', $role_ids], ['status', '=', RoleStatusEnum::ON]])->field('rules')->select()->toArray();
            if(!empty($rules)){
                $temp = [];
                foreach($rules as $k => $v){
                    $temp = array_merge($temp, $v['rules']);
                }
                return array_unique($temp);
            }
            return [];
        });
    }
}