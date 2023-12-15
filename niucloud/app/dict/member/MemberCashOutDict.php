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

namespace app\dict\member;

/**
 * 会员提现
 * Class MemberCashOutDict
 * @package app\dict\member
 */
class MemberCashOutDict
{
    public const WAIT_AUDIT = 1;//待审核
    public const WAIT_TRANSFER = 2;//待转账
    public const TRANSFERED = 3;//已转账
    public const REFUSE = -1;//已拒绝
    public const CANCEL = -2;//已取消

    /**
     * 提现状态
     * @return array
     */
    public static function getStatus()
    {
        return [
            self::WAIT_AUDIT => get_lang('dict_member_cash_out.status_wait_audit'),//待审核
            self::WAIT_TRANSFER => get_lang('dict_member_cash_out.status_wait_transfer'),//待转账
            self::TRANSFERED => get_lang('dict_member_cash_out.status_transfered'),//已转账
            self::REFUSE => get_lang('dict_member_cash_out.status_refuse'),//已拒绝
            self::CANCEL => get_lang('dict_member_cash_out.status_cancel'),//已取消
        ];
    }

}