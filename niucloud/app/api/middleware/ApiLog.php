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


use app\Request;
use Closure;

/**
 * admin用户操作日志
 * Class AdminCheckToken
 * @package app\api\middleware
 */
class ApiLog
{
    public function handle(Request $request, Closure $next)
    {
        //写入日志
//        if($request->method() != 'GET')
//        {
//            $data = [
//                'uid' => $request->adminid(),
//                'username' => $request->username(),
//                'url' => $request->url(),
//                'params' => $request->param(),
//                'ip' => $request->ip(),
//                'type' => $request->method()
//
//            ];
//            (new UserLogService())->add($data);
//        }
//
        return $next($request);
    }
}
