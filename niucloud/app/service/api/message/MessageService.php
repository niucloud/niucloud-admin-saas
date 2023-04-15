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

namespace app\service\api\message;

use app\service\api\BaseApiService;
use app\service\core\message\CoreMessageService;

/**
 * 登录服务层
 * Class BaseService
 * @package app\service
 */
class MessageService extends BaseApiService
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 发送消息
     * @param $key
     * @param $data
     * @param bool $is_delay 是否延时
     * @return bool
     */
    public function send($key, $data, bool $is_delay = true)
    {
        return ( new CoreMessageService() )->send($this->site_id, $key, $data, $is_delay);
    }
}