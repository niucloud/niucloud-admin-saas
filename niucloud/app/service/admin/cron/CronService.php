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

namespace app\service\admin\cron;

use app\service\core\schedule\CoreCronService;
use core\base\BaseAdminService;

/**
 * 自动任务服务层
 * Class SiteGroupService
 * @package app\service\admin\site
 */
class CronService extends BaseAdminService
{
    protected $core_cron_service;
    public function __construct()
    {
        parent::__construct();
        $this->core_cron_service = new CoreCronService();
    }

    /**
     * 自动任务列表
     * @param array $where
     * @return mixed
     */
    public function getPage(array $where = [])
    {
        return $this->core_cron_service->getPage($this->site_id, $where);
    }


    /**
     * 分组详情
     * @param int $group_id
     * @return array
     */
    public function getInfo(int $id)
    {
        return $this->core_cron_service->getInfo($this->site_id, $id);

    }



}