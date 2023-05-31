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

namespace app\service\core\notice;

use app\dict\sys\SmsDict;
use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;
use core\sms\SmsDriver;
use core\exception\NoticeException;
use core\sms\SmsLoader;

/**
 * 短信配置服务层
 * Class SmsService
 * @package app\service\admin\message
 */
class CoreSmsService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
    }

    public function send($site_id, $mobile, $params, $key, $template_id, $content)
    {
        //查询配置
        $config = $this->getDefaultSmsConfig($site_id);
        $sms_type = $config['sms_type'];
        if(empty($sms_type)) throw new NoticeException('SMS_TYPE_NOT_OPEN');
        //创建
        $core_notice_sms_log_service = new CoreNoticeSmsLogService();
        $log_id = $core_notice_sms_log_service->add($site_id, [
            'mobile' => $mobile,
            'sms_type' => $sms_type,
            'key' => $key,
            'content' => $content,
            'template_id' => $template_id,
            'params' => $params,
            'status' => SmsDict::SENDING
        ]);

        $sms_driver  = new SmsLoader($sms_type, $config);
        $params = $this->makeUp($params, $content, $sms_type);
        $result = $sms_driver->send($mobile, $template_id, $params);

        if (!$result) {
            //失败修改短信记录
            $error = $sms_driver->getError();
            $core_notice_sms_log_service->edit($site_id, $log_id, [
                'status' => SmsDict::FAIL,
                'result' => $sms_driver->getError()
            ]);
            throw new NoticeException($error);
        }
        //成功修改短信记录
        $core_notice_sms_log_service->edit($site_id, $log_id, [
            'status' => SmsDict::SUCCESS,
            'result' => $result
        ]);
        return true;
    }


    public function makeUp($params, $content, $sms_type){
        if($sms_type != SmsDict::TENCENTSMS) return $params;
        if(empty($params)) return [];
        $temp_array = [];
        foreach($params as $k => $v){
            $index = strpos($content, '${' . $k . '}');
            if($index !== false){
                $temp_array[$index] = $v;
            }
        }
        if(!empty($temp_array)){
            return array_values($temp_array);
        }
        return [];
    }
    /**
     * 主要用于短信发送(todo 慎用!!!!!)
     * @param int $site_id
     * @return array
     */
    public function getDefaultSmsConfig(int $site_id)
    {
        $info = (new CoreConfigService())->getConfig($site_id, 'SMS')['value'] ?? [];
        if (empty($info))
            throw new NoticeException('NO_SMS_DRIVER_OPEN');

        $sms_type = $info['default'] ?? '';
        $config = array(
            'sms_type' => $sms_type,
        );
        return array_merge($config, $info[$sms_type] ?? []);
    }

}