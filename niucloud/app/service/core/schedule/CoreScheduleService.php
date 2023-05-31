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

namespace app\service\core\schedule;

use app\model\sys\SysCronTask;
use core\base\BaseCoreService;
use core\dict\DictLoader;

/**
 * 计划任务服务层
 * Class CoreCronService
 * @package app\service\core\cron
 */
class CoreScheduleService extends BaseCoreService
{
    CONST CROND_LENGTH = 60;

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysCronTask();
    }


    /**
     * 获取自动任务列表
     * @param array $where
     * @return mixed
     */
    public function getList()
    {
        $addon_load = new DictLoader('Schedule');
        $list = $addon_load->load([]);
        return $list;
    }


}