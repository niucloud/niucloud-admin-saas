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

use app\model\member\MemberCashOutAccount;
use core\base\BaseApiService;

/**
 * 会员提现账户服务层
 */
class MemberCashOutAccountService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberCashOutAccount();
    }

    /**
     * 会员提现账户列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $where['member_id'] = $this->member_id;
        $where['site_id'] = $this->site_id;
        $field = 'account_id,site_id,member_id,account_type,bank_name,realname,account_no';
        $search_model = $this->model->where($where)->field($field)->order('create_time desc');

        return $this->pageQuery($search_model);
    }

    /**
     * 提现账户详情
     * @param int $account_id
     * @return array
     */
    public function getInfo(int $account_id)
    {
        $field = 'account_id,site_id,member_id,account_type,bank_name,realname,account_no';
        return $this->model->where([['account_id', '=', $account_id], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id]])->field($field)->findOrEmpty()->toArray();
    }

    /**
     * 获取首条信息
     * @param array $where
     * @param string $order_field
     * @param string $order
     * @return array
     */
    public function getFirstInfo(array $where, $order_field = 'create_time', string $order = 'desc'){
        $where[] = ['site_id', '=', $this->site_id];
        $where[] = ['member_id', '=', $this->member_id];
        $field = 'account_id,site_id,member_id,account_type,bank_name,realname,account_no';
        return $this->model->where($where)->order($order_field, $order)->field($field)->findOrEmpty()->toArray();
    }

    /**
     * 添加提现账号
     * @param array $data
     * @return  int
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $data['member_id'] = $this->member_id;
        $data['create_time'] = time();
        $res = $this->model->create($data);
        return $res->account_id;
    }

    /**
     * 修改提现账户
     * @param int $account_id
     * @param array $data
     * @return true
     */
    public function edit(int $account_id, array $data)
    {
        $data['update_time'] = time();
        $this->model->update($data, [ [ 'site_id', '=', $this->site_id ], [ 'member_id', '=', $this->member_id ], ['account_id', '=', $account_id] ]);
        return true;
    }

    /**
     * 删除
     * @param int $account_id
     * @return true
     */
    public function del(int $account_id)
    {
        $where = [
            ['member_id', '=', $this->member_id],
            ['site_id', '=', $this->site_id],
            ['account_id', '=', $account_id]
        ];
        $this->model->where($where)->delete();
        return true;
    }
}