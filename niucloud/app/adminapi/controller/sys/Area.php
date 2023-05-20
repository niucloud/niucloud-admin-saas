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

use app\service\admin\sys\AreaService;
use core\base\BaseAdminController;

class Area extends BaseAdminController
{
    /**
     * 拖过pid获取子项列表
     * @param int $pid
     * @return mixed
     */
    public function listByPid(int $pid){
        return success((new AreaService())->getListByPid($pid));
    }

    /**
     * 获取层级列表
     * @param int $level
     * @return mixed
     */
    public function tree(int $level)
    {
        return success((new AreaService())->getAreaTree($level));
    }
}
