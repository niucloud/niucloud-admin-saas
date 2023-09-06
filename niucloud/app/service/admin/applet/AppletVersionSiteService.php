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

namespace app\service\admin\applet;

use app\service\core\applet\CoreAppletSiteVersionService;
use core\base\BaseAdminService;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

/**
 * 文章服务层
 */
class AppletVersionSiteService extends BaseAdminService
{

    protected $core_applet_site_version_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_applet_site_version_service = new CoreAppletSiteVersionService();
    }

    /**
     * 获取列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        return $this->core_applet_site_version_service->getPage($this->site_id, $where);
    }

    /**
     * 获取信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        return $this->core_applet_site_version_service->getInfo($this->site_id, $id);
    }

    /**
     * 查询最后一个下载或升级的版本
     * @param string $type
     * @return mixed|string
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getLastVersion(string $type){
        return $this->core_applet_site_version_service->getLastVersion($this->site_id, $type);
    }

    /**
     * 查询可升级的版本
     * @param string $type
     * @return null
     */
    public function getUpgradeVersion(string $type){
        return $this->core_applet_site_version_service->getUpgradeVersion($this->site_id, $type);
    }
}