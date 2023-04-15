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
use app\services\user\UserAuthServices;
use Closure;
use Exception;


/**
 * api渠道处理, 各种渠道的请求不叫特殊, 会在这儿将渠道的公共数据处理好
 * Class ApiCheckToken
 * @package app\api\middleware
 */
class ApiChannel
{
    /**
     * @param Request $request
     * @param Closure $next
     * @param bool $exception  是否把错误抛出
     * @return mixed
     * @throws Exception
     */
    public function handle(Request $request, Closure $next)
    {
        //微信或支付宝
        if (preg_match('~micromessenger~i', $request->header('user-agent')) || preg_match('~alipay~i', $request->header('user-agent'))) {
            $site_id = $request->param('site_id', -1);
            if($site_id != -1){
                $request->pushHeader([system_name('api_site_id_name') => $request->param('site_id')]);
            }
        }
        return $next($request);
    }
}
