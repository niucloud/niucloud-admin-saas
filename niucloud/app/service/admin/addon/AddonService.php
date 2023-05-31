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


use app\service\core\addon\CoreAddonInstallService;
use app\service\core\addon\CoreAddonService;
use core\base\BaseAdminService;


/**
 * 消息管理服务层
 */
class AddonService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();

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
     * @return true
     */
    public function install(string $addon)
    {
        try {
            $data = (new CoreAddonInstallService($addon))->install();
            return success('SUCCESS', $data);
        } catch (\Exception $e) {
            return fail($e->getMessage());
        }
    }

    /**
     * 执行安装
     * @param string $addon
     * @return \think\Response
     */
    public function executeInstall(string $addon) {
        try {
            $data = (new CoreAddonInstallService($addon))->executeInstall();
            return success('SUCCESS', $data);
        } catch (\Exception $e) {
            return fail($e->getMessage());
        }
    }

    /**
     * 安装插件检测安装环境
     * @param string $addon
     * @return \think\Response
     */
    public function installCheck(string $addon) {
        $data = (new CoreAddonInstallService($addon))->installCheck();
        return success('SUCCESS', $data);
    }

    /**
     * 获取插件安装状态
     * @param string $addon
     * @return mixed
     */
    public function getInstallState(string $addon, string $key)
    {
        return CoreAddonInstallService::instance($addon)->getInstallState($key);
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
     * @param string $order
     */
    public function getPage(array $where = [])
    {
        return (new CoreAddonService())->getPage($where);
    }

    /**
     * 获取插件信息
     * @param int $id
     */
    public function getInfo(int $id)
    {
        return (new CoreAddonService())->getInfo($id);
    }

    /**
     * 设置插件状态
     * @param int $id
     * @param int $status
     * @return null
     */
    public function setStatus(int $id, int $status){
        return (new CoreAddonService())->setStatus($id, $status);
    }


}