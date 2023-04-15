<?php

namespace extend\driver\sms\driver;

use Exception;
use extend\exception\CommonException;
use TencentCloud\Sms\V20190711\SmsClient;
use TencentCloud\Sms\V20190711\Models\SendSmsRequest;
use TencentCloud\Common\Credential;
use TencentCloud\Common\Profile\ClientProfile;
use TencentCloud\Common\Profile\HttpProfile;

/**
 * 腾讯云短信
 * Class TencentSms
 * @package app\extend\driver\sms\driver
 */
class TencentSms
{
    protected $error = null;
    protected $config;
    protected $mobile;
    protected $templateId;
    protected $templateParams;

    public function __construct($config)
    {
        $this->config = $config;
    }

    /**
     * 获取错误
     * @return null
     */
    public function getError()
    {
        return $this->error;
    }

    /**
     * 设置发送的手机号
     * @param $mobile
     * @return $this
     */
    public function setMobile($mobile)
    {
        $this->mobile = $mobile;
        return $this;
    }

    /**
     * 设置模板ID
     * @param $templateId
     * @return $this
     */
    public function setTemplateId($templateId)
    {
        $this->templateId = $templateId;
        return $this;
    }

    /**
     * 设置短信对应参数
     * @param $templateParams
     * @return $this
     */
    public function setTemplateParams($templateParams)
    {
        $this->templateParams = $templateParams;
        return $this;
    }

    /**
     * 发送短信
     * @return bool|mixed
     */
    public function send()
    {
        try {
            $cred = new Credential($this->config['secret_id'], $this->config['secret_key']);
            $httpProfile = new HttpProfile();
            $httpProfile->setEndpoint("sms.tencentcloudapi.com");

            $clientProfile = new ClientProfile();
            $clientProfile->setHttpProfile($httpProfile);

            $client = new SmsClient($cred, 'ap-guangzhou', $clientProfile);
            $params = [
                'PhoneNumberSet'    => ['+86' . $this->mobile],
                'TemplateID'        => $this->templateId,
                'Sign'              => $this->config['sign'],
                'TemplateParamSet'  => $this->templateParams,
                'SmsSdkAppid'       => $this->config['app_id'],
            ];
            $req = new SendSmsRequest();
            $req->fromJsonString(json_encode($params));
            $resp = json_decode($client->SendSms($req)->toJsonString(), true);
            if (isset($resp['SendStatusSet']) && $resp['SendStatusSet'][0]['Code'] == 'Ok') {
                return $resp;
            } else {
                $message = $res['SendStatusSet'][0]['Message'] ?? json_encode($resp);
                throw new CommonException( $message);
            }
        } catch( Exception $e) {
            $this->error = $e->getMessage();
            return false;
        }
    }
}