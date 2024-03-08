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

use app\dict\common\ChannelDict;
use app\dict\site\SiteDict;
use app\model\member\Member;
use app\Request;
use app\service\api\member\MemberService;
use app\service\core\channel\CoreH5Service;
use app\service\core\channel\CorePcService;
use app\service\core\site\CoreSiteService;
use app\service\core\weapp\CoreWeappAuthService;
use core\base\BaseApiService;
use core\exception\ApiException;
use core\exception\AuthException;

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
        //如果登录信息非法就报错
        if($this->member_id > 0){
            $member_service = new MemberService();
            $member_info = $member_service->findMemberInfo(['member_id' => $this->member_id, 'site_id' => $this->site_id]);
            if($member_info->isEmpty())
                throw new AuthException('MEMBER_NOT_EXIST', 401);
        }
        return true;
    }

    /**
     * 校验渠道
     * @param Request $request
     * @return void
     */
    public function checkChannel(Request $request) {
        $channel = $request->getChannel();
        $site_id = $request->apiSiteId();

        switch ($channel) {
            case ChannelDict::H5:
                $is_open = (int)(new CoreH5Service())->getH5($site_id)['is_open'];
                if (!$is_open) throw new AuthException('SITE_CLOSE_NOT_ALLOW', 402);
                break;
            case ChannelDict::PC:
                $is_open = (int)(new CorePcService())->getPc($site_id)['is_open'];
                if (!$is_open) throw new AuthException('SITE_CLOSE_NOT_ALLOW', 402);
                break;
        }
    }

    /**
     * 检测站点的合法性
     * @param Request $request
     * @return true
     */
    public function checkSite(Request $request){
        $site_id = $request->apiSiteId();//todo  可以是依赖传值,也可以通过domain域名来获取site_id
        $site_info = (new CoreSiteService())->getSiteCache($site_id);
        if(empty($site_info)) throw new AuthException('SITE_NOT_EXIST');
        $rule = strtolower(trim($request->rule()->getRule()));
        if($rule != 'site'){
            if ($site_info['status'] == SiteDict::CLOSE || $site_info['expire_time'] < time()) throw new AuthException('SITE_CLOSE_NOT_ALLOW', 402);
        }
        $request->siteId($site_id);
        return true;
    }

    /**
     * 绑定手机号
     * @param string $mobile
     * @param string $mobile_code
     * @return true
     */
        public function bindMobile(string $mobile, string $mobile_code){

        if(empty($mobile)){
            $result = (new CoreWeappAuthService())->getUserPhoneNumber($this->site_id, $mobile_code);
            if(empty($result)) throw new ApiException('WECHAT_EMPOWER_NOT_EXIST');
            $phone_info = $result['phone_info'];
            $mobile = $phone_info['purePhoneNumber'];
            if(empty($mobile)) throw new ApiException('WECHAT_EMPOWER_NOT_EXIST');
        }else{
            //todo  校验手机号验证码
            (new LoginService())->checkMobileCode($mobile);
        }
        $member_service = new MemberService();
        $member = $member_service->findMemberInfo(['member_id' => $this->member_id, 'site_id' => $this->site_id]);
        if($member->isEmpty()) throw new AuthException('MEMBER_NOT_EXIST');

        $o_mobile = $member['mobile'];//原始手机号
        if(!empty($o_mobile)) throw new AuthException('MOBILE_IS_BIND_MEMBER');

        $mobile_member = $member_service->findMemberInfo(['mobile' => $mobile, 'site_id' => $this->site_id]);
        if(!$mobile_member->isEmpty()) throw new AuthException('MOBILE_IS_EXIST');

//        if(empty($mobile)) throw new AuthException('MOBILE_NEEDED');//必须填写
        $member->save([
            'mobile' => $mobile
        ]);
        return true;
    }


}
