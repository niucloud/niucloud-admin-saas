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
use core\exception\AdminException;
use core\exception\ServerException;

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
        header("Access-Control-Allow-Headers: Authorization, Sec-Fetch-Mode, DNT, X-Mx-ReqToken, Keep-Alive, User-Agent, If-Match, If-None-Match, If-Unmodified-Since, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Accept-Language, Origin, Accept-Encoding,Access-Token,version,".implode(',', $allow_header));
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, post');
        header('Access-Control-Max-Age: 1728000');
        header('Access-Control-Allow-Credentials:true');
        //todo 周  自定义Authorization等，需要在.htaccess内加上SetEnvIf Authorization .+ HTTP_AUTHORIZATION=$0  nginx同理
        $allow_origin = [
            rtrim(str_replace('https://','',str_replace('http://','',$request->domain())),"/"),
        ];
        if(env('system.admin_domain')){
            $allow_origin[] = rtrim(str_replace('https://','',str_replace('http://','',env('system.admin_domain'))),"/");
        }
        $referer = $request->header('referer');
        $origin = '';
        if(!empty($referer)){
            $referer = parse_url($referer);
            $referer = $referer['host'] ?? '';
            $origin = rtrim(str_replace('https://','',str_replace('http://','',$referer)),"/");
        }
//        $origin = $request->header('origin');
        if(env('app_debug') || ($origin && in_array($origin, $allow_origin))){
//            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Origin: *');
        }else{
            header('Access-Control-Allow-Origin: *');
            throw new ServerException('SERVER_CROSS_REQUEST_FAIL', 409);
        }

        return $next($request);
    }
}
