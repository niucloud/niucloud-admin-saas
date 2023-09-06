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

namespace app\adminapi\controller\weapp;

use core\base\BaseAdminController;

class Package extends BaseAdminController
{

    public function lists()
    {
        return success();
    }

    public function add()
    {
        $data = $this->request->params([
            ['version', ''],
            ['path', ''],
            ['desc', ''],
            ['config', []],
        ]);

    }

}
