<?php

namespace app\listener\notice;

use app\dict\notice\NoticeTypeDict;
use app\service\core\member\CoreMemberService;
use app\service\core\notice\CoreNoticeLogService;
use app\service\core\weapp\CoreWeappConfigService;
use core\exception\NoticeException;
use core\template\TemplateLoader;

class Wechat
{

    public function handle(array $data)
    {
        $site_id = $data['site_id'];
        $template = $data['template'];//模板
        $vars = $data['vars'];//模板变量
        $key = $data['key'];
        $to = $data['to'];//发送对象主题

        //完全信任消息的设置, 不再依赖support_type
        if ($template['is_wechat']) {
            $member_id = $to['member_id'] ?? 0;
            //会员的
            if ($member_id > 0) {//查询openid
                $info = (new CoreMemberService())->getInfoByMemberId($site_id, $member_id);
                $openid = $info['wx_openid'] ?? '';
                $nickname = $info['nickname'] ?? '';
            }
            //或者还有用户的
            if (!empty($openid)) {
                $wechat_template_id = $template['wechat_template_id'];
                $wechat = $template['wechat'];
                $wechat_content = $wechat['content'];
                $wechat_data = [];
                foreach ($wechat_content as $k => $v) {
                    $search_content = $v[1];
                    foreach ($vars as $item_k => $item_v) {
                        $search_content = str_replace('{' . $item_k . '}', $item_v, $search_content);
                    }
                    $wechat_data[$v[2]] = $search_content;
                }
                $first = $wechat['wechat_first'] ?? '';
                $remark = $wechat['wechat_remark'] ?? '';
                if (!empty($first)) $vars['first'] = $first;
                if (!empty($remark)) $vars['remark'] = $remark;
                //todo 拼装h5端的链接
                $url = $vars['__wechat_page'] ?? '';
                //消息日志
                $log_data = array(
                    'key' => $key,
                    'notice_type' => NoticeTypeDict::WECHAT,
                    'uid' => $data['uid'] ?? 0,
                    'member_id' => $member_id,
                    'nickname' => $nickname ?? '',
                    'receiver' => $openid,
                    'params' => $vars,
                    'content' => $wechat
                );

                $weapp_page = $vars['__weapp_page'] ?? '';
                if (!empty($weapp_page)) {
                    $appid = (new CoreWeappConfigService())->getWeappConfig($site_id)['app_id'] ?? '';
                    if (!empty($appid)) {
                        $miniprogram = array(
                            'appid' => $appid,
                            'pagepath' => $weapp_page
                        );
                    }
                }
                try {
                    $send_data = [
                        'template_id' => $wechat_template_id,
                        'first' => $remark,
                        'remark' => $remark,
                        'data' => $wechat_data,
                        'openid' => $openid,
                        'url' => $url,
                    ];
                    if (!empty($miniprogram)) {
                        $send_data['miniprogram'] = $miniprogram;
                    }
                    (new TemplateLoader(NoticeTypeDict::WECHAT, ['site_id' => $site_id]))->send($send_data);
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