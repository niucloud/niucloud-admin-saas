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

namespace app\adminapi\middleware;


use app\Request;
use app\service\admin\auth\AuthService;
use Closure;

/**
 * admin用户权限验证
 * Class AdminCheckToken
 * @package app\adminapi\middleware
 */
class AdminCheckRole
{
    public function handle(Request $request, Closure $next)
    {
        $check_role_service = new AuthService();
        $check_role_service->checkRole($request);
        //处理用户的权限
        return $next($request);
    }
}
