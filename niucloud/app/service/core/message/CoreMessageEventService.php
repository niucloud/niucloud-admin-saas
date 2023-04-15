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

namespace app\service\core\message;


use app\enum\sys\MessageTypeEnum;
use app\model\sys\SysMessage;
use app\service\core\BaseCoreService;
use app\service\core\member\CoreMemberService;
use app\service\core\weapp\CoreWeappTemplateService;
use app\service\core\wechat\CoreWechatTemplateService;
use extend\exception\MessageException;


/**
 * 短信配置服务层
 * Class SmsService
 * @package app\service\admin\message
 */
class CoreMessageEventService extends BaseCoreService
{

    public function __construct(private $is_throw = true)
    {
        parent::__construct();
        $this->model = new SysMessage();
    }

    public function event($data){
        $site_id = $data['site_id'];
        $key = $data['key'];
        $message = (new CoreMessageService())->getInfo($site_id, $key);


        switch($key){
            case 'verify_code'://用户手机验证码
                //手机发送
                $mobile = $data['mobile'];
                $params = array(
                    'code' => $data['code']
                );
                $data['params'] = $params;
                $this->sms($site_id, $mobile, $params, $message, $data);
                break;
            case 'member_verify_code'://会员手机验证码
                //手机发送
                $mobile = $data['mobile'];
                $params = array(
                    'code' => $data['code']
                );

                $this->sms($site_id, $mobile, $params, $message, $data);
                break;
            case 'recharge_success'://充值成功通知
                //查询到充值订单
                $order = [];
                //手机发送
                $mobile = $data['mobile'];
                $params = array(
                    'price' => $order['price'],//
                    'balance' => $order['balance'],
                    'time' => $order['create_time'],
                    'trade_no' => $order['trade_no'],
                );
                $this->sms($site_id, $mobile, $params, $message, $data);


                $wechat_data = [
                    'keyword1' => $order['create_time'],
                    'keyword2' => $order['order_money'],
                    'keyword3' => $order['order_status_name'],
                ];
                $url = '/pages/member/index..............';
                $this->wechat($site_id, $wechat_data, $data, $message, $url);
                break;
        }
        return true;
    }

    /**
     * 短信发送
     * @param $site_id
     * @param $mobile
     * @param $data
     * @param $message
     * @return void
     */
    public function sms($site_id, $mobile, $params, $message, $data){
        //完全信任消息的设置, 不再依赖support_type
        if($message['is_sms']) {
            $member_id = $data['member_id'] ?? 0;
            $uid = $data['uid'] ?? 0;
            $core_sms_service = new CoreSmsService();


            //消息日志
            $log_data = array(
                'key' => $message['key'],
                'message_type' => MessageTypeEnum::SMS,
                'uid' => $uid,
                'member_id' => $member_id,
                'nickname' => $nickname ?? '',
                'receiver' => $mobile,
                'params' => $data,
                'content' => $message['sms_content'],
                'result' => ''
            );

            try{
                $core_sms_service->send($site_id, $mobile, $params, $message['key'], $message['sms_id'], $message['sms_content']);
                (new CoreMessageLogService())->add($site_id, $log_data);
            }catch(MessageException $e){
                $log_data['result'] = $e->getMessage();
                (new CoreMessageLogService())->add($site_id, $log_data);
                //这儿决定要不要抛出
                if($this->is_throw){
                    throw new MessageException($e->getMessage());
                }
            }

        }else{
            if($this->is_throw){
                throw new MessageException(204011);
            }
        }
        return true;
    }

    /**
     * 微信公众号,模板消息
     * @param $site_id
     * @param $mobile
     * @param $data
     * @param $message
     * @return void
     */
    public function wechat($site_id, $message_data, $data, $message, $url = ''){
        //完全信任消息的设置, 不再依赖support_type
        if($message['is_wechat']){
            $member_id = $data['member_id'] ?? 0;
            //会员的
            if($member_id > 0){//查询openid
                $info = (new CoreMemberService())->getInfoByMemberId($site_id, $member_id);
                $openid = $info['wx_openid'] ?? 0;
                $nickname = $info['nickname'] ?? '';
            }
            //或者还有用户的

            if(!empty($openid)){
                $wechat_template_id = $message['wechat_template_id'];
                $first = $message['wechat_first'] ?? '';
                $remark = $message['wechat_remark'] ?? '';
                if(!empty($first)) $message_data['first'] = $first;
                if(!empty($remark)) $message_data['remark'] = $remark;

                if(!empty($url)){
                    //todo 拼装h5端的链接

                }


                //消息日志
                $log_data = array(
                    'key' => $message['key'],
                    'message_type' => MessageTypeEnum::WECHAT,
                    'uid' => $data['uid'] ?? 0,
                    'member_id' => $member_id,
                    'nickname' => $nickname ?? '',
                    'receiver' => $openid,
                    'params' => $message_data,
                    'content' => $message['wechat_json']
                );

                try{
                    (new CoreWechatTemplateService())->send($site_id, $openid, $wechat_template_id, $message_data, $first, $remark);
                    (new CoreMessageLogService())->add($site_id, $log_data);
                }catch(MessageException $e){
                    $log_data['result'] = $e->getMessage();
                    (new CoreMessageLogService())->add($site_id, $log_data);
                    //这儿决定要不要抛出
                    if($this->is_throw){
                        throw new MessageException($e->getMessage());
                    }
                }

            }
        }
        return true;

    }
    /**
     * 微信小程序订阅消息
     * @param $site_id
     * @param $mobile
     * @param $data
     * @param $message
     * @return void
     */
    public function weapp($site_id, $data, $message, $url = ''){
        //完全信任消息的设置, 不再依赖support_type
        if(!$message['is_weapp']) {
            $member_id = $data['member_id'] ?? 0;
            if($member_id > 0){//查询openid
                $info = (new CoreMemberService())->getInfoByMemberId($site_id, $member_id);
                $openid = $info['weapp_template_id'] ?? 0;
                $nickname = $info['nickname'] ?? '';
            }
            if(!empty($openid)) {
                $weapp_template_id = $message['weapp_template_id'];

                if(!empty($url)){
                    //todo 拼装h5端的链接

                }
                $log_data = array(
                    'key' => $message['key'],
                    'message_type' => MessageTypeEnum::WEAPP,
                    'uid' => $data['uid'] ?? 0,
                    'member_id' => $member_id,
                    'nickname' => $nickname ?? '',
                    'receiver' => $openid,
                    'params' => $data,
                    'content' => $message['weapp_json']
                );
                try {
                    (new CoreWeappTemplateService())->send($site_id, $weapp_template_id, $openid, $data, $url);
                    (new CoreMessageLogService())->add($site_id, $log_data);
                } catch ( MessageException $e ) {
                    $log_data['result'] = $e->getMessage();
                    (new CoreMessageLogService())->add($site_id, $log_data);
                    //这儿决定要不要抛出
                    if ($this->is_throw) {
                        throw new MessageException($e->getMessage());
                    }
                }
            }
        }

    }
}