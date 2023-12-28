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

namespace app\service\admin\addon;


use app\dict\addon\AddonDict;
use app\dict\sys\AppTypeDict;
use app\model\addon\Addon;
use app\service\admin\site\SiteGroupService;
use app\service\admin\site\SiteService;
use app\service\core\addon\CoreAddonCloudService;
use app\service\core\addon\CoreAddonDownloadService;
use app\service\core\addon\CoreAddonInstallService;
use app\service\core\addon\CoreAddonService;
use app\service\core\niucloud\CoreModuleService;
use app\service\core\site\CoreSiteService;
use core\base\BaseAdminService;
use Exception;
use think\db\exception\DbException;
use think\Response;


/**
 * 消息管理服务层
 */
class AddonService extends BaseAdminService
{
    public static $cache_tag_name = 'addon_cache';
    public function __construct()
    {
        parent::__construct();
        $this->model = new Addon();

    }
    public function getList(){
        return (new CoreAddonService())->getLocalAddonList();
    }

    /**
     * 获取当前站点消息
     * @return array
     */
    public function getLocalAddonList()
    {
        return (new CoreAddonService())->getLocalAddonList();
    }

    /**
     * 安装插件
     * @param string $addon
     */
    public function install(string $addon)
    {
        return ( new CoreAddonInstallService($addon) )->install();
    }

    /**
     * 云安装插件
     * @param string $addon
     */
    public function cloudInstall(string $addon)
    {
        return ( new CoreAddonInstallService($addon) )->install('cloud');
    }

    /**
     * 云安装日志
     * @param string $addon
     * @return null
     */
    public function cloudInstallLog(string $addon)
    {
        return ( new CoreAddonCloudService() )->getBuildLog($addon);
    }

    /**
     * 获取安装任务
     * @return mixed
     */
    public function getInstallTask()
    {
        return ( new CoreAddonInstallService('') )->getInstallTask();
    }

    /**
     * 安装插件检测安装环境
     * @param string $addon
     */
    public function installCheck(string $addon)
    {
        return ( new CoreAddonInstallService($addon) )->installCheck();
    }

    /**
     * 取消安装任务
     * @param string $addon
     */
    public function cancleInstall(string $addon)
    {
        return ( new CoreAddonInstallService($addon) )->cancleInstall();
    }

    /**
     * @param string $addon
     * @return void
     */
    public function uninstallCheck(string $addon) {
        return ( new CoreAddonInstallService($addon) )->uninstallCheck();
    }

    /**
     * 卸载插件
     * @param string $addon
     * @return true
     */
    public function uninstall(string $addon)
    {
        return CoreAddonInstallService::instance($addon)->uninstall();
    }

    /**
     * 获取插件列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        return (new CoreAddonService())->getPage($where);
    }

    /**
     * 获取插件信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        return (new CoreAddonService())->getInfo($id);
    }

    /**
     * 设置插件状态
     * @param int $id
     * @param int $status
     */
    public function setStatus(int $id, int $status){
        return (new CoreAddonService())->setStatus($id, $status);
    }

    /**
     * 下载应用
     * @param string $app_key
     * @return true
     */
    public function download(string $app_key, string $version){
        return (new CoreAddonDownloadService())->download($app_key, $version);
    }


    /**
     * 查询已安装应用
     * @return array
     */
    public function getInstallList(){
        return (new CoreAddonService())->getInstallAddonList();
    }


    /**
     * 获取站点拥有的应用列表
     * @param int $site_id
     * @return array|mixed|string|void
     * @throws DbException
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getAddonListBySiteId(int $site_id){
        $addon_keys = $this->getAddonKeysBySiteId($site_id);
        return $this->getAddonListByKeys($addon_keys);


    }
    /**
     * 应用key缓存
     * @param $keys
     * @return mixed|string
     * @throws DbException
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getAddonListByKeys($keys){
        sort($keys);
        $cache_name = 'addon_list'.implode('_', $keys);
        return cache_remember(
            $cache_name,
            function () use ($keys) {
                $where = [
                    ['key', 'in', $keys],
                    ['status', '=', AddonDict::ON]
                ];
                return $this->model->where($where)->field('title, icon, key, desc, status, cover')->select()->toArray();

            },
            self::$cache_tag_name
        );
    }

    /**
     * 获取站点支持的应用插件
     * @param int $site_id
     * @return array
     */
    public function getAddonKeysBySiteId(int $site_id){
        return (new CoreSiteService())->getAddonKeysBySiteId($site_id);
    }

    /**
     * 获取插件信息
     * @param int $id
     * @return array
     */
    public function getInfoByKey(string $key)
    {
        return $this->model->where([ [ 'key', '=', $key ] ])->field('title, icon, key, desc, status, cover')->findOrEmpty()->toArray();
    }
}
