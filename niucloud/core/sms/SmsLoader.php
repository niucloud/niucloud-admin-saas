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
 * @see SmsLoader
 * @package think\facade
 * @mixin BaseSms
 * @method  string|null send(string $mobile, string $template_id, array $data) 发送短信
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