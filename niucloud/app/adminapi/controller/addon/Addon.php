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

namespace app\adminapi\controller\addon;

use app\service\admin\addon\AddonService;
use app\service\core\addon\CoreAddonService;
use core\base\BaseAdminController;
use think\Response;


class Addon extends BaseAdminController
{
    /**
     * 获取已下载插架
     */
    public function getLocalAddonList()
    {
        return success((new CoreAddonService())->getLocalAddonList());
    }

    /**
     * 安装插件
     * @param string $addon
     */
    public function install($addon)
    {
        return (new AddonService())->install($addon);
    }

    /**
     * 执行安装
     * @param $addon
     * @return Response
     */
    public function execute($addon)
    {
        return (new AddonService())->executeInstall($addon);
    }

    /**
     * 插件安装环境检测
     * @param $addon
     * @return Response
     */
    public function installCheck($addon)
    {
        return (new AddonService())->installCheck($addon);
    }

    /**
     * 查询插件安装状态
     * @param $addon
     * @param $key
     * @return Response
     */
    public function getInstallState($addon, $key)
    {
        return success((new AddonService())->getInstallState($addon, $key));
    }

    /**
     * 卸载插件
     * @param string $addon
     */
    public function uninstall($addon)
    {
        (new AddonService())->uninstall($addon);
        return success('ADDON_UNINSTALL_SUCCESS');
    }

    /**
     * 插件列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['title', ''],
        ]);
        return success((new AddonService())->getPage($data));
    }

    /**
     * 插件详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new AddonService())->getInfo($id));
    }

    /**
     * 设置插件状态
     * @param int $id
     * @param int $status
     * @return Response
     */
    public function setStatus(int $id, int $status)
    {
        (new AddonService())->setStatus($id, $status);
        return success('SET_SUCCESS');
    }

    /**
     * 下载插件
     * @param $app_key
     * @return Response
     */
    public function download($addon){
        (new AddonService())->download($addon);
        return success('DOWNLOAD_SUCCESS');
    }

    /**
     * 更新插件
     * @param $app_key
     * @return Response
     */
    public function update($addon){
        (new AddonService())->update($addon);
        return success('DOWNLOAD_SUCCESS');
    }

}
