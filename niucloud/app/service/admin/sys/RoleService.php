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

use app\dict\sys\RoleStatusDict;
use app\model\sys\SysRole;
use app\model\sys\SysUserRole;
use app\service\admin\site\SiteService;
use core\base\BaseAdminService;
use core\exception\AdminException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
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
     * @return array
     */
    public function getPage(array $data)
    {
        $where = [['site_id', '=', $this->site_id]];
        if(!empty($data['role_name'])) {
            $where[] = ['role_name', 'like', "%".$data['role_name']."%"];
        }
        $field = 'role_id,role_name,status,create_time';
        $search_model = $this->model->where($where)->field($field)->order('create_time desc')->append(['status_name']);
        return $this->pageQuery($search_model);
    }
    /**
     * 获取权限信息
     * @param int $role_id
     * @return array
     */
    public function getInfo(int $role_id){
        return $this->model->append(['status_name'])->findOrEmpty($role_id)->toArray();
    }

    /**
     * 获取站点下的所有权限
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
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
     * @return true
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
     * @return true
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
     * @param int $site_id
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
     * @throws DbException
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
     * @return mixed|string
     */
    public function getColumn(int $site_id){
        $cache_name = 'role_column_'.$site_id;
        return cache_remember(
            $cache_name,
            function() use($site_id) {
                $where = [
                    ['site_id', '=', $site_id]
                ];
                return $this->model->where($where)->column('role_name', 'role_id');
            },
            [MenuService::$cache_tag_name, self::$cache_tag_name.$this->site_id]
        );
    }

    /**
     * 通过权限组id获取菜单id
     * @param int $site_id
     * @param array $role_ids
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getMenuIdsByRoleIds(int $site_id, array $role_ids){
        $menu_keys = (new SiteService())->getMenuIdsBySiteId($site_id, 1);
        $allow_role_ids = array_merge($role_ids, $menu_keys);
        sort($allow_role_ids);
        $cache_name = 'user_role_'.$site_id.'_'.md5(implode('_', $allow_role_ids));
        return cache_remember(
            $cache_name,
            function() use($role_ids, $menu_keys) {
                $rules = $this->model->where([['role_id', 'IN', $role_ids], ['status', '=', RoleStatusDict::ON]])->field('rules')->select()->toArray();
                if(!empty($rules)){
                    $temp = [];
                    foreach($rules as $k => $v){
                        $temp = array_merge($temp, $v['rules']);
                    }
                    $temp = array_unique($temp);
                    if(empty($menu_keys)) return [];
                    if(empty($temp)) return [];
                    return array_intersect($temp, $menu_keys);
                }
                return [];
            },
            [MenuService::$cache_tag_name, self::$cache_tag_name.$site_id]
        );

    }
}