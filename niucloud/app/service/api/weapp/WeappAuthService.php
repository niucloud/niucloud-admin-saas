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

namespace app\service\api\weapp;

use app\dict\member\MemberLoginTypeDict;
use app\dict\member\MemberRegisterTypeDict;
use app\service\api\login\LoginService;
use app\service\api\login\RegisterService;
use app\service\api\member\MemberConfigService;
use app\service\api\member\MemberService;
use app\service\core\weapp\CoreWeappAuthService;
use core\base\BaseApiService;
use core\exception\ApiException;
use core\exception\AuthException;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;


/**
 * 微信配置模型
 * Class WechatConfigService
 * @package app\service\core\wechat
 */
class WeappAuthService extends BaseApiService
{

    public $core_weapp_serve_service;
    public function __construct()
    {
        parent::__construct();
        $this->core_weapp_serve_service = new CoreWeappAuthService();
    }

    /**
     * 通过code获取微信小程序用户信息
     * @param string $code
     * @param string $iv
     * @param string $encrypted_data
     * @return array
     * @throws InvalidArgumentException
     */
    public function getUserInfoByCode(string $code){
//        $iv = $this->request->param('iv', '');
//        $encrypted_data = $this->request->param('encrypted_data', '');
        $result = $this->core_weapp_serve_service->session($this->site_id, $code);
//        if(empty($result)) throw new ApiException('WECHAT_EMPOWER_NOT_EXIST');
//        $userinfo = $this->core_weapp_serve_service->decryptData($result['session_key'], $iv, $encrypted_data);
        $openid = $result['openid'] ?? '';//对应微信的 openid
        $unionid = $result['unionid'] ?? '' ;//对应微信的 unionid
        if(empty($openid)) throw new ApiException('WECHAT_EMPOWER_NOT_EXIST');
        //todo 这儿还可能会获取用户昵称 头像  性别 ....用以更新会员信息
//        $nickname = $userinfo['nickName'] ?? '';//对应微信的 nickname
//        $avatar = $userinfo['avatarUrl'] ?? '';//对应微信的 头像地址
//        $sex = $userinfo['gender'];//性别
        return [
            $openid,
            $unionid,
//            $avatar,
//            $nickname,
//            $sex
        ];
    }

    /**
     * 登录
     * @param string $code
     * @return \app\model\member\Member|array|mixed|\think\Model
     * @throws InvalidArgumentException
     */
    public function login(string $code)
    {

        [
            $openid,
            $unionid,
//            $avatar,
//            $nickname,
//            $sex
        ] = $this->getUserInfoByCode($code);

        $member_service = new MemberService();
        $member_info = $member_service->findMemberInfo(['weapp_openid' => $openid, 'site_id' => $this->site_id]);
        if($member_info->isEmpty()){
            $config = (new MemberConfigService())->getLoginConfig();
            $is_bind_mobile = $config['is_bind_mobile'];
            $is_auth_register = $config['is_auth_register'];
            if($is_bind_mobile == 0 && $is_auth_register == 1){
                return $this->register($openid);
            }else{
                return ['openid' => $openid];
            }
        }else{
            //可能会更新用户和粉丝表
            $login_service = new LoginService();
            return $login_service->login($member_info, MemberLoginTypeDict::WEAPP);
        }
        //todo  业务落地

    }

    /**
     * 注册
     * @param string|array $data
     * @param string $mobile
     * @return \app\model\member\Member|array|mixed|\think\Model
     * @throws InvalidArgumentException
     */
    public function register(string $openid, string $mobile = '', string $mobile_code = ''){

        if(empty($openid)) throw new AuthException('AUTH_LOGIN_TAG_NOT_EXIST');
        //todo openid可能还需要合法性验证
        $config = (new MemberConfigService())->getLoginConfig();
        $is_bind_mobile = $config['is_bind_mobile'];
        if($is_bind_mobile == 1){
            if(empty($mobile)){
                $result = $this->core_weapp_serve_service->getUserPhoneNumber($this->site_id, $mobile_code);
                if(empty($result)) throw new ApiException('WECHAT_EMPOWER_NOT_EXIST');
                $phone_info = $result['phone_info'];
                $mobile = $phone_info['purePhoneNumber'];
                if(empty($mobile)) throw new ApiException('WECHAT_EMPOWER_NOT_EXIST');
                $is_verify_mobile = false;
            }else{
                $is_verify_mobile = true;
            }
        }
        $member_service = new MemberService();
        $member_info = $member_service->findMemberInfo(['weapp_openid' => $openid, 'site_id' => $this->site_id]);

        if(!$member_info->isEmpty()) throw new AuthException('MEMBER_IS_EXIST');//账号已存在, 不能在注册
        $register_service = new RegisterService();
        $result = $register_service->register($mobile ?? '',
            [
                'weapp_openid' => $openid
            ],
            MemberRegisterTypeDict::WEAPP,
            $is_verify_mobile ?? false
        );
        return $result;

    }

}