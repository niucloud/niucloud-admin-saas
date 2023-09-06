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

use app\dict\member\MemberAccountChangeTypeDict;
use app\dict\member\MemberAccountTypeDict;
use app\model\member\Member;
use app\model\member\MemberAccountLog;
use app\service\core\member\CoreMemberAccountService;
use core\base\BaseAdminService;
use core\exception\AdminException;

/**
 * 会员账户流水服务层（会员个人账户通过会员服务层查询）
 * Class MemberAccountService
 * @package app\service\admin\member
 */
class MemberAccountService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberAccountLog();
    }

    /**
     * 会员账户流水列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {

        $field = 'member_account_log.id, member_account_log.member_id, member_account_log.site_id, member_account_log.account_type, member_account_log.account_data,member_account_log.account_sum, member_account_log.from_type, member_account_log.related_id, member_account_log.create_time, member_account_log.memo';
        $member_where = [];
        if (!empty($where[ 'keywords' ])) {
            $member_where[] = [ "member.member_no|member.nickname|member.mobile", 'like', '%' . $where[ 'keywords' ] . '%' ];
        }
        $search_model = $this->model->where([ [ 'member_account_log.site_id', '=', $this->site_id ] ])->withSearch([ 'join_member_id' => 'member_id', 'account_type', 'from_type', 'join_create_time' => 'create_time' ], $where)->withJoin([ 'member' => function($query) {
            $query->field("member.nickname, member.headimg, member.mobile, member.member_id, member.member_no");
        }
        ])->where($member_where)->field($field)->order('create_time desc')->append([ 'from_type_name', 'account_type_name' ]);
        return $this->pageQuery($search_model);
    }

    /**
     * 账户流水详情
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id, member_id, site_id, account_type, account_data, from_type, related_id, create_time, memo';
        return $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->with('memberInfo')->field($field)->append([ 'from_type_name', 'account_type_name' ])->findOrEmpty()->toArray();
    }

    /**
     * 添加调整积分数据
     * @param array $data
     * @return mixed
     */
    public function adjustPoint(array $data)
    {
        return ( new CoreMemberAccountService() )->addLog($this->site_id, $data[ 'member_id' ], 'point', $data[ 'account_data' ], 'adjust', $data[ 'memo' ]);
    }

    /**
     * 添加调整余额账户
     * @param array $data
     * @return bool
     */
    public function adjustBalance(array $data)
    {
        return ( new CoreMemberAccountService() )->addLog($this->site_id, $data[ 'member_id' ], 'balance', $data[ 'account_data' ], 'adjust', $data[ 'memo' ]);
    }

    public function adjustMoney(array $data)
    {
        return ( new CoreMemberAccountService() )->addLog($this->site_id, $data[ 'member_id' ], MemberAccountTypeDict::MONEY, $data[ 'account_data' ], 'adjust', $data[ 'memo' ]);
    }

    /**
     * 获取账户类型的变动方式
     * @param $account_type
     * @return array|mixed|string
     */
    public function getFromType($account_type)
    {
        if (!array_key_exists($account_type, MemberAccountTypeDict::getType())) throw new AdminException('MEMBER_TYPE_NOT_EXIST');
        return MemberAccountChangeTypeDict::getType($account_type);
    }

    /**
     * 获取账户数据和
     * @param string $account_type (注意查询对应账户)
     */
    public function getSumAccount(string $account_type)
    {
        return $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'account_type', '=', $account_type ] ])->sum('account_data');
    }

    /**
     * 会员账户详情
     * @param int $member_id
     * @return array
     */
    public function getMemberAccountInfo(int $member_id)
    {
        $field = 'point, point_get, balance, balance_get, growth, growth_get, money, money_get, commission, commission_get';
        return ( new Member() )->where([ [ 'member_id', '=', $member_id ], [ 'site_id', '=', $this->site_id ] ])->field($field)->findOrEmpty()->toArray();
    }

    /**
     * 已提现佣金
     * @return float
     */
    public function getWithdrawnCommission(int $member_id = 0)
    {
        $condition = [
            [ 'site_id', '=', $this->site_id ],
            [ 'account_type', '=', MemberAccountTypeDict::COMMISSION ],
            [ 'from_type', '=', 'cash_out' ]
        ];
        if (!empty($member_id)) $condition[] = [ 'member_id', '=', $member_id ];

        return $this->model->where($condition)->sum('account_data');
    }

    /**
     * 账户支出总额
     * @return float
     */
    public function getExpensesSumAccount(string $account_type, int $member_id = 0)
    {
        $condition = [
            [ 'site_id', '=', $this->site_id ],
            [ 'account_type', '=', $account_type ],
            [ 'account_data', '<', '0' ]
        ];
        if (!empty($member_id)) $condition[] = [ 'member_id', '=', $member_id ];

        return $this->model->where($condition)->sum('account_data');
    }

}