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
use Closure;

/**
 * http跨域请求中间件
 * Class AllowCrossDomain
 * @package app\adminapi\middleware
 */
class AllowCrossDomain
{
    public function handle(Request $request, Closure $next)
    {
        $allow_header = [
            system_name('admin_token_name'),
            system_name('admin_site_id_name'),
            system_name('channel_name'),
            'lang'
        ];
        header("Access-Control-Allow-Headers: Authorization, Sec-Fetch-Mode, DNT, X-Mx-ReqToken, Keep-Alive, User-Agent, If-Match, If-None-Match, If-Unmodified-Since, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Accept-Language, Origin, Accept-Encoding,Access-Token,version," . implode(',', $allow_header));
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, post');
        header('Access-Control-Max-Age: 1728000');
        header('Access-Control-Allow-Credentials:true');
        header('Access-Control-Allow-Origin: *');
        return $next($request);
    }
}
