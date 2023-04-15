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
use app\model\site\Site;
use app\model\sys\SysUser;
use app\service\admin\BaseAdminService;
use app\service\admin\site\SiteService;
use app\service\admin\user\UserRoleService;
use app\service\admin\user\UserService;
use Exception;
use extend\exception\AuthException;
use extend\util\TokenUtil;

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
    public function login(string $username, string $password)
    {
        $user_service = new UserService();
        $userinfo = $user_service->getUserInfoByUsername($username);
        if (empty($userinfo)) return false;

        if (!check_password($password, $userinfo->password)) return false;
        if (!$userinfo->status) {
            throw new AuthException(101004);
        }

        //修改用户登录信息
        $userinfo->last_time = time();
        $userinfo->last_ip = app('request')->ip();
        $userinfo->login_count++;
        $userinfo->save();
        //创建token
        $token_info = $this->createToken($userinfo);
        //查询权限以及菜单
        $data = [
            'token' => $token_info['token'],
            'expires_time' => $token_info['params']['exp'],
            'userinfo' => [
                'uid' => $userinfo->uid,
                'username' => $userinfo->username,
            ],
            'site_id' => (new UserRoleService())->getUserDefaultSiteId($userinfo->uid),
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
    public function createToken(SysUser $userinfo)
    {
        $expire_time = env('system.admin_token_expire_time') ?? 3600;
        $token_info = TokenUtil::createToken($userinfo->uid, 'admin', ['uid' => $userinfo->uid, 'username' => $userinfo->username], $expire_time);
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
            TokenUtil::clearToken($uid, 'admin', $token);//清除平台管理端的token
            TokenUtil::clearToken($uid, 'site', $token);//清除站点管理端的token
        } else {
            TokenUtil::clearToken($uid, $type, $token);
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
            throw new AuthException(101001, 401);
        }
        //暴力操作,截停所有异常覆盖为token失效
        try {
            $token_info = TokenUtil::parseToken($token, AppTypeEnum::ADMIN);
        } catch ( \Throwable $e ) {
//            if(env('app_debug', false)){
//                throw new AuthException($e->getMessage(), 401);
//            }else{
                throw new AuthException(101002, 401);
//            }

        }
        if (!$token_info) {
            throw new AuthException(101001, 401);
        }
        //验证有效次数或过期时间
        return $token_info;
    }

}