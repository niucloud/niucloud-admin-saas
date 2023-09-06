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

namespace app\adminapi\controller\sys;

use app\service\admin\sys\AppService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 应用管理
 */
class App extends BaseAdminController
{
    /**
     * 获取应用链接列表
     * @return Response
     */
    public function getAppList()
    {
        return success((new AppService())->getAppList());
    }


}
