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

use core\loader\Loader;

/**
 * @see \core\sms\SmsLoader
 * @package think\facade
 * @mixin \core\sms\BaseSms
 * @method  string|null send(string $phone, string $templateId, array $data) 发送短信
 * @method  mixed open(null|string $name = null, mixed $default = null) 开启服务
 * @method  mixed apply(string $title, string $content, int $type) 申请模板
 * @method  mixed applys(int $tempType, int $page, int $limit) 模板记录
 */
class SmsLoader extends Loader
{


    /**
     * 空间名
     * @var string
     */
    protected $namespace = '\\core\\sms\\';

    protected $config_name = 'sms';
    /**
     * 默认驱动
     * @return mixed
     */
    protected function getDefault()
    {
        return config('sms.default');
    }


}