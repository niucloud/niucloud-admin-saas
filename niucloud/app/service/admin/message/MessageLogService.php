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

namespace app\service\admin\message;

use app\enum\sys\MessageEnum;
use app\enum\sys\MessageTypeEnum;
use app\model\sys\SysMessage;
use app\model\sys\SysMessageLog;
use app\service\admin\BaseAdminService;
use app\service\core\message\CoreMessageLogService;
use app\service\core\message\CoreMessageService;
use extend\exception\AdminException;

/**
 * 消息管理服务层
 * Class MessageService
 * @package app\service\admin\message
 */
class MessageLogService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysMessageLog();
    }

    /**
     * 消息发送记录
     * @param $where
     * @return mixed
     */
    public function getPage($where)
    {
        return (new CoreMessageLogService())->getPage($this->site_id, $where);
    }

    /**
     * 获取消息发送记录详情
     * @param string $id
     * @return array
     */
    public function getInfo(string $id)
    {
        return (new CoreMessageLogService())->getInfo($this->site_id, $id);
    }
}