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

use app\model\member\MemberAccountLog;
use core\base\BaseApiService;
use think\db\exception\DbException;

/**
 * 会员账户流水服务层（会员个人账户通过会员服务层查询）
 * Class MemberAccountService
 * @package app\service\admin\member
 */
class MemberAccountService extends BaseApiService
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
        $where['member_id'] = $this->member_id;
        $field = 'id, member_id, site_id, account_type, account_data, from_type, related_id, create_time, memo';
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(['member_id','account_type', 'from_type', 'create_time'],$where)->field($field)->order('create_time desc')->append(['from_type_name', 'account_type_name']);
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
        return $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id]])->field($field)->append(['from_type_name', 'account_type_name'])->findOrEmpty()->toArray();
    }

    /**
     * 会员账户统计数量
     * @param array $where
     * @return int
     * @throws DbException
     */
    public function getCount(array $where = []){
        $where['member_id'] = $this->member_id;

        return $this->model->where([['site_id', '=', $this->site_id]])->withSearch(['member_id','account_type', 'from_type', 'create_time'],$where)->count();
    }

}