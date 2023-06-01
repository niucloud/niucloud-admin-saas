<?php

namespace app\listener\notice;

use app\dict\notice\NoticeTypeDict;
use app\dict\sys\MessageTypeDict;
use app\service\core\member\CoreMemberService;
use app\service\core\notice\CoreNoticeLogService;
use core\exception\NoticeException;
use core\template\TemplateLoader;

class Weapp
{

    public function handle(array $data)
    {
        $site_id = $data['site_id'];
        $template = $data['template'];//模板
        $vars = $data['vars'];//模板变量
        $key = $data['key'];
        $to = $data['to'];//发送对象主题

        //完全信任消息的设置, 不再依赖support_type
        if($template['is_weapp']) {
            $member_id = $to['member_id'] ?? 0;
            if($member_id > 0){//查询openid
                $info = (new CoreMemberService())->getInfoByMemberId($site_id, $member_id);
                $openid = $info['weapp_openid'] ?? '';
                $nickname = $info['nickname'] ?? '';
            }
            if(!empty($openid)) {
                $weapp_template_id = $template['weapp_template_id'];
                $weapp = $template['weapp'];
                $weapp_content = $weapp['content'];
                $weapp_data = [];
                foreach($weapp_content as $k => $v){
                    $search_content = $v[1];
                    foreach($vars as $item_k => $item_v){
                        $search_content = str_replace('{'.$item_k.'}', $item_v, $search_content);
                    }
                    $weapp_data[$v[2]]['value'] = $search_content;
                }
                $url = '';
                if(!empty($url)){
                    //todo 拼装h5端的链接
                    $url = $vars['__weapp_page'];
                }
                $log_data = array(
                    'key' => $key,
                    'message_type' => NoticeTypeDict::WEAPP,
                    'uid' => $data['uid'] ?? 0,
                    'member_id' => $member_id,
                    'nickname' => $nickname ?? '',
                    'receiver' => $openid,
                    'params' => $data,
                    'content' => $weapp
                );
                try {
                    (new TemplateLoader(NoticeTypeDict::WEAPP, ['site_id' => $site_id]))->send(
                        [
                            'template_id' => $weapp_template_id,
                            'data' => $weapp_data,
                            'openid' => $openid,
                            'page' => $url,
                        ]);
                    (new CoreNoticeLogService())->add($site_id, $log_data);
                } catch ( NoticeException $e ) {
                    $log_data['result'] = $e->getMessage();
                    (new CoreNoticeLogService())->add($site_id, $log_data);
                    //这儿决定要不要抛出
                    if (!$template['async']) {
                        throw new NoticeException($e->getMessage());
                    }
                }
            }
        }
        return true;
    }

}