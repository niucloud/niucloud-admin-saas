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

namespace core\base;

/**
 * 手机前端基础服务层
 * Class BaseApiService
 * @package app\service\api
 */
class BaseApiService extends BaseService
{

    protected $site_id;
    protected $member_id;
    protected $channel;

    public function __construct()
    {
        parent::__construct();
        $this->site_id = $this->request->siteId();
        $this->member_id = $this->request->memberId();
        $this->channel = $this->request->getChannel();
    }
}