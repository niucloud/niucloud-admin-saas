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
     * 发送短信
     * @param string $mobile
     * @param string $template_id
     * @param array $data
     * @return mixed
     */
    abstract public function send(string $mobile, string $template_id, array $data);

    /**
     * 编辑签名
     * @return mixed
     */
    abstract public function modify(string $sign = null, string $mobile, string $code);
    /**
     * 短信模板
     * @param int $page
     * @param int $limit
     * @param int $type
     * @return mixed
     */
    abstract public function template(int $page, int $limit, int $type);


    /**
     * 申请短信
     * @param string $title
     * @param string $content
     * @param int $type
     * @return mixed
     */
    abstract public function apply(string $title, string $content, int $type);

    /**
     * 模板列表
     * @param int $type
     * @param int $page
     * @param int $limit
     * @return mixed
     */
    abstract public function localTemplate(int $type, int $page, int $limit);

    /**
     * 记录
     * @param $id
     * @return mixed
     */
    abstract public function record($id);


}
