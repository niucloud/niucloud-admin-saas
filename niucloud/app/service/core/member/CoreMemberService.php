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

use app\model\member\Member;
use core\base\BaseCoreService;
use think\db\exception\DbException;

/**
 * 会员信息服务层
 * Class CoreMemberService
 * @package app\service\core\member
 */
class CoreMemberService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Member();
    }
    /**
     * 修改
     * @param int $site_id
     * @param int $member_id
     * @param string $field
     * @param $data
     * @return mixed
     */
    public function modify(int $site_id, int $member_id, string $field, $data)
    {
        $field_name = match ($field) {
            'nickname' => 'nickname',
            'headimg' => 'headimg',
            'member_label' => 'member_label',
            'birthday' => 'birthday',
            'sex' => 'sex',
        };
        $where = array(
            ['site_id', '=', $site_id],
            ['member_id', '=', $member_id],
        );
        return $this->model->where($where)->update([$field_name => $data]);
    }

    /**
     * 通过会员查询openid
     * @param int $site_id
     * @param int $member_id
     * @return void
     */
    public function getInfoByMemberId(int $site_id, int $member_id){
        $where = array(
            ['site_id', '=', $site_id],
            ['member_id', '=', $member_id]
        );
        return $this->model->where($where)->findOrEmpty()->toArray();
    }

    /**
     * 查询会员实例
     * @param int $site_id
     * @param int $member_id
     * @return Member|array|mixed|\think\Model
     */
    public function find(int $site_id, int $member_id){
        $where = array(
            ['site_id', '=', $site_id],
            ['member_id', '=', $member_id]
        );
        return $this->model->where($where)->findOrEmpty();
    }

    /**
     * 会员数量
     * @return int
     * @throws DbException
     */
    public function getCount(array $where = []){
        $condition = array();
        if(!empty($where['site_id'])){
            $condition[] = ['site_id', '=', $where['site_id']];
        }
        if(!empty($where['create_time'])){
            $condition[] = ['create_time', 'between', $where['create_time']];
        }
        if(!empty($where['sex'])){
            $condition[] = ['sex', '=', $where['sex']];
        }
        if(!empty($where['last_visit_time'])){
            $condition[] = ['last_visit_time', 'between', $where['last_visit_time']];
        }
        return $this->model->where($condition)->count();
    }
}