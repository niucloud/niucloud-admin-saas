<?php

namespace app\listener\notice;

use app\enum\notice\NoticeTypeEnum;
use app\enum\sys\MessageTypeEnum;
use app\service\core\member\CoreMemberService;
use app\service\core\notice\CoreNoticeLogService;
use app\service\core\notice\CoreSmsService;
use core\exception\NoticeException;

class Sms
{

    public function handle(array $data)
    {
        return true;
        $site_id = $data['site_id'];
        $template = $data['template'];//模板
        $vars = $data['vars'];//模板变量
        $key = $data['key'];
        $to = $data['to'];//发送对象主题
        $mobile = $to['mobile'] ?? '';
        //完全信任消息的设置, 不再依赖support_type
        if (!$template['is_sms']) {
            try {
                $sms_id = $template['sms_id'];//发送模板id
                $content = $template['sms_content'];
                $member_id = $to['member_id'] ?? 0;
                $uid = $to['uid'] ?? 0;
                if (!$mobile) {
                    //会员的
                    if ($member_id > 0) {//查询openid
                        $info = (new CoreMemberService())->getInfoByMemberId($site_id, $member_id);
                        $mobile = $info['mobile'] ?? '';
                        $nickname = $info['nickname'] ?? '';
                    }
                }
                if (empty($mobile)) throw new NoticeException('NOTICE_SMS_EMPTY');//没有手机号不能发送短信
                $core_sms_service = new CoreSmsService();
                //消息日志
                $log_data = array(
                    'key' => $key,
                    'message_type' => NoticeTypeEnum::SMS,
                    'uid' => $uid ?? 0,
                    'member_id' => $member_id ?? 0,
                    'nickname' => $nickname ?? '',
                    'receiver' => $mobile,
                    'params' => $data,
                    'content' => $content,
                    'result' => ''
                );
                $core_sms_service->send($site_id, $mobile, $vars, $key, $sms_id, $content);
                (new CoreNoticeLogService())->add($site_id, $log_data);
            } catch ( NoticeException $e ) {
                $log_data['result'] = $e->getMessage();
                (new CoreNoticeLogService())->add($site_id, $log_data);
                //这儿决定要不要抛出
                if (!$template['async']) {
                    throw new NoticeException($e->getMessage());
                }
            }
        } else {
            if (!$template['async']) {
                throw new NoticeException('NOTICE_NOT_OPEN_SMS');
            }
        }
        return true;
    }

}