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

namespace app\adminapi\controller\member;

use app\service\admin\member\MemberLabelService;
use core\base\BaseAdminController;
use think\Response;

class MemberLabel extends BaseAdminController
{
    /**
     * 会员标签列表
     * @return Response
     */
    public function lists(){
        $data = $this->request->params([

            ['label_name', ''],
        ]);
        return success((new MemberLabelService())->getPage($data));
    }

    /**
     * 会员标签详情
     * @param int $id
     */
    public function info(int $id){
        return success((new MemberLabelService())->getInfo($id));
    }

    /**
     * 添加会员标签
     * @return Response
     */
    public function add(){
        $data = $this->request->params([

            ['label_name', ''],
            ['memo', ''],
            ['sort', 0],
        ]);
        $this->validate($data, 'app\validate\member\MemberLabel.add');
        $id = (new MemberLabelService())->add($data);
        return success('ADD_SUCCESS', ['label_id' => $id]);
    }

    /**
     * 菜单或接口更新
     */
    public function edit($id){
        $data = $this->request->params([
            ['label_name', ''],
            ['memo', ''],
            ['sort', 0],
        ]);
        $this->validate($data, 'app\validate\member\MemberLabel.edit');
        (new MemberLabelService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 会员标签删除
     * @param int $id
     */
    public function del(int $id){

        (new MemberLabelService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 获取标签
     * @return void
     */
    public function getAll(){
        return success((new MemberLabelService())->getAll());
    }

}
