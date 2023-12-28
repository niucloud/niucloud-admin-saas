<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\api\controller\sys;

use app\service\api\sys\AreaService;
use core\base\BaseApiController;
use think\Response;

class Area extends BaseApiController
{
    /**
     * 拖过pid获取子项列表
     * @param int $pid
     * @return Response
     */
    public function listByPid(int $pid)
    {
        return success((new AreaService())->getListByPid($pid));
    }

    /**
     * 获取层级列表
     * @param int $level
     * @return Response
     */
    public function tree(int $level)
    {
        return success((new AreaService())->getAreaTree($level));
    }

    /**
     *
     * @return void
     */
    /**
     * 通过编码查询地址信息
     */
    public function areaByAreaCode(string $code) {
        return success((new AreaService())->getAreaByAreaCode($code));
    }
}
