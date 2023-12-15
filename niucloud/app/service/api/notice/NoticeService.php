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

namespace app\service\api\notice;

use app\model\sys\SysNotice;
use core\base\BaseApiService;

/**
 * 登录服务层
 * Class BaseService
 * @package app\service
 */
class NoticeService extends BaseApiService
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 发送消息
     * @param $key
     * @param $data
     * @return bool
     */
    public function send($key, $data)
    {
        return ( new \app\service\core\notice\NoticeService() )->send($this->site_id, $key, $data);
    }

    /**
     * 获取微信小程序订阅消息模板id
     * @param string $keys
     * @return array
     */
    public function getWeappNoticeTemplateId(string $keys) {
        return (new SysNotice())->where([ ['site_id', '=', $this->site_id], ['key', 'in', explode(',', $keys) ], ['weapp_template_id', '<>', ''], ['is_weapp', '=', 1] ])->column('weapp_template_id');
    }
}