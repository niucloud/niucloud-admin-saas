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

namespace app\service\api\login;

use app\model\member\Member;
use app\Request;
use app\service\api\BaseApiService;
use app\service\api\member\MemberService;
use extend\exception\AuthException;

/**
 * 登录服务层
 * Class BaseService
 * @package app\service
 */
class AuthService extends BaseApiService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Member();
    }

    public function checkSiteAuth(Request $request){
        $site_id = $request->apiSiteId();//todo  可以是依赖传值,也可以通过domain域名来获取site_id
        //如果登录信息非法就报错
        if($this->member_id > 0){
            $member_service = new MemberService();
            $member_info = $member_service->findMemberInfo(['member_id' => $this->member_id, 'site_id' => $site_id]);
            if($member_info->isEmpty())
                throw new AuthException(301005);
        }
        $request->siteId($site_id);

        return true;
    }

    /**
     * 绑定手机号
     * @param string|int $mobile
     * @return void
     */
    public function bindMobile(string|int $mobile, string $mobile_code){

        if(empty($mobile)){
            $result = (new CoreWeappAuthService())->getUserPhoneNumber($this->site_id, $mobile_code);
            if(empty($result)) throw new ApiException(400002);
            $phone_info = $result['phone_info'];
            $mobile = $phone_info['purePhoneNumber'];
            if(empty($mobile)) throw new ApiException(400002);
        }
        $member_service = new MemberService();
        $member = $member_service->findMemberInfo(['member_id' => $this->member_id, 'site_id' => $this->site_id]);
        if($member->isEmpty()) throw new AuthException(301005);

        $o_mobile = $member['mobile'];//原始手机号
        if(!empty($o_mobile)) throw new AuthException(301020);

        $mobile_member = $member_service->findMemberInfo(['mobile' => $mobile, 'site_id' => $this->site_id]);
        if(!$mobile_member->isEmpty()) throw new AuthException(301001);

        if(empty($mobile)) throw new AuthException(301012);//必须填写
        //todo  校验手机号验证码
        (new LoginService())->checkMobileCode($mobile);
        $member->save([
            'mobile' => $mobile
        ]);
        return true;
    }


}