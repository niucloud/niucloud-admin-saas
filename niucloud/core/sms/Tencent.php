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

use core\exception\CommonException;
use core\exception\NoticeException;
use Exception;
use TencentCloud\Common\Credential;
use TencentCloud\Common\Profile\ClientProfile;
use TencentCloud\Common\Profile\HttpProfile;
use TencentCloud\Sms\V20190711\Models\SendSmsRequest;
use TencentCloud\Sms\V20190711\SmsClient;

/**
 * 腾讯云短信
 * Class Tencent
 * @package app\core\sms\driver
 */
class Tencent extends BaseSms
{


    protected $secret_id = '';
    protected $secret_key = '';
    protected $sign = '';
    protected $app_id = '';

    /**
     * @param array $config
     * @return void
     */
    protected function initialize(array $config = [])
    {
        parent::initialize($config);
        $this->secret_id = $config['secret_id'] ?? '';
        $this->secret_key = $config['secret_key'] ?? '';
        $this->sign = $config['sign'] ?? '';
        $this->app_id = $config['app_id'] ?? '';
    }


    /**
     * 发送短信
     * @return bool|mixed
     */
    public function send(string $mobile, string $template_id, array $data = [])
    {
        try {
            $cred = new Credential($this->secret_id, $this->secret_key);
            $httpProfile = new HttpProfile();
            $httpProfile->setEndpoint("sms.tencentcloudapi.com");

            $clientProfile = new ClientProfile();
            $clientProfile->setHttpProfile($httpProfile);

            $client = new SmsClient($cred, 'ap-guangzhou', $clientProfile);
            $params = [
                'PhoneNumberSet' => ['+86' . $mobile],
                'TemplateID' => $template_id,
                'Sign' => $this->sign,
                'TemplateParamSet' => $data,
                'SmsSdkAppid' => $this->app_id,
            ];
            $req = new SendSmsRequest();
            $req->fromJsonString(json_encode($params, JSON_THROW_ON_ERROR));
            $resp = json_decode($client->SendSms($req)->toJsonString(), true, 512, JSON_THROW_ON_ERROR);
            if (isset($resp['SendStatusSet']) && $resp['SendStatusSet'][0]['Code'] == 'Ok') {
                return $resp;
            } else {
                $message = $res['SendStatusSet'][0]['Message'] ?? json_encode($resp, JSON_THROW_ON_ERROR);
                throw new CommonException($message);
            }
        } catch ( Exception $e ) {
            throw new NoticeException($e->getMessage());
        }
    }


    public function modify(string $sign = null, string $mobile, string $code)
    {
    }

    public function template(int $page = 0, int $limit = 15, int $type = 1)
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