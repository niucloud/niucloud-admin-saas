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

namespace app\service\admin\weapp;

use core\base\BaseAdminService;

/**
 * 小程序包版本发布
 */
class WeappPackageService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Applet();
    }

    public function add(array $data)
    {
        $data['version_num'] = version_to_int($data['version']);//版本号数字
        $data['u'] = $this->uid;//发布者
        $data['status'] = '';
    }
}