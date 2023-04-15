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

namespace app\listener\pay;

use app\enum\withdraw\WithdrawTypeEnum;
use app\service\core\member\CoreMemberWithdrawService;

/**
 * 转账事件
 */
class TransferSuccess
{
    public function handle(array $info)
    {
        //会员零钱提现
        if($info['trade_type'] == WithdrawTypeEnum::MEMBER_WITHDRAW)
        {
            return (new CoreMemberWithdrawService())->transferFinish($info['site_id'], $info['transfer_no']);
        }
    }
}