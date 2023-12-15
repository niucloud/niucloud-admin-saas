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

namespace addon\hello_world\app\adminapi\controller;


use core\base\BaseAdminController;

class Index extends BaseAdminController
{
    /**
     * 接口数据
     */
    public function index()
    {
        return success("HELLO_WORLD_RETURN");
    }


}
