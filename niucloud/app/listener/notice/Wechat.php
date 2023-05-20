<?php

namespace app\listener\notice;

use app\enum\notice\NoticeTypeEnum;
use app\enum\sys\MessageTypeEnum;
use app\service\core\member\CoreMemberService;
use app\service\core\notice\CoreNoticeLogService;
use core\exception\NoticeException;
use core\template\TemplateLoader;

class Wechat
{

    public function handle(array $data)
    {
        return true;
        $site_id = $data['site_id'];
        $template = $data['template'];//模板
        $vars = $data['vars'];//模板变量
        $key = $data['key'];
        $to = $data['to'];//发送对象主题

        //完全信任消息的设置, 不再依赖support_type
        if($template['is_wechat']){
            $member_id = $to['member_id'] ?? 0;
            //会员的
            if($member_id > 0){//查询openid
                $info = (new CoreMemberService())->getInfoByMemberId($site_id, $member_id);
                $openid = $info['wx_openid'] ?? '';
                $nickname = $info['nickname'] ?? '';
            }
            //或者还有用户的
            if(!empty($openid)){
                $wechat_template_id = $template['wechat_template_id'];
                $wechat_json = $template['wechat'];
                $wechat_content = $wechat_json['content'];
                $wechat_data = [];
                foreach($wechat_content as $k => $v){
                    $search_content = $v[1];
                    foreach($vars as $item_k => $item_v){
                        $search_content = str_replace('{'.$item_k.'}', $item_v, $search_content);
                    }
                    $wechat_data[$v[2]] = $search_content;
                }
                $first = $wechat_json['wechat_first'] ?? '';
                $remark = $wechat_json['wechat_remark'] ?? '';
                if(!empty($first)) $vars['first'] = $first;
                if(!empty($remark)) $vars['remark'] = $remark;
                $url = '';
                if(!empty($url)){
                    //todo 拼装h5端的链接
                    $url = $vars['__wechat_page'];
                }
                //消息日志
                $log_data = array(
                    'key' => $key,
                    'message_type' => NoticeTypeEnum::WECHAT,
                    'uid' => $data['uid'] ?? 0,
                    'member_id' => $member_id,
                    'nickname' => $nickname ?? '',
                    'receiver' => $openid,
                    'params' => $vars,
                    'content' => $wechat_json
                );

                try{
                    (new TemplateLoader(NoticeTypeEnum::WECHAT, ['site_id' => $site_id]))->send(
                        [
                            'template_id' => $wechat_template_id,
                            'first' => $remark,
                            'remark' => $remark,
                            'data' => $wechat_data,
                            'openid' => $openid,
                            'url' => $url,
                            'miniprogram' => $miniprogram ?? '',
                        ]);
                    (new CoreNoticeLogService())->add($site_id, $log_data);
                }catch(NoticeException $e){
                    $log_data['result'] = $e->getMessage();
                    (new CoreNoticeLogService())->add($site_id, $log_data);
                    //这儿决定要不要抛出
                    if(!$template['async']){
                        throw new NoticeException($e->getMessage());
                    }
                }
            }
        }else {
            if (!$template['async']) {
                throw new NoticeException('WECHAT_TEMPLATE_NOTICE_NOT_OPEN');
            }
        }
        return true;
    }

}