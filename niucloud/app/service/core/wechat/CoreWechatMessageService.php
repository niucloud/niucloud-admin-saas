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

namespace app\service\core\wechat;

use app\enum\channel\WechatEnum;
use app\service\core\scan\CoreScanService;
use Closure;
use core\base\BaseCoreService;
use EasyWeChat\Kernel\Messages\Text;

/**
 * 微信事件中间件类(用于中间件注册)
 * Class WechatConfigService
 * @package app\service\core\wechat
 */
class CoreWechatMessageService extends BaseCoreService
{

    /**
     * 通过注入来分配消息事件类型
     * @param $message
     * @param Closure $next
     * @return mixed
     */
    public function message(int $site_id, $message)
    {
        switch ($message['MsgType']) {
            case WechatEnum::MESSAGE_TYPE_EVENT:
                return $this->event($site_id, $message);
                return '收到事件消息';
                break;
            case WechatEnum::MESSAGE_TYPE_TEXT:
                //调用文本回复
                return $this->text($site_id, $message);
                return '收到文字消息';
                break;
            case WechatEnum::MESSAGE_TYPE_IMAGE:
                return '收到图片消息';
                break;
            case WechatEnum::MESSAGE_TYPE_VOICE:
                return '收到语音消息';
                break;
            case WechatEnum::MESSAGE_TYPE_VIDEO:
                return '收到视频消息';
                break;
            case WechatEnum::MESSAGE_TYPE_LOCATION:
                return '收到坐标消息';
                break;
            case WechatEnum::MESSAGE_TYPE_LINK:
                return '收到链接消息';
                break;
            case WechatEnum::MESSAGE_TYPE_FILE:
                return '收到文件消息';
            // ... 其它消息
            default:
                return '收到其它消息';
                break;
        }
    }

    /**
     * 事件分流
     * @return void
     */
    public function event(int $site_id, $message)
    {
        switch ($message['Event'] ) {
            case WechatEnum::EVENT_SUBSCRIBE:
                return $this->subscribe($site_id, $message);
                break;
            case WechatEnum::EVENT_SCAN:
                return $this->scan($site_id, $message);
                break;
        }

    }

    /**
     * 扫码事件
     * @param int $site_id
     * @param $message
     * @return News|Text|false
     */
    public function scan(int $site_id, $message){
        $key = str_replace('qrscene_', '', $message['EventKey']);
        $core_scan_service = new CoreScanService();
        $core_scan_service->actionByScan($site_id, $key, ['openid' => $message['FromUserName']]);
        return get_lang('SCAN_SUCCESS');
    }

    /**
     * 关注事件
     * @param int $site_id
     * @param $message
     * @return News|Text|false
     */
    public function subscribe(int $site_id, $message){
        //todo 新增粉丝或将原有的粉丝改为关注状态
        // 因为时间的原因,这里可能需要将实践放在消息队列里面
        $core_wechat_fans_service = new CoreWechatFansService();
        $core_wechat_fans_service->subscribe($site_id, $message['ToUserName'], $message['FromUserName']);
        //扫码事件
        if(!empty($message['EventKey'])){
            $this->scan($site_id, $message);
        }
        //如果配置了关注回复,返回关注消息
        $core_wechat_reply_service = new CoreWechatReplyService();
        return $core_wechat_reply_service->reply($site_id, WechatEnum::REPLY_SUBSCRIBE) ?? false;
    }


    /**
     * 取消关注事件
     * @param $message
     * @return void
     */
    public function unsubscribe($site_id, $message){
        $core_wechat_fans_service = new CoreWechatFansService();
        $core_wechat_fans_service->unsubscribe($site_id, $$message['FromUserName']);
        return true;
    }

    /**
     * 文本回复事件
     * @param $site_id
     * @param $message
     * @return News|Text|false
     */
    function text(int $site_id, $message)
    {
        $core_wechat_reply_service = new CoreWechatReplyService();
        return $core_wechat_reply_service->reply($site_id, WechatEnum::REPLY_KEYWORD, $message['Content']) ?? false;
    }
}