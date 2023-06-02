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

use app\dict\member\MemberAccountChangeTypeDict;
use app\dict\member\MemberAccountTypeDict;
use core\base\BaseModel;

/**
 * 会员账户流水（账单）模型
 * Class MemberAccount
 * @package app\model\member
 */
class MemberAccountLog extends BaseModel
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
    protected $name = 'member_account_log';


    /**
     * 账户类型
     * @param $value
     * @param $data
     * @return string
     */
    public function getAccountTypeNameAttr($value,$data)
    {
        return MemberAccountTypeDict::getType()[$data['account_type'] ?? ''] ?? '';
    }

    /**
     * 会员信息
     * @return \think\model\relation\HasOne
     */
    public function memberInfo()
    {
        return $this->hasOne( Member::class, 'member_id', 'member_id')->joinType('left')
            ->withField('member_id,member_no, username, mobile, nickname, headimg')
            ->bind(['username', 'mobile', 'nickname', 'headimg']);
    }

    /**
     * 会员关联
     * @return \think\model\relation\HasOne
     */
    public function member()
    {
        return $this->hasOne( Member::class, 'member_id', 'member_id')->withField('member_id, member_no, username, mobile, nickname, headimg')->joinType('inner');
    }

    /**
     * 获取account_data
     * @param $value
     * @param $data
     * @return int
     */
    public function getAccountDataAttr($value,$data)
    {
        if($data['account_type'] == 'point'|| $data['account_type'] == 'growth')
            return (int)$data['account_data'];
        else
            return $data['account_data'];
    }

    /**
     * 获取account_sum
     * @param $value
     * @param $data
     * @return int
     */
    public function getAccountSumAttr($value,$data)
    {
        if($data['account_type'] == 'point'|| $data['account_type'] == 'growth')
            return (int)$data['account_sum'];
        else
            return $data['account_sum'];
    }

    /**
     * 获取账户变动类型名称
     * @param $value
     * @param $data
     * @return array|mixed|string
     */
    public function getFromTypeNameAttr($value,$data)
    {
        if(isset($data['from_type'])&& isset($data['account_type']))
            return MemberAccountChangeTypeDict::getType($data['account_type'])[$data['from_type']]['name'];
        else
            return '';
    }
    /**
     * 会员搜索
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
     * 会员搜索(用于关联表查询)
     * @param $value
     * @param $data
     */
    public function searchJoinMemberIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('member_account_log.member_id', $value);
        }
    }

    /**
     * 类型搜索
     * @param $value
     * @param $data
     */
    public function searchFromTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('from_type', $value);
        }
    }
    /**
     * 账户类型搜索
     * @param $value
     * @param $data
     */
    public function searchAccountTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('account_type', $value);
        }
    }
    /**
     * 创建时间搜索器
     * @param $value
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]) ;
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]) ;
        if($start_time > 0 && $end_time > 0){
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        }else if($start_time > 0 && $end_time == 0){
            $query->where([['create_time', '>=', $start_time]]);
        }else if($start_time == 0 && $end_time > 0){
            $query->where([['create_time', '<=', $end_time]]);
        }
    }

    /**
     * 创建关联表时间搜索器
     * @param $value
     */
    public function searchJoinCreateTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]) ;
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]) ;
        if($start_time > 0 && $end_time > 0){
            $query->whereBetweenTime('member_account_log.create_time', $start_time, $end_time);
        }else if($start_time > 0 && $end_time == 0){
            $query->where([['member_account_log.create_time', '>=', $start_time]]);
        }else if($start_time == 0 && $end_time > 0){
            $query->where([['member_account_log.create_time', '<=', $end_time]]);
        }
    }


}
