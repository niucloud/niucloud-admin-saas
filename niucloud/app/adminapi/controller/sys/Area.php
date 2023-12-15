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
use think\Response;

class Area extends BaseAdminController
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
     * @return Response
     */
    public function addressInfo()
    {
        $data = $this->request->params([
            ['address', ''],
        ]);
        return success((new AreaService())->getAddress($data['address']));
    }

    /**
     * @return Response
     */
    public function contraryAddress()
    {
        $data = $this->request->params([
            ['location', ''],
        ]);
        return success((new AreaService())->getAddressInfo($data['location']));
    }

    /**
     *
     * @return void
     */
    public function areaByAreaCode(string $code) {
        return success((new AreaService())->getAreaByAreaCode($code));
    }
}
