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

namespace app\model\member;

use app\dict\member\MemberAccountTypeDict;
use app\dict\member\MemberCashOutDict;
use app\dict\pay\TransferDict;
use app\model\pay\Transfer;
use core\base\BaseModel;
use think\model\relation\HasOne;

/**
 * 会员提现
 */
class MemberCashOut extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'member_cash_out';
    protected $type = [
        'audit_time' => 'timestamp',
        'transfer_time' => 'timestamp',
    ];

    /**
     * 会员信息
     * @return HasOne
     */
    public function memberInfo()
    {
        return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left')
            ->withField('member_id, member_no, username, mobile, nickname, headimg')
            ->bind(['username', 'mobile', 'nickname', 'headimg', 'member_no']);
    }

    /**
     * 会员信息关联列表查询
     * @return HasOne
     */
    public function member()
    {
        return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left');
    }

    /**
     * 转账信息
     * @return HasOne
     */
    public function transfer()
    {
        return $this->hasOne(Transfer::class, 'transfer_no', 'transfer_no')->joinType('left')
            ->withField('transfer_no,  transfer_type, transfer_realname, transfer_mobile, transfer_bank, transfer_account, transfer_voucher, transfer_remark, transfer_fail_reason, transfer_status')->append(['transfer_status_name', 'transfer_type_name']);
    }

    /**
     * 账户类型名称
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getAccountTypeNameAttr($value, $data)
    {
        if (empty($data['account_type']))
            return '';
        return MemberAccountTypeDict::getType()[$data['account_type']] ?? '';
    }

    /**
     * 提现状态名称
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getStatusNameAttr($value, $data)
    {
        if (empty($data['status']))
            return '';
        return MemberCashOutDict::getStatus()[$data['status']] ?? '';
    }

    /**
     * 转账方式名称
     * @param $value
     * @param $data
     * @return array|mixed|string
     */
    public function getTransferTypeNameAttr($value, $data)
    {
        if (empty($data['transfer_type']))
            return '';
        $temp = TransferDict::getTransferType()[$data['transfer_type']] ?? [];
        return $temp['name'] ?? '';
    }

    /**
     * 转账状态名称
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getTransferStatusNameAttr($value, $data)
    {
        if (empty($data['transfer_status']))
            return '';
        return TransferDict::getStatus()[$data['transfer_status']] ?? '';
    }

    /**
     * 会员搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchMemberIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('member_id', $value);
        }
    }

    /**
     * 状态搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('status', $value);
        }
    }

    /**
     *
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchCashOutNoAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('cash_out_no', $value);
        }
    }

    /**
     *
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchTransferTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('transfer_type', $value);
        }
    }

    /**
     * 创建时间搜索器
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['create_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['create_time', '<=', $end_time]]);
        }
    }

    /**
     * 创建时间搜索器
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchJoinCreateTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('member_cash_out.create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['member_cash_out.create_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['member_cash_out.create_time', '<=', $end_time]]);
        }
    }

    /**
     * 审核时间搜索器
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchAuditTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('audit_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['audit_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['audit_time', '<=', $end_time]]);
        }
    }

    /**
     * 审核时间搜索器
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchTransferTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('transfer_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['transfer_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['transfer_time', '<=', $end_time]]);
        }
    }

}
