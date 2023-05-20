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

use app\service\admin\addon\TerminalService;
use app\service\admin\sys\SystemService;
use core\base\BaseAdminController;

/**
 * 系统信息查询
 * Class System
 * @package app\adminapi\controller\sys
 */
class Terminal extends BaseAdminController
{
    /**
     * 执行命令行
     * @return array|mixed
     */
    public function exec()
    {
        $commands = $this->request->params([
            ['commands', []],
        ]);
        TerminalService::instance()->exec($commands);
    }

}
