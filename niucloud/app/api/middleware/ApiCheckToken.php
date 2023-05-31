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

namespace app\api\middleware;

use app\dict\sys\AppTypeDict;
use app\Request;
use app\service\api\login\AuthService;
use app\service\api\login\LoginService;
use Closure;
use Exception;
use core\exception\AuthException;


/**
 * 会员登录token验证
 * Class ApiCheckToken
 * @package app\api\middleware
 */
class ApiCheckToken
{
    /**
     * @param Request $request
     * @param Closure $next
     * @param bool $exception 是否把错误抛出
     * @return mixed
     * @throws Exception
     */
    public function handle(Request $request, Closure $next, bool $exception = false)
    {
        $request->appType(AppTypeDict::API);
        //检测站点
        ( new AuthService() )->checkSite($request);
        //通过配置来设置系统header参数
        try {
            $token = $request->apiToken();
            $token_info = ( new LoginService() )->parseToken($token);
        } catch (AuthException $e) {
            //是否将登录错误抛出
            if ($exception)
                return fail($e->getMessage());
        }
        if (!empty($token_info)) {
            $request->memberId($token_info[ 'member_id' ]);
        }
        //校验会员和站点
        ( new AuthService() )->checkSiteAuth($request);
        return $next($request);
    }
}
