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

namespace app\service\admin\auth;

use app\enum\sys\AppTypeEnum;
use app\model\sys\SysUser;
use app\service\admin\captcha\CaptchaService;
use app\service\admin\site\SiteService;
use app\service\admin\user\UserRoleService;
use app\service\admin\user\UserService;
use core\base\BaseAdminService;
use core\exception\AuthException;
use core\util\TokenAuth;
use Exception;

/**
 * 登录服务层
 * Class BaseService
 * @package app\service
 */
class LoginService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysUser();
    }

    /**
     * 用户登录
     * @param string $username
     * @param string $password
     * @return array|bool
     * @throws AuthException
     */
    public function login(string $username, string $password, string $app_type)
    {

        if(!in_array($app_type, array_keys(AppTypeEnum::getAppType()))) throw new AuthException('APP_TYPE_NOT_EXIST');

        $config = (new ConfigService())->getConfig();
        switch($app_type){
            case AppTypeEnum::SITE:
                $is_captcha = $config['is_site_captcha'];
                break;
            case AppTypeEnum::ADMIN:
                $is_captcha = $config['is_captcha'];
                break;
        }
        if($is_captcha == 1){
            (new CaptchaService())->verification();
        }

        $user_service = new UserService();
        $userinfo = $user_service->getUserInfoByUsername($username);
        if (empty($userinfo)) return false;

        if (!check_password($password, $userinfo->password)) return false;
        if (!$userinfo->status) {
            throw new AuthException('USER_LOCK');
        }


        if($app_type == AppTypeEnum::ADMIN){
            $default_site_id = $this->request->defaultSiteId();
            $userrole = (new UserRoleService())->getUserRole($default_site_id, $userinfo->uid);
            if(empty($userrole)) throw new AuthException('SITE_USER_CAN_NOT_LOGIN_IN_ADMIN');
        }else if($app_type == AppTypeEnum::SITE){
            $default_site_id = (new UserRoleService())->getUserDefaultSiteId($userinfo->uid);
            if(!($default_site_id > 0)){
                if(empty($userrole)) throw new AuthException('ADMIN_USER_CAN_NOT_LOGIN_IN_SITE');
            }
        }
        //修改用户登录信息
        $userinfo->last_time = time();
        $userinfo->last_ip = app('request')->ip();
        $userinfo->login_count++;
        $userinfo->save();
        //创建token
        $token_info = $this->createToken($userinfo, $app_type);

        //查询权限以及菜单
        $data = [
            'token' => $token_info['token'],
            'expires_time' => $token_info['params']['exp'],
            'userinfo' => [
                'uid' => $userinfo->uid,
                'username' => $userinfo->username,
            ],
            'site_id' => $default_site_id,
        ];
        $data['site_info'] = (new SiteService())->getInfo($data['site_id']);
        return $data;
    }

    /**
     * 登陆退出(当前账户) (todo 这儿应该登出当前token, (登出一个账号还是全端口登出))
     * @return void
     */
    public function logout()
    {
        self::clearToken($this->uid, $this->app_type, $this->request->adminToken());
        return true;
    }

    /**
     * 创建token
     * @param $userinfo
     * @return array
     */
    public function createToken(SysUser $userinfo, string $app_type)
    {
        $expire_time = env('system.admin_token_expire_time') ?? 3600;
        $token_info = TokenAuth::createToken($userinfo->uid, AppTypeEnum::ADMIN, ['uid' => $userinfo->uid, 'username' => $userinfo->username], $expire_time);
        return $token_info;
    }

    /**
     * 清理token
     * @param $uid
     * @param string $type
     */
    public static function clearToken(int $uid, ?string $type = '', ?string $token = '')
    {
        if (empty($type)) {
            TokenAuth::clearToken($uid, AppTypeEnum::ADMIN, $token);//清除平台管理端的token
//            TokenAuth::clearToken($uid, AppTypeEnum::SITE, $token);//清除站点管理端的token
        } else {
            TokenAuth::clearToken($uid, $type, $token);
        }

    }

    /**
     * 解析token
     * @param string $token
     * @return mixed
     * @throws Exception
     */
    public function parseToken(?string $token)
    {
        if (empty($token)) {
            //定义专属于授权认证机制的错误响应, 定义专属语言包
            throw new AuthException('MUST_LOGIN', 401);
        }
        //暴力操作,截停所有异常覆盖为token失效
        try {
            $token_info = TokenAuth::parseToken($token, AppTypeEnum::ADMIN);
        } catch ( \Throwable $e ) {
//            if(env('app_debug', false)){
//                throw new AuthException($e->getMessage(), 401);
//            }else{
                throw new AuthException('LOGIN_EXPIRE', 401);
//            }

        }
        if (!$token_info) {
            throw new AuthException('MUST_LOGIN', 401);
        }
        //验证有效次数或过期时间
        return $token_info;
    }

}