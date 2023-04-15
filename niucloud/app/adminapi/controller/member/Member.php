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

use app\adminapi\controller\BaseAdminController;
use app\enum\member\MemberRegisterTypeEnum;
use app\service\admin\member\MemberService;
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
            [ 'keyword', '' ],
            [ 'register_type', '' ],
            [ 'create_time', [] ],
            [ 'member_label', 0 ],
        ]);
        return success(( new MemberService() )->getPage($data));
    }

    /**
     * 会员详情
     * @param int $member_id
     * @return Response
     */
    public function info(int $id)
    {
        return success(( new MemberService() )->getInfo($id));
    }

    /**
     * 添加会员
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            [ 'nickname', '' ],
            [ 'mobile', '' ],
            [ 'username', '' ],
            [ 'password', '' ],
            [ 'headimg', '' ],
            [ 'member_label', [] ],
            [ 'sex', 0 ],
            [ 'birthday', '' ],
        ]);
        $this->validate($data, 'app\validate\member\Member.add');
        $res = ( new MemberService() )->add($data);
        return success(100011, [ 'member_id' => $res ]);
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
            [ 'value', '' ],
            [ 'field', $field ],
        ]);
        $data[ $field ] = $data[ 'value' ];
        $this->validate($data, 'app\validate\member\Member.modify');
        ( new MemberService() )->modify($member_id, $field, $data[ 'value' ]);
        return success(100004);
    }

    /**
     * 更新
     * @return Response
     */
    public function update($member_id)
    {
        $data = $this->request->params([
            [ 'nickname', '' ],
            [ 'headimg', '' ],
            [ 'password', '' ],
            [ 'member_label', [] ],
            [ 'sex', 0 ],
            [ 'birthday', '' ],
        ]);
        $this->validate($data, 'app\validate\member\Member.update');
        $res = ( new MemberService() )->update($member_id, $data);
        return success(100002);
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
    public function getMemberList(){
        $data = $this->request->params([
            [ 'keyword', '' ],
        ]);
        return success(( new MemberService() )->getList($data));
    }
}
