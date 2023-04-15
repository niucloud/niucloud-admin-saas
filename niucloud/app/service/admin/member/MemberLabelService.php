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
use app\service\admin\BaseAdminService;
use app\service\core\member\CoreMemberLabelService;

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
     */
    public function getPage(array $where = [], string $order = 'create_time desc')
    {
        $condition[] = ['site_id', '=', $this->site_id];
        if($where['label_name'])
        {
            $condition[] = ['label_name', 'like', '%'.$where['label_name'].'%'];
        }
        $field = 'label_id, site_id, label_name, memo, sort, create_time, update_time';

        $list = $this->getPageList($this->model, $condition, $field, $order, []);
        return $list;
    }

    /**
     * 获取会员标签信息
     * @param int $label_id
     */
    public function getInfo(int $label_id)
    {
        $field = 'label_id, site_id, label_name, memo, sort, create_time, update_time';

        $info = $this->model->field($field)->where([['label_id', '=', $label_id], ['site_id', '=', $this->site_id]])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 获取标签
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getAll(){
        return (new CoreMemberLabelService())->getAll($this->site_id);
    }
    /**
     * 添加会员标签
     * @param array $data
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
     */
    public function update(int $label_id, array $data)
    {
        $data['update_time'] = time();
        $this->model->where([['label_id', '=', $label_id], ['site_id', '=', $this->site_id]])->save($data);
        (new CoreMemberLabelService())->clearCache($this->site_id);
        return true;
    }

    /**
     * 删除会员标签
     * @param int $label_id
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
     * @return \think\Response
     */
    public function getMemberLabelListByLabelIds(array $label_ids){
        return (new CoreMemberLabelService())->getMemberLabelListByLabelIds($this->site_id, $label_ids);
    }

}