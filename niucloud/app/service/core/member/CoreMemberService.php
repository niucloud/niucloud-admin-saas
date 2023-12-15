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
use app\model\site\Site;
use core\base\BaseCoreService;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Model;

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
     * @return Member
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
     * @return array
     */
    public function getInfoByMemberId(int $site_id, int $member_id, string $field = '*'){
        $where = array(
            ['site_id', '=', $site_id],
            ['member_id', '=', $member_id]
        );
        return $this->model->where($where)->field($field)->findOrEmpty()->toArray();
    }

    /**
     * 查询会员实例
     * @param int $site_id
     * @param int $member_id
     * @return Member|array|mixed|Model
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

    /**
     * 生成会员编码
     * @param int $site_id
     * @return string
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public static function createMemberNo(int $site_id) {
        $site = (new Site())->where([ ['site_id', '=', $site_id] ])->find();
        $config = (new CoreMemberConfigService())->getMemberConfig($site_id);

        $no = $site->member_no + 1;
        $member_no = $config['prefix'] . ( strlen($config['prefix']) > $config['length'] ? $no : str_pad($no, ($config['length'] - strlen($config['prefix'])), "0", STR_PAD_LEFT) );

        $member = (new Member())->where([ ['site_id', '=', $site_id], ['member_no', '=', $member_no] ])->findOrEmpty();

        if ($member->isEmpty()) {
            return $member_no;
        } else {
            // 变更站点最大会员码值
            $site->save(['member_no' => $no ]);
            return self::createMemberNo($site_id);
        }
    }

    /**
     * 设置会员会员码
     * @param int $site_id
     * @param int $member_id
     * @return void
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public static function setMemberNo(int $site_id, int $member_id) {
        $site = (new Site())->where([ ['site_id', '=', $site_id] ])->find();
        $config = (new CoreMemberConfigService())->getMemberConfig($site_id);

        $no = $site->member_no + 1;
        $member_no = $config['prefix'] . ( strlen($config['prefix']) > $config['length'] ? $no : str_pad($no, ($config['length'] - strlen($config['prefix'])), "0", STR_PAD_LEFT) );

        $member = (new Member())->where([ ['site_id', '=', $site_id], ['member_no', '=', $member_no] ])->findOrEmpty();

        // 变更站点最大会员码值
        $site->save(['member_no' => $no ]);

        if ($member->isEmpty()) {
            (new Member())->update([ 'member_no' => $member_no ], [ ['site_id', '=', $site_id], ['member_id', '=', $member_id] ]);
        } else {
            self::setMemberNo($site_id, $member_id);
        }
    }
}
