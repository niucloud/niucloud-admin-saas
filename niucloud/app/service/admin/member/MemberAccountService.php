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
use app\model\member\MemberAccountLog;
use app\service\admin\BaseAdminService;
use app\service\core\member\CoreMemberAccountService;
use extend\exception\AdminException;

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
     * @return mixed
     */
    public function getPage(array $where = [])
    {

        $field = 'id, member_id, site_id, account_type, account_data, from_type, related_id, create_time, memo';
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(['member_id','account_type', 'from_type', 'create_time'],$where)->with('memberInfo')->field($field)->order('create_time desc')->append(['from_type_name', 'account_type_name']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 账户流水详情
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id, member_id, site_id, account_type, account_data, from_type, related_id, create_time, memo';
        return $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->with('memberInfo')->field($field)->findOrEmpty()->append(['from_type_name', 'account_type_name'])->toArray();
    }

    /**
     * 添加调整积分数据
     * @param array $data
     * @return mixed
     */
    public function adjustPoint(array $data)
    {
        $res = (new CoreMemberAccountService())->addLog($this->site_id, $data['member_id'], 'point', $data['account_data'], 'adjust', $data['memo'], 0);
        return $res;
    }

    /**
     * 添加调整余额账户
     * @param array $data
     * @return bool
     */
    public function adjustBalance(array $data)
    {
        $res = (new CoreMemberAccountService())->addLog($this->site_id, $data['member_id'], 'balance', $data['account_data'], 'adjust', $data['memo'], 0);
        return $res;
    }

    /**
     * 获取账户类型的变动方式
     * @param $account_type
     * @return array|mixed|string
     */
    public function getFromType($account_type)
    {
        if(!array_key_exists($account_type, MemberAccountEnum::getType())) throw new AdminException(301007);
        $res = MemberAccountEnum::getFromType($account_type);
        return $res;
    }





}