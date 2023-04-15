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

namespace app\service\admin\member;

use app\enum\member\MemberAccountEnum;
use app\enum\member\MemberWithdrawEnum;
use app\model\member\MemberAccountLog;
use app\model\member\MemberWithdraw;
use app\service\admin\BaseAdminService;
use app\service\core\member\CoreMemberAccountService;
use app\service\core\member\CoreMemberWithdrawConfigService;
use app\service\core\member\CoreMemberWithdrawService;
use extend\exception\AdminException;

/**
 * 会员提现设置服务层
 * Class MemberWithdrawService
 * @package app\service\admin\member
 */
class MemberWithdrawConfigService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberWithdraw();
    }


    public function getConfig(){
        return (new CoreMemberWithdrawConfigService())->getMemberWithdrawConfig($this->site_id);
    }

    public function setConfig(array $data){
        (new CoreMemberWithdrawConfigService())->setMemberWithdrawConfig($this->site_id, $data);
        return true;
    }
}