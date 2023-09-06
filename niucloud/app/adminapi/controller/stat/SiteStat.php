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

namespace app\adminapi\controller\stat;

use app\service\admin\stat\SiteStatService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 统计数据
 * Class Stat
 * @package app\adminapi\controller\stat
 */
class SiteStat extends BaseAdminController
{
    /**
     * 首页数据
     * @return Response
     */
    public function index()
    {
        $data = (new SiteStatService())->getIndexData();
        return success($data);

    }
}
