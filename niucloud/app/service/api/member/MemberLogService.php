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

namespace app\service\api\member;

use core\base\BaseApiService;

/**
 * 会员日志服务层
 * Class MemberService
 * @package app\service\api\member
 */
class MemberLogService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();

    }

    /**
     * 会员日志
     * @param array $data
     * @return true
     */
    public function log(array $data){
        (new MemberService())->edit(['last_visit_time' => time()]);
        return true;
    }


}