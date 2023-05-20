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

use core\loader\DriverConfig;
use core\loader\Storage;

/**
 * Class BaseSms
 * @package 
 */
abstract class BaseSms extends Storage
{
    /**
     * 初始化
     * @param array $config
     * @return mixed|void
     */
    protected function initialize(array $config = [])
    {

    }

    /**
     * 开通服务
     * @return mixed
     */
    abstract public function open();

    /**修改签名
     * @return mixed
     */
    abstract public function modify(string $sign = null, string $phone, string $code);

    /**用户信息
     * @return mixed
     */
    abstract public function info();

    /**发送短信
     * @return mixed
     */
    abstract public function send(string $phone, string $templateId, array $data);

    /**
     * 短信模板
     * @param int $page
     * @param int $limit
     * @param int $type
     * @return mixed
     */
    abstract public function temps(int $page, int $limit, int $type);


    /**
     * 申请模板
     * @param string $title
     * @param string $content
     * @param int $type
     * @return mixed
     */
    abstract public function apply(string $title, string $content, int $type);

    /**
     * 模板记录
     * @param int $tempType
     * @param int $page
     * @param int $limit
     * @return mixed
     */
    abstract public function applys(int $tempType, int $page, int $limit);

    /**发送记录
     * @return mixed
     */
    abstract public function record($record_id);


}
