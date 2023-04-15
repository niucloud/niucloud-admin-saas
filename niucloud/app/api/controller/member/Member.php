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

namespace app\api\controller\member;

use app\api\controller\BaseApiController;
use app\service\api\login\AuthService;
use app\service\api\member\MemberService;
use think\Response;

class Member extends BaseApiController
{

    /**
     * 会员信息
     * @return Response
     */
    public function info(){
        return success((new MemberService())->getInfo());
    }

    /**
     * 会员中心
     * @return Response
     */
    public function center(){
        return success((new MemberService())->center());
    }

    /**
     * 修改会员
     * @param $member_id
     * @param $field
     * @return Response
     */
    public function modify($field){
        $data = $this->request->params([
            ['value', ''],
            ['field', $field],
        ]);
        $data[$field] = $data['value'];
        $this->validate($data, 'app\validate\member\Member.modify');
        (new MemberService())->modify($field, $data['value']);
        return success(100004);
    }

    /**
     * 编辑会员
     * @return Response
     */
    public function update(){
        $data = $this->request->params([
            ['data', []],
        ]);
        (new MemberService())->update($data['data']);
        return success(100004);
    }

    /**
     * 绑定手机号
     * @return void
     */
    public function mobile(){
        $data = $this->request->params([
            ['mobile',  ''],
            ['mobile_code', ''],
        ]);
        return success((new AuthService())->bindMobile($data['mobile'], $data['mobile_code']));
    }
}
