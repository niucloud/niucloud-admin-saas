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

namespace app\service\admin\sys;

use app\model\sys\SysAttachment;
use app\model\sys\SysAttachmentCategory;
use app\service\core\sys\CoreAttachmentService;
use core\base\BaseAdminService;
use core\exception\AdminException;

/**
 * 附件服务层
 * Class CoreAgreementService
 * @package app\service\core\sys
 */
class AttachmentService extends BaseAdminService
{
    public $core_attachment_service;

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysAttachment();
        $this->core_attachment_service = new CoreAttachmentService();
    }

    /**
     * 新增素材
     * @param $params
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        return $this->core_attachment_service->add($data);
    }

    /**
     *
     * /**
     * 编辑素材
     * @param array $data
     * @param $where
     */
    public function edit(int $att_id, array $data)
    {
        return $this->core_attachment_service->edit($this->site_id, $att_id, $data);
    }

    /**
     * 修改附件分组
     * @param $att_id
     * @param $cate_id
     * @return bool
     */
    public function modifyCategory($att_id, $cate_id)
    {
        $where = array(
            ['att_id', '=', $att_id],
            ['site_id', '=', $this->site_id],
        );
        $this->model->where($where)->update(['cate_id' => $cate_id, 'update_time' => time()]);
        return true;
    }

    /**
     * 批量更新附件分组
     * @param $att_id
     * @param $cate_id
     * @return bool
     */
    public function batchModifyCategory($att_ids, $cate_id)
    {

        $where = array(
            ['att_id', 'in', is_string($att_ids) ? explode($att_ids) : $att_ids],
            ['site_id', '=', $this->site_id],
        );
        $this->model->where($where)->update(['cate_id' => $cate_id, 'update_time' => time()]);
        return true;
    }

    /**
     * 删除素材
     * @param int $uid
     * @return mixed
     */
    public function del(int $att_id)
    {
        return $this->core_attachment_service->del($this->site_id, $att_id);
    }

    /**
     * 批量删除
     * @param $data
     * @return true|null
     */
    public function delAll($data)
    {
        return $this->core_attachment_service->delAll($this->site_id, $data);
    }

    /**
     * 管理端获取附件列表
     * @param array $data
     * @return mixed
     */
    public function getPage(array $data)
    {
        $where = array(
            ['site_id', '=', $this->site_id]
        );
        if (!empty($data['att_type'])) {
            $where[] = ['att_type', '=', $data['att_type']];
        }
        if (!empty($data['cate_id'])) {
            $where[] = ['cate_id', '=', $data['cate_id']];
        }
        if (!empty($data['real_name'])) {
            $where[] = ['real_name', 'like', '%' . $data['real_name'] . '%'];
        }
        return $this->getPageList($this->model, $where, 'att_id,path,real_name,att_type,url', 'att_id desc');
    }

    /**
     * 新增素材组
     * @param $params
     */
    public function addCategory(array $data)
    {
        $data['site_id'] = $this->site_id;
        $category_model = new SysAttachmentCategory();
        $attachment = $category_model->create($data);
        if (!$attachment->id)
            throw new AdminException('ADD_FAIL');//创建失败
        return $attachment->att_id;
    }

    /**
     * 素材组模型对象
     * @param int $uid
     * @return mixed
     */
    public function findCategory(int $site_id, int $id)
    {
        $where = array(
            ['site_id', '=', $site_id],
            ['id', '=', $id]
        );
        $category_model = new SysAttachmentCategory();
        $category = $category_model->where($where)->findOrEmpty();
        if ($category->isEmpty())
            throw new AdminException('ATTACHMENT_GROUP_NOT_EXIST');
        return $category;
    }

    /**
     * 编辑素材组
     * @param array $data
     * @param $where
     */
    public function editCategory(int $id, array $data)
    {
        $where = array(
            ['site_id', '=', $this->site_id],
            ['id', '=', $id]
        );
        $category_model = new SysAttachmentCategory();
        $res = $category_model->edit($data, $where);
        return $res;
    }

    /**
     * 删除素材组
     * @param int $uid
     * @return mixed
     */
    public function delCategory(int $id)
    {
        //查询是否有下级菜单或按钮
        $category = $this->findCategory($this->site_id, $id);
        if ($this->model->where([['cate_id', '=', $id]])->count() > 0)
            throw new AdminException('ATTACHMENT_GROUP_HAS_IMAGE');

        //下级存在图片不能删除
        $res = $category->delete();
        return $res;

    }

    /**
     * 管理端获取附件组列表
     * @param array $where
     * @param string $order
     * @param int $limit
     * @return mixed
     */
    public function getCategoryPage(array $data)
    {
        $where = array(
            ['site_id', '=', $this->site_id]
        );
        if (!empty($data['type'])) {
            $where[] = ['type', '=', $data['type']];
        }
        if (!empty($data['name'])) {
            $where[] = ['name', 'like', '%' . $data['name'] . '%'];
        }
        return $this->getPageList((new SysAttachmentCategory()), $where, 'id,name', 'id desc');
    }

    /**
     * 获取分组列表
     * @param array $data
     * @return mixed
     */
    public function getCategoryList(array $data)
    {
        $where = array(
            ['site_id', '=', $this->site_id]
        );
        if (!empty($data['type'])) {
            $where[] = ['type', '=', $data['type']];
        }
        if (!empty($data['name'])) {
            $where[] = ['name', 'like', '%' . $data['name'] . '%'];
        }
        return SysAttachmentCategory::where($where)->field('id,name,type')->order('id desc')->select()->toArray();
    }

}