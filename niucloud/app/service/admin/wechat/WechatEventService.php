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

namespace app\service\admin\wechat;

use app\enum\channel\WechatEnum;
use app\service\admin\BaseAdminService;

use Closure;

/**
 * 微信事件中间件类(用于中间件注册)
 * Class WechatConfigService
 * @package app\service\core\wechat
 */
class WechatEventService extends BaseAdminService
{
    /**
     *
     * @return void
     */
    public function event($message, Closure $next){
        switch($message->MsgType){
            case WechatEnum::EVENT_SUBSCRIBE :
                $message->FromUserName;
                break;
        }
    }
}