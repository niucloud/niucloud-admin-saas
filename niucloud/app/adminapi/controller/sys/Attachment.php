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

namespace app\adminapi\controller\sys;

use app\dict\sys\FileDict;
use app\service\admin\sys\AttachmentService;
use core\base\BaseAdminController;
use think\Response;

class Attachment extends BaseAdminController
{

    /**
     * 附件列表
     */
    public function lists()
    {
        $data = $this->request->params([
            ['att_type', ''],
            ['cate_id', 0],
            ['real_name', ''],
            ['page', 0],
            ['limit', 0],
        ]);
        return success((new AttachmentService())->getPage($data));
    }

    /**
     * 删除附件
     * @param $att_id
     * @return Response
     */
//    public function del($att_id)
//    {
//        return success((new AttachmentService())->del($att_id));
//    }

    /**
     * 批量删除
     * @return Response
     */
    public function batchDel(){
        $data = $this->request->params([
            ['att_ids', []],
        ]);
        (new AttachmentService())->delAll($data['att_ids']);
        return success('DELETE_SUCCESS');
    }

    /**
     * 新增附件分组
     * @return Response
     */
    public function addCategory()
    {
        $data = $this->request->params([
            ['type', FileDict::IMAGE],
            ['name', '']
        ]);
        $this->validate($data, 'app\validate\sys\AttachmentCategory.add');
        (new AttachmentService())->addCategory($data);
        return success('ADD_SUCCESS');
    }

    /**
     * 附件分组列表
     */
    public function categoryLists()
    {
        $data = $this->request->params([
            ['type', ''],
            ['name', ''],
        ]);
        return success((new AttachmentService())->getCategoryList($data));
    }

    /**
     * 更新附件分组
     * @return Response
     */
    public function editCategory($id)
    {
        $data = $this->request->params([
            ['name', '']
        ]);
        $this->validate($data, 'app\validate\sys\AttachmentCategory.edit');
        (new AttachmentService())->editCategory($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 删除附件组
     * @param $id
     * @return Response
     */
    public function deleteCategory($id)
    {
        (new AttachmentService())->delCategory($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 移动图片分组
     * @return void
     */
    public function moveCategory($att_id)
    {
        $data = $this->request->params([
            ['cate_id', '']
        ]);
        (new AttachmentService())->modifyCategory($att_id, $data['cate_id']);
        return success('SUCCESS');
    }

    /**
     * 批量移动图片分组
     * @param $att_ids
     * @return Response
     */
    public function batchMoveCategory()
    {
        $data = $this->request->params([
            ['cate_id', ''],
            ['att_ids', []]
        ]);
        (new AttachmentService())->batchModifyCategory($data['att_ids'], $data['cate_id']);
        return success('SUCCESS');
    }

}
