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

namespace core\template;

use core\loader\Storage;

/**
 * Class BaseTemplate
 * @package 
 */
abstract class BaseTemplate extends Storage
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
     * 发送模板消息
     * @return mixed
     */
    abstract protected function send(array $data);

    /**
     * 增加模板消息
     * @param string $shortId
     * @return mixed
     */
    abstract protected function addTemplate(array $data);

    /**
     * 删除消息模板
     * @param string $templateId
     * @return mixed
     */
    abstract protected function delete(array $data);

    /**
     * 获取消息模板列表
     * @return mixed
     */
    abstract protected function get();


}
