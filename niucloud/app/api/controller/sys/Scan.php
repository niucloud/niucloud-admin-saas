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

namespace app\api\controller\sys;

use app\api\controller\BaseApiController;
use app\service\api\scan\ScanService;
use think\Response;

class Scan extends BaseApiController
{

    /**
     * 校验扫码信息
     * @return Response
     */
    public function checkScan(){
        $data = $this->request->params([
            ['key',  ''],
        ]);
        return success((new ScanService())->checkScan($data['key']));
    }

}
