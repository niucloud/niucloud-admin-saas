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
     * @return void
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
     * @return array
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
                        'PhoneNumbers' => $mobile,
                        'SignName' => $this->sign,
                        'TemplateCode' => $template_id,
                        'TemplateParam' => json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE),
                    ],
                ])
                ->request();

            $res = $result->toArray();
            if (isset($res['Code']) && $res['Code'] == 'OK') {
                return $res;
            }
            $message = $res['Message'] ?? $res;
            throw new NoticeException($message);
        } catch ( Exception $e ) {
            throw new NoticeException($e->getMessage());
        }
    }

    public function modify(string $sign = null, string $mobile, string $code)
    {
    }

    public function template(int $page = 0, int $limit = 10, int $type = 1)
    {
    }

    public function apply(string $title, string $content, int $type)
    {
    }

    public function localTemplate(int $type, int $page, int $limit)
    {
    }

    public function record($id)
    {
    }
}