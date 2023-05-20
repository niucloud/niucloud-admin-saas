<?php

namespace core\sms;

use AlibabaCloud\Client\AlibabaCloud;
use core\exception\NoticeException;
use Exception;


class Aliyun extends BaseSms
{

    protected $app_key = '';
    protected $secret_key = '';
    protected $sign = '';
    /**
     * @param array $config
     * @return mixed|void
     */
    protected function initialize(array $config = [])
    {
        parent::initialize($config);
        $this->app_key = $config['app_key'] ?? '';
        $this->secret_key = $config['secret_key'] ?? '';
        $this->sign = $config['sign'] ?? '';
    }


    /**
     * 发送短信
     * @param string $mobile
     * @param string $template_id
     * @param array $data
     * @return array|false
     */
    public function send(string $mobile, string $template_id, array $data = [])
    {
        try {
            AlibabaCloud::accessKeyClient($this->app_key, $this->secret_key)
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
                        'PhoneNumbers'  => $mobile,
                        'SignName'      => $this->sign,
                        'TemplateCode'  => $template_id,
                        'TemplateParam' => $data,
                    ],
                ])
                ->request();

            $res = $result->toArray();
            if (isset($res['Code']) && $res['Code'] == 'OK') {
                return $res;
            }
            $message = $res['Message'] ?? $res;
            throw new NoticeException($message);
        } catch( Exception $e) {
            throw new NoticeException($e->getMessage());
        }
    }

    public function open()
    {
    }

    public function modify(string $sign = null, string $phone, string $code)
    {
    }

    public function info()
    {
    }

    public function temps(int $page = 0, int $limit = 10, int $type = 1)
    {
    }

    public function apply(string $title, string $content, int $type)
    {
    }

    public function applys(int $tempType, int $page, int $limit)
    {
    }

    public function record($record_id)
    {
    }
}