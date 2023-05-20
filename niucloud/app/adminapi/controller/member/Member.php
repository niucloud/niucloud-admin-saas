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

use app\enum\member\MemberEnum;
use app\enum\member\MemberRegisterChannelEnum;
use app\enum\member\MemberRegisterTypeEnum;
use app\service\admin\member\MemberService;
use core\base\BaseAdminController;
use think\Response;

class Member extends BaseAdminController
{
    /**
     * 会员列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['keyword', ''],
            ['register_type', ''],
            ['register_channel', ''],
            ['create_time', []],
            ['member_label', 0],
        ]);
        return success((new MemberService())->getPage($data));
    }

    /**
     * 会员详情
     * @param int $member_id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new MemberService())->getInfo($id));
    }

    /**
     * 添加会员
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            ['nickname', ''],
            ['mobile', ''],
            ['username', ''],
            ['password', ''],
            ['headimg', ''],
            ['member_label', []],
            ['sex', 0],
            ['birthday', ''],
        ]);
        $this->validate($data, 'app\validate\member\Member.add');
        $res = (new MemberService())->add($data);
        return success('ADD_SUCCESS', ['member_id' => $res]);
    }

    /**
     * 修改会员
     * @param $member_id
     * @param $field
     * @return Response
     */
    public function modify($member_id, $field)
    {
        $data = $this->request->params([
            ['value', ''],
            ['field', $field],
        ]);
        $data[$field] = $data['value'];
        $this->validate($data, 'app\validate\member\Member.modify');
        (new MemberService())->modify($member_id, $field, $data['value']);
        return success('MODIFY_SUCCESS');
    }

    /**
     * 更新
     * @return Response
     */
    public function edit($member_id)
    {
        $data = $this->request->params([
            ['nickname', ''],
            ['headimg', ''],
            ['password', ''],
            ['member_label', []],
            ['sex', 0],
            ['birthday', ''],
        ]);
        $this->validate($data, 'app\validate\member\Member.edit');
        $res = (new MemberService())->edit($member_id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 会员使用场景
     * @return array|mixed|string
     */
    public function getMemberRegisterType()
    {
        return success(MemberRegisterTypeEnum::getType());
    }

    /**
     * 会员列表
     * @return Response
     */
    public function getMemberList()
    {
        $data = $this->request->params([
            ['keyword', ''],
        ]);
        return success((new MemberService())->getList($data));
    }

    /**
     * 获取会员注册渠道
     * @return Response
     */
    public function getMemberRegisterChannelType()
    {
        return success(MemberRegisterChannelEnum::getType());
    }

    /**
     * 设置会员的状态
     * @param $status
     * @return void
     */
    public function setStatus($status){
        $data = $this->request->params([
            ['member_ids', []],

        ]);
        $this->validate(['status' => $status], 'app\validate\member\Member.set_status');
        (new MemberService())->setStatus($data['member_ids'], $status);
        return success('EDIT_SUCCESS');
    }

    /**
     * 获取状态枚举
     * @return Response
     */
    public function getStatusList(){
        return success(MemberEnum::getStatus());
    }
}
