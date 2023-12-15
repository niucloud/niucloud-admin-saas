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

use app\service\core\addon\CoreAddonService;
use core\base\BaseAdminController;


class App extends BaseAdminController
{
    /**
     * 获取应用管理列表
     */
    public function getAppList()
    {
        return success((new CoreAddonService())->getAppList());
    }

}
