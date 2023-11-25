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

use app\dict\sys\UserDict;
use app\model\sys\SysUser;
use app\model\sys\SysUserRole;
use app\service\admin\user\UserRoleService;
use app\service\admin\user\UserService;
use core\base\BaseAdminService;
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
     * @return array
     */
    public function getPage(array $where)
    {
        $site_id = $this->site_id;
        $field = 'id,SysUserRole.uid,site_id,role_ids,SysUserRole.create_time,is_admin,SysUserRole.status,count(site_id) as site_num';
        $order = 'SysUserRole.create_time desc';
        $search_model = (new SysUserRole())
            ->field($field)
            ->order($order)
            ->with('userinfo')
            ->hasWhere('userinfo', function ($query) use ($where, $site_id) {
                $condition = [
                    ['SysUserRole.site_id', '>', 0 ]
                ];
                if (!empty($where['username'])) $condition[] = ['username', 'like', "%{$where['username']}%"];
                if (!empty($where['realname'])) $condition[] = ['realname', 'like', "%{$where['realname']}%"];

                //最后登录时间
                if (!empty($where['last_time'])) {
                    $start_time = empty($where['last_time'][0]) ? 0 : strtotime($where['last_time'][0]);
                    $end_time = empty($where['last_time'][1]) ? 0 : strtotime($where['last_time'][1]);
                    if ($start_time > 0 && $end_time > 0) {
                        $condition[] = ['last_time', 'between', [$start_time, $end_time]];
                    } else if ($start_time > 0 && $end_time == 0) {
                        $condition[] = ['last_time', '>=', $start_time];
                    } else if ($start_time == 0 && $end_time > 0) {
                        $condition[] = ['last_time', '<=', $end_time];
                    }
                }
                $query->where($condition);
            })
            ->group('SysUserRole.uid')
            ->append(['status_name']);

        return $this->pageQuery($search_model);
    }

    /**
     * 用户详情(站点用户详情)
     * @param int $uid
     * @return array
     */
    public function getInfo(int $uid)
    {
        $field = 'uid, username, head_img, real_name, last_ip, last_time, create_time, login_count, delete_time, update_time';
        $info = $this->model->where([ ['uid', '=', $uid] ])->field($field)->with(['roles' => function($query) {
            $query->field('uid, site_id, is_admin')->with('siteInfo');
        }])->findOrEmpty()->toArray();
        if (!empty($info)) {
            $info['roles'] = array_filter(array_map(function ($item) {
                if ($item['site_id']) return $item;
            }, $info['roles']));
        }
        return $info;
    }

    /**
     * 添加当前站点用户
     * @param array $data
     * @return bool
     */
    public function add(array $data)
    {
        return (new UserService())->addSiteUser($data, $this->site_id);
    }

    /**
     * 编辑站点用户
     * @param int $uid
     * @param array $data
     * @return true
     */
    public function edit(int $uid, array $data)
    {
        return (new UserService())->editSiteUser($uid, $data, $this->site_id);
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
        return (new UserService())->edit($uid, [$field_name => $data]);
    }

    /**
     * 删除
     * @param int $uid
     * @return true
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
        return (new UserService())->statusChange($uid, UserDict::OFF);
    }

    /**
     * 解锁
     * @param int $uid
     * @return bool|true
     */
    public function unlock(int $uid){
        return (new UserService())->statusChange($uid, UserDict::ON);
    }
}
