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

namespace extend\driver\sms;

use Exception;
use extend\exception\CommonException;
use extend\exception\MessageException;

/**
 * 短信驱动
 * Class SmsDriver
 * @package app\common\driver\sms
 */
class SmsDriver
{
    /**
     * 错误信息
     * @var
     */
    protected $error = null;

    /**
     * 短信引擎
     * @var
     */
    protected $driver;

    /**
     * 初始化短信驱动
     * SmsDriver constructor.
     * @param $config
     */
    public function __construct($config)
    {
        // 初始化
        $this->initialize($config);
    }


    public function initialize($config)
    {
        try {

            $classSpace = __NAMESPACE__ . '\\driver\\' . ucfirst(strtolower($config['sms_type'])) . 'Sms';
            if (!class_exists($classSpace)) {
                throw new CommonException(204003);
            }
            $this->driver = new $classSpace($config);
            if(!is_null($this->driver->getError())) {
                throw new CommonException($this->driver->getError());
            }
            return true;
        } catch ( Exception $e) {
            $this->error = $e->getMessage();
            return false;
        }
    }

    /**
     * 获取短信错误
     * @return null
     */
    public function getError()
    {
        return $this->error;
    }

    /**
     * 发送短信
     * @param $mobile
     * @param $data
     * @return bool
     */
    public function send($mobile, $data)
    {
        try {
            // 开始发送
            $result = $this->driver
                ->setMobile($mobile)
                ->setTemplateId($data['template_id'])
                ->setTemplateParams($data['params'])
                ->send();
            if(false === $result) {
                throw new MessageException($this->driver->getError());
            }
            return $result;
        } catch( Exception $e) {
            $this->error = $e->getMessage();
            return false;
        }
    }
}