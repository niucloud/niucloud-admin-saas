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

use app\enum\sys\AppTypeEnum;
use app\model\site\Site;
use app\service\admin\BaseAdminService;
use app\service\admin\sys\MenuService;
use app\service\admin\user\UserService;
use Exception;
use extend\exception\AdminException;
use think\facade\Cache;
use think\facade\Db;

/**
 * 站点服务层
 * Class Site
 * @package app\service\admin\site
 */
class SiteService extends BaseAdminService
{
    public static $cache_tag_name = 'site_cash';
    public function __construct()
    {
        parent::__construct();
        $this->model = new Site();
    }

    /**
     * 获取站点列表
     * @param array $where
     * @param string $order
     * @return mixed
     */
    public function getPage(array $where = [])
    {
        $field = 'site_id, site_name, app_type, keywords, logo, `desc`, status, latitude, longitude, province_id, city_id, 
        district_id, address, full_address, phone, business_hours, create_time, expire_time, group_id';
        $search_model = $this->model->where([['app_type', '<>', 'admin']])->withSearch(['keywords','status', 'group_id'],$where)->with('groupName')->field($field)->append(['status_name'])->order('create_time desc');
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 站点信息
     * @param int $site_id
     * @return array
     */
    public function getInfo(int $site_id)
    {
        $field = 'site_id, site_name, app_type, keywords, logo, `desc`, status, latitude, longitude, province_id, city_id, 
        district_id, address, full_address, phone, business_hours, create_time, expire_time, group_id';
        return $this->model->where([['site_id', '=', $site_id]])->with('groupName')->field($field)->append(['status_name'])->findOrEmpty()->toArray();

    }

    /**
     * 添加站点(平台端添加站点，同时添加用户以及密码)
     * @param array $data
     * ['site_name' => '', 'username' => '', 'head_img' => '', 'real_name' => '', 'password' => '']
     *
     */
    public function add(array $data)
    {
        $user_service = new UserService();
        if($user_service->checkUsername($data['username'])) throw new AdminException(201004);
        $data['app_type'] = 'site';
        //添加站点
        $data_site = [
            'site_name' => $data['site_name'],
            'app_type' => $data['app_type'],
            'group_id' => $data['group_id'],
            'create_time' => time(),
            'expire_time' => $data['expire_time']
        ];
        Db::startTrans();
        try {
            $site = $this->model->create($data_site);
            $site_id = $site->site_id;
            //添加用户
            $data_user = [
                'username' => $data['username'],
                'head_img' => $data['head_img'] ?? '',
                'status' => $data['status'] ?? 1,
                'real_name' => $data['real_name'] ?? '',
                'password' => $data['password'],
                'role_ids' => '',
                'is_admin' => 1
            ];
            (new UserService())->addSiteUser($data_user, $site_id);
            Db::commit();
            return $site_id;
        } catch ( Exception $e) {
            Db::rollback();
            throw new Exception($e->getMessage());
        }
    }

    /**
     * 修改站点
     * @param int $site_id
     * @param array $data
     * @return bool
     */
    public function update(int $site_id, array $data){
        $this->model->update($data, [['site_id', '=', $site_id]]);
        Cache::tag(self::$cache_tag_name)->clear();
        return true;
    }


    /**
     * 站点数量
     * @return int
     * @throws \think\db\exception\DbException
     */
    public function getCount(array $where = []){
        return $this->model->where($where)->count();
    }


    /**
     * 获取授权当前站点信息(用做缓存)
     * @return mixed
     */
    public function getSiteCache(int $site_id){
        $cache_name = 'site_info_cache';
        return Cache::tag(self::$cache_tag_name.$site_id)->remember($cache_name.$site_id, function () use ($site_id) {
            $where = [
                ['site_id', '=', $site_id],
            ];
            $menu_list = $this->model->where($where)->field('app_type,site_name,logo,group_id, status, expire_time')->findOrEmpty()->append(['status_name'])->toArray();
            return $menu_list;
        });
    }


    /**
     * 通过站点id获取菜单列表
     * @param int $site_id
     * @return mixed
     */
    public function getMenuList(int $site_id, $is_tree, $status){
        $site_info = $this->getSiteCache($site_id);
        if(empty($site_info))
            return [];
        $app_type = $site_info['app_type'];
        if($app_type == AppTypeEnum::ADMIN){
            return (new MenuService())->getAllMenuList($app_type, $status, $is_tree, 1);
        }else{
            $group_id = $site_info['group_id'] ?? 0;
            if($group_id > 0){
                $menu_keys = (new SiteGroupService())->getMenuIdsByGroupId($group_id);
                return (new MenuService())->getMenuListByMenuKeys($menu_keys, $this->app_type, $is_tree);
            }else{
                return [];
            }
        }


    }

    /**
     * 通过站点id获取菜单列表
     * @param int $site_id
     * @return mixed
     */
    public function getApiList(int $site_id, $status){
        $site_info = $this->getSiteCache($site_id);
        if(empty($site_info))
            return [];
        $app_type = $site_info['app_type'];
        if($app_type == AppTypeEnum::ADMIN){
            return (new MenuService())->getAllApiList($app_type, $status);
        }else{
            $group_id = $site_info['group_id'] ?? 0;
            if($group_id > 0){
                $menu_keys = (new SiteGroupService())->getMenuIdsByGroupId($group_id);
                return (new MenuService())->getApiListByMenuKeys($menu_keys, $app_type);
            }else{
                return [];
            }
        }
    }

    /**
     * 站点过期时间
     * @param int $site_id
     * @return array
     */
    public function getExpireTime(int $site_id)
    {
        $field = 'expire_time';
        return $this->model->where([['site_id', '=', $site_id]])->field($field)->findOrEmpty()->toArray();

    }

}