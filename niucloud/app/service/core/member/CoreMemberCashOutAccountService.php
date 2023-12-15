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

namespace app\service\core\member;

use app\model\member\MemberCashOutAccount;
use core\base\BaseCoreService;

/**
 * 会员提现账户服务层
 * Class CoreMemberService
 * @package app\service\core\member
 */
class CoreMemberCashOutAccountService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberCashOutAccount();
    }

    public function getInfo(int $account_id, int $site_id, int $member_id){
        $field = 'account_id,site_id,member_id,account_type,bank_name,realname,account_no';
        return $this->model->where([['account_id', '=', $account_id], ['site_id', '=', $site_id], ['member_id', '=', $member_id]])->field($field)->findOrEmpty()->toArray();
    }
}