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

namespace app\service\api\wechat;


use app\dict\member\MemberLoginTypeDict;
use app\dict\member\MemberRegisterTypeDict;
use app\dict\scan\ScanDict;
use app\service\api\login\LoginService;
use app\service\api\login\RegisterService;
use app\service\api\member\MemberConfigService;
use app\service\api\member\MemberService;
use app\service\core\scan\CoreScanService;
use app\service\core\wechat\CoreWechatFansService;
use app\service\core\wechat\CoreWechatServeService;
use core\base\BaseApiService;
use core\exception\ApiException;
use core\exception\AuthException;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;


/**
 * 微信配置模型
 * Class WechatConfigService
 * @package app\service\core\wechat
 */
class WechatAuthService extends BaseApiService
{

    public $core_wechat_serve_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_wechat_serve_service = new CoreWechatServeService();
    }

    /**
     * 网页授权
     * @param $url
     * @param $scopes
     * @return string
     * @throws InvalidArgumentException
     */
    public function authorization(string $url = '', string $scopes = 'snsapi_base')
    {
        //todo  业务落地
        return ['url' => $this->core_wechat_serve_service->authorization($this->site_id, $url, $scopes)];
    }

    /**
     * 处理授权回调
     * @param $code
     * @return string
     * @throws InvalidArgumentException
     */
    public function userFromCode(string $code)
    {
        $userinfo = $this->core_wechat_serve_service->userFromCode($this->site_id, $code);
        if (empty($userinfo)) throw new ApiException('WECHAT_EMPOWER_NOT_EXIST');
        $token_response = $userinfo->getTokenResponse();
        if (empty($token_response)) throw new ApiException('WECHAT_EMPOWER_NOT_EXIST');
        $scope = $token_response['scope'];
        if ($scope == 'snsapi_base') {//静默授权
            $openid = $token_response['openid'] ?? '';
        } else {
            $openid = $userinfo->getId();//对应微信的 openid
            $nickname = $userinfo->getNickname();//对应微信的 nickname
            $avatar = $userinfo->getAvatar();//对应微信的 头像地址
        }
        if (empty($openid)) throw new ApiException('WECHAT_EMPOWER_NOT_EXIST');
        //todo 这儿还可能会获取用户昵称 头像  性别 ....用以更新会员信息
        return [$avatar ?? '', $nickname ?? '', $openid];
        //todo  业务落地
    }

    /**
     * 登录通过code
     * @param string $code
     * @return array|string[]|null
     * @throws InvalidArgumentException
     */
    public function loginByCode(string $code){
        [$avatar, $nickname, $openid] = $this->userFromCode($code);
        return $this->login($openid, $nickname, $avatar);
    }
    /**
     * 公众号登录
     * @param string $code
     * @return array|null
     * @throws InvalidArgumentException
     */
    public function login(string $openid, string $nickname = '', string $avatar = '')
    {

        $member_service = new MemberService();
        $member_info = $member_service->findMemberInfo(['wx_openid' => $openid, 'site_id' => $this->site_id]);
        if ($member_info->isEmpty()) {
            $config = (new MemberConfigService())->getLoginConfig();
            $is_bind_mobile = $config['is_bind_mobile'];
            $is_auth_register = $config['is_auth_register'];
            if ($is_bind_mobile == 0 && $is_auth_register == 1) {
                return $this->register($openid);
            } else {
                return ['avatar' => $avatar, 'nickname' => $nickname, 'openid' => $openid];
            }
        } else {
            //可能会更新用户和粉丝表
            $login_service = new LoginService();
            return $login_service->login($member_info, MemberLoginTypeDict::WECHAT);
        }
    }

    /**
     * 同步数据
     * @param string $code
     * @return true
     * @throws InvalidArgumentException
     */
    public function sync(string $code)
    {
        [$avatar, $nickname, $openid] = $this->userFromCode($code);
        //更新粉丝
        $core_wechat_fans_service = new CoreWechatFansService();
        //这儿或许可以异步
        $core_wechat_fans_service->edit($this->site_id, $openid, ['avatar' => $avatar, 'nickname' => $nickname]);
        $member_service = new MemberService();
        $member_info = $member_service->findMemberInfo(['wx_openid' => $openid, 'site_id' => $this->site_id]);
        if ($member_info->isEmpty()) throw new AuthException('MEMBER_NOT_EXIST');//账号不存在
        $member_service->editByFind($member_info, ['headimg' => $avatar, 'nickname' => $nickname]);
        return true;
    }

    /**
     * 注册
     * @param string|array $data
     * @return void
     * @throws InvalidArgumentException
     */
    public function register(string $openid, string|int $mobile = '')
    {
        $member_service = new MemberService();
        $member_info = $member_service->findMemberInfo(['wx_openid' => $openid, 'site_id' => $this->site_id]);
        if (!$member_info->isEmpty()) throw new AuthException('MEMBER_IS_EXIST');//账号已存在, 不能在注册
        $register_service = new RegisterService();
        $result = $register_service->register($mobile,
            [
                'wx_openid' => $openid,
            ],
            MemberRegisterTypeDict::WECHAT
        );
        return $result;

    }

    /**
     * 获取jssdkconfig
     * @param string $url
     * @return array|string
     */
    public function jssdkConfig(string $url = '')
    {
        return $this->core_wechat_serve_service->jssdkConfig($this->site_id, $url);
    }


    /**
     * 扫码登录
     * @return array
     */
    public function scanLogin()
    {
        $data = array(
            'channel' => $this->channel,
        );

        $key = (new  CoreScanService())->scan($this->site_id, ScanDict::WECHAT_LOGIN, $data, 300);
        $url = $this->core_wechat_serve_service->scan($this->site_id, $key, 300);
        return [
            'url' => $url,
            'key' => $key
        ];
    }
}