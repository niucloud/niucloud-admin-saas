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

use app\dict\member\MemberLoginTypeDict;
use app\dict\sys\AppTypeDict;
use app\dict\sys\SmsDict;
use app\model\member\Member;
use app\service\api\captcha\CaptchaService;
use app\service\api\member\MemberConfigService;
use app\service\api\member\MemberService;
use app\service\api\notice\NoticeService;
use core\base\BaseApiService;
use core\exception\ApiException;
use core\exception\AuthException;
use core\util\TokenAuth;
use Exception;
use think\facade\Cache;
use think\facade\Log;

/**
 * 登录服务层
 * Class BaseService
 * @package app\service
 */
class LoginService extends BaseApiService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Member();
    }

    /**
     * 会员注册
     * @param $data
     */
    public function register($data)
    {
        //检测设置是否自动注册
        //自动注册检测授权信息
        //注册登录
    }

    /**
     * 登录操作
     * @param Member $member_info
     * @param string $type  登录的操作终端类型
     * @return array
     */
    public function login(Member $member_info, string $login_type)
    {
        //绑定第三方授权
        $this->bingOpenid($member_info);
        if (!$member_info->status) throw new ApiException('MEMBER_LOCK');
        $member_info->login_time = time();
        $member_info->login_ip = $this->request->ip();
        $member_info->login_channel = $this->channel;
        $member_info->login_type = $login_type;
        $member_info->login_count++;
        $member_info->last_visit_time = time();
        $member_info->save();
        $token_info = $this->createToken($member_info);
        event("memberLogin", $member_info);
        return [
            'token' => $token_info['token'],
            'expires_time' => $token_info['params']['exp'],
        ];
    }


    /**
     * 账号登录
     * @param string $username
     * @param string $password
     * @return void
     */
    public function account(string $username, string $password)
    {
        $member_service = new MemberService();
        $member_info = $member_service->findMemberInfo(['username' => $username, 'site_id' => $this->site_id]);
        if ($member_info->isEmpty()) throw new AuthException('MEMBER_NOT_EXIST');//账号不存在
        if (!check_password($password, $member_info->password)) return false;//密码与账号不匹配
        return $this->login($member_info, MemberLoginTypeDict::USERNAME);
    }


    /**
     * 手机号登录
     * @param string|int $mobile
     * @return array
     */
    public function mobile(string|int $mobile){
        //校验手机验证码
        $this->checkMobileCode($mobile);
        //登录注册配置
        $config = (new MemberConfigService())->getLoginConfig();
        $is_mobile = $config['is_mobile'];
        if($is_mobile != 1) throw new AuthException('MOBILE_LOGIN_UNOPENED');
        $member_service = new MemberService();
        $member_info = $member_service->findMemberInfo(['mobile' => $mobile, 'site_id' => $this->site_id]);
        if ($member_info->isEmpty()) throw new AuthException('MEMBER_NOT_EXIST');//账号不存在

        return $this->login($member_info, MemberLoginTypeDict::MOBILE);
    }
    /**
     * 生成token
     * @param $member_info
     * @return array
     */
    public function createToken($member_info): ?array
    {
        $expire_time = env('system.api_token_expire_time') ?? 3600;//todo  不一定和管理端合用这个token时限
        $token_info = TokenAuth::createToken($member_info->member_id, AppTypeDict::API, ['member_id' => $member_info->member_id, 'username' => $member_info->username, 'site_id' => $member_info->site_id], $expire_time);
        return $token_info;
    }

    /**
     * 登陆退出(当前账户)
     */
    public function logout(): ?bool
    {
        self::clearToken($this->member_id, $this->request->apiToken());
        return true;
    }

    /**
     * 清理token
     * @param int $member_id
     */
    public static function clearToken(int $member_id, ?string $token = ''): ?bool
    {
        TokenAuth::clearToken($member_id, AppTypeDict::API, $token);
        return true;
    }


    /**
     * 解析token
     * @param string $token
     * @return mixed
     * @throws Exception
     */
    public function parseToken(?string $token){
        if(empty($token))
        {
            //定义专属于授权认证机制的错误响应, 定义专属语言包
            throw new AuthException('MUST_LOGIN', 401);
        }

        try {
            $token_info = TokenAuth::parseToken($token, AppTypeDict::API);
        } catch ( \Throwable $e ) {
//            if(env('app_debug', false)){
//                throw new AuthException($e->getMessage(), 401);
//            }else{
                throw new AuthException('LOGIN_EXPIRE', 401);
//            }
        }
        if(!$token_info)
        {
            throw new AuthException('MUST_LOGIN', 401);
        }
        //验证有效次数或过期时间
        return $token_info;
    }

    /**
     * 手机发送验证码
     * @param $mobile
     * @param string $type  发送短信的业务场景
     * @return array
     * @throws Exception
     */
    public function sendMobileCode($mobile, string $type = ''){
        (new CaptchaService())->check();
        if(empty($mobile)) throw new AuthException('MOBILE_NEEDED');
        //发送
        if(!in_array($type, SmsDict::SCENE_TYPE)) throw new AuthException('MEMBER_MOBILE_CAPTCHA_ERROR');
        $code = str_pad(random_int(1, 9999), 4, 0, STR_PAD_LEFT);// 生成4位随机数，左侧补0
        (new NoticeService())->send('member_verify_code', ['code' => $code, 'mobile' => $mobile]);
        //将验证码存入缓存
        $key = md5(uniqid(null, true));
        $cache_tag_name = "mobile_key".$mobile.$type;
        $this->clearMobileCode($mobile, $type);
        Cache::tag($cache_tag_name)->set($key, [ 'mobile' => $mobile, 'code' => $code, 'type' => $type], 600);
        return ['key' => $key];
    }

    public function getMobileCodeCacheName(){

    }

    public function clearMobileCode($mobile, $type){
        $cache_tag_name = "mobile_key".$mobile.$type;
        Cache::tag($cache_tag_name)->clear();
    }
    /**
     * 校验手机验证码
     * @param $mobile
     * @param $code
     * @param $member_key
     * @return void
     */
    public function checkMobileCode(string|int $mobile){
        if(empty($mobile)) throw new AuthException('MOBILE_NEEDED');
        $mobile_key = request()->param('mobile_key', '');
        $mobile_code = request()->param('mobile_code', '');
        if(empty($mobile_key) || empty($mobile_code)) throw new AuthException('MOBILE_CAPTCHA_ERROR');
        $cache = Cache::get($mobile_key);
        if(empty($cache)) throw new AuthException('MOBILE_CAPTCHA_ERROR');
        $temp_mobile = $cache['mobile'];
        $temp_code = $cache['code'];
        $temp_type = $cache['type'];
        if($temp_mobile != $mobile || $temp_code != $mobile_code) throw new AuthException('MOBILE_CAPTCHA_ERROR');
        $this->clearMobileCode($temp_mobile, $temp_type);
        return true;

    }

    /**
     * 绑定openid
     * @param $member
     * @return true
     */
    public function bingOpenid($member){
        $config = (new MemberConfigService())->getLoginConfig();
        $is_auth_register = $config['is_auth_register'];
        $open_id = $this->request->param('openid');
        if(!empty($open_id)){
            Log::write('channel_1'.$this->channel);
            if(!empty($this->channel)){
                $openid_field = match($this->channel){
                    'wechat' => 'wx_openid',
                    'weapp' => 'weapp_openid',
                    default => ''
                };
                if(!empty($openid_field)){
                    if(!$member->isEmpty()){
                        if(empty($member->$openid_field)){
                            //todo  定义当前第三方授权方没有退出登录功能,故这儿不做openid是否存在账号验证
//                        $member_service = new MemberService();
//                        $open_member = $member_service->findMemberInfo([$openid_field => $open_id, 'site_id' => $this->site_id]);

                            $member->$openid_field = $open_id;
                            $member->save();
                        }else{
                            if( $member->$openid_field != $open_id){
                                throw new AuthException('MEMBER_IS_BIND_AUTH');
                            }
                        }
                    }
                }
            }
        }
        return true;
    }

    /**
     * 重置密码
     * @param string|int $mobile
     * @param int|string $password
     * @return null
     */
    public function resetPassword(string|int $mobile, int|string $password){
        $member_service = new MemberService();
        //校验手机验证码
        $this->checkMobileCode($mobile);
        $member_info = $member_service->findMemberInfo(['mobile' => $mobile, 'site_id' => $this->site_id]);
        if ($member_info->isEmpty()) throw new AuthException('MOBILE_NOT_EXIST_MEMBER');//账号不存在
        //todo  需要考虑一下,新的密码和原密码一样能否通过验证
        $password_hash = create_password($password);
        $data = array(
            'password' => $password_hash,
        );
        return $member_service->editByFind($member_info, $data);
    }

    public function loginScanCode(){

    }

    public function loginByScanCode(){

    }

    public function checkScanCode(){

    }

}