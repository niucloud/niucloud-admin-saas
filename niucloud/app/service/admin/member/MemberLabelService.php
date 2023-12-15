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

use app\model\member\MemberLabel;
use app\service\core\member\CoreMemberLabelService;
use core\base\BaseAdminService;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Response;

/**
 * 会员标签
 * Class MemberLabelService
 * @package app\service\admin\member
 */
class MemberLabelService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberLabel();
    }

    /**
     * 获取会员标签列表
     * @param array $where
     * @param string $order
     * @return array
     */
    public function getPage(array $where = [], string $order = 'create_time desc')
    {
        $field = 'label_id, site_id, label_name, memo, sort, create_time, update_time';
        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ 'label_name'], $where)->field($field)->append(["member_num"])->order($order);
        return $this->pageQuery($search_model);
    }

    /**
     * 获取会员标签信息
     * @param int $label_id
     * @return array
     */
    public function getInfo(int $label_id)
    {
        $field = 'label_id, site_id, label_name, memo, sort, create_time, update_time';

        return $this->model->field($field)->where([['label_id', '=', $label_id], ['site_id', '=', $this->site_id]])->findOrEmpty()->toArray();
    }

    /**
     * 获取标签
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getAll(){
        return (new CoreMemberLabelService())->getAll($this->site_id);
    }

    /**
     * 添加会员标签
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $res = $this->model->create($data);
        (new CoreMemberLabelService())->clearCache($this->site_id);
        return $res->label_id;

    }

    /**
     * 会员标签编辑
     * @param int $label_id
     * @param array $data
     * @return true
     */
    public function edit(int $label_id, array $data)
    {
        $data['update_time'] = time();
        $this->model->where([['label_id', '=', $label_id], ['site_id', '=', $this->site_id]])->save($data);
        (new CoreMemberLabelService())->clearCache($this->site_id);
        return true;
    }

    /**
     * 删除会员标签
     * @param int $label_id
     * @return bool
     */
    public function del(int $label_id)
    {
        $res = $this->model->where([['label_id', '=', $label_id], ['site_id', '=', $this->site_id]])->delete();
        (new CoreMemberLabelService())->clearCache($this->site_id);
        return $res;
    }

    /**
     * 通过标签id获取标签列表
     * @param array $label_ids
     * @return Response
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getMemberLabelListByLabelIds(array $label_ids){
        return (new CoreMemberLabelService())->getMemberLabelListByLabelIds($this->site_id, $label_ids);
    }

}