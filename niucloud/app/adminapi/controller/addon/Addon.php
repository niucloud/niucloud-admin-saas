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
use app\service\core\addon\CoreInstallService;
use core\base\BaseAdminController;
use think\Response;


class Addon extends BaseAdminController
{
    /**
     * 获取已下载插架
     */
    public function getLocalAddonList()
    {
        return success(( new CoreAddonService() )->getLocalAddonList());
    }

    /**
     * 安装插件
     * @param string $addon
     */
    public function install($addon)
    {
        ( new AddonService() )->install($addon);
        return success('ADDON_INSTALL_SUCCESS');
    }

    /**
     * 查询插件安装状态
     * @param $addon
     */
    public function getInstallState($addon)
    {
        return success(( new AddonService() )->getInstallState($addon));
    }

    /**
     * 卸载插件
     * @param string $addon
     */
    public function uninstall($addon)
    {
        ( new AddonService() )->uninstall($addon);
        return success('ADDON_UNINSTALL_SUCCESS');
    }

    /**
     * 插件列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ 'title', '' ],
        ]);
        return success(( new AddonService() )->getPage($data));
    }

    /**
     * 插件详情
     * @param int $id
     */
    public function info(int $id)
    {
        return success(( new AddonService() )->getInfo($id));
    }

    /**
     * 设置插件状态
     * @param int $id
     * @param int $status
     * @return Response
     */
    public function setStatus(int $id, int $status)
    {
        ( new AddonService() )->setStatus($id, $status);
        return success('SET_SUCCESS');
    }


}
