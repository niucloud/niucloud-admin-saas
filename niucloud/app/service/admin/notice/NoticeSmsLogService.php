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

namespace app\service\admin\notice;

use app\model\sys\SysNoticeLog;
use app\service\core\notice\CoreNoticeLogService;
use app\service\core\notice\CoreNoticeSmsLogService;
use core\base\BaseAdminService;

/**
 * 消息管理服务层
 */
class NoticeSmsLogService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysNoticeLog();
    }

    /**
     * 获取当前站点消息
     * @return array
     */
    public function getPage($where)
    {
        return (new CoreNoticeSmsLogService())->getPage($this->site_id, $where);
    }

    /**
     * 获取消息内容
     * @param string $key
     */
    public function getInfo(string $key)
    {
        return (new CoreNoticeLogService())->getInfo($this->site_id, $key);
    }
}