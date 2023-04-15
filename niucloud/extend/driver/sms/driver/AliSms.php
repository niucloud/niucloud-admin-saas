<?php

namespace extend\driver\sms\driver;

use AlibabaCloud\Client\AlibabaCloud;
use Exception;
use extend\exception\CommonException;
use extend\exception\MessageException;


class AliSms
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
     * 设置发送手机
     * @param $mobile
     * @return $this
     */
    public function setMobile($mobile)
    {
        $this->mobile = $mobile;
        return $this;
    }


    /**
     * 设置发送模板
     * @param $templateId
     * @return $this
     */
    public function setTemplateId($templateId)
    {
        $this->templateId = $templateId;
        return $this;
    }


    /**
     * 设置模板参数
     * @param $templateParams
     * @return $this
     */
    public function setTemplateParams($templateParams)
    {
        $this->templateParams = json_encode($templateParams, JSON_UNESCAPED_UNICODE);
        return $this;
    }

    /**
     * 发送短信
     * @return array|bool
     */
    public function send()
    {
        try {
            AlibabaCloud::accessKeyClient($this->config['app_key'], $this->config['secret_key'])
                ->regionId('cn-hangzhou')
                ->asDefaultClient();

            $result = AlibabaCloud::rpcRequest()
                ->product('Dysmsapi')
                ->host('dysmsapi.aliyuncs.com')
                ->version('2017-05-25')
                ->action('SendSms')
                ->method('POST')
                ->debug(false)
                ->options([
                    'query' => [
                        'PhoneNumbers'  => $this->mobile,
                        'SignName'      => $this->config['sign'],
                        'TemplateCode'  => $this->templateId,
                        'TemplateParam' => $this->templateParams,
                    ],
                ])
                ->request();

            $res = $result->toArray();
            if (isset($res['Code']) && $res['Code'] == 'OK') {
                return $res;
            }
            $message = $res['Message'] ?? $res;
            throw new MessageException($message);
        } catch( Exception $e) {
            $this->error = $e->getMessage();
            return false;
        }
    }
}