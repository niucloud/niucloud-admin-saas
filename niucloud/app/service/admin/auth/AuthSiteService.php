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

namespace app\service\admin\auth;


use app\dict\sys\AppTypeDict;
use app\dict\sys\MenuTypeDict;
use app\model\site\Site;
use app\model\sys\SysMenu;
use app\service\admin\addon\AddonService;
use app\service\admin\site\SiteService;
use app\service\core\addon\CoreAddonService;
use core\base\BaseAdminService;
use think\Collection;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

/**
 * 用户服务层
 * Class BaseService
 * @package app\service
 */
class AuthSiteService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Site();
    }

    /**
     * 获取授权当前的站点信息
     */
    public function getSiteInfo(){
        //通过用户id获取
        return (new SiteService())->getSiteCache($this->site_id);
    }


    /**
     * 通过站点id获取菜单列表
     * @param int $is_tree
     * @param int|string $status
     * @return mixed
     */
    public function getMenuList(int $is_tree, int|string $status, $addon = 'all', int $is_button = 1){
        return (new SiteService())->getMenuList($this->site_id, $is_tree, $status, $addon, $is_button);
    }

    /**
     * 通过站点id获取菜单列表
     * @param int|string $status
     * @return mixed
     */
    public function getApiList(int|string $status){
        return (new SiteService())->getApiList($this->site_id, $status);
    }

    /**
     * 查询当前站点可以单独显示的菜单(仅支持站点端调用)
     * @return array|SysMenu[]
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getShowMenuList(){
        $menu_keys = (new SiteService())->getMenuIdsBySiteId($this->site_id, 1);
        return (new SysMenu())->where([['menu_key', 'in', $menu_keys], ['menu_type', '=', MenuTypeDict::MENU], ['app_type', '=', AppTypeDict::SITE],['is_show', '=', 1]])->select()->toArray();
    }

    /**
     * 获取站点支持
     * @return array|mixed|string|null
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getAuthAddonList(){
        return (new AddonService())->getAddonListBySiteId($this->site_id);
    }
}
