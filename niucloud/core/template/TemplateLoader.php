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

use core\loader\Loader;

/**
 * @see \core\template\TemplateLoader
 * @package think\facade
 * @mixin \core\template\Wechat
 * @method  string|null send(string $phone, string $templateId, array $data) 发送短信
 * @method  mixed open(null|string $name = null, mixed $default = null) 开启服务
 * @method  mixed apply(string $title, string $content, int $type) 申请模板
 * @method  mixed applys(int $tempType, int $page, int $limit) 模板记录
 */
class TemplateLoader extends Loader
{


    /**
     * 空间名
     * @var string
     */
    protected $namespace = '\\core\\template\\';

    protected $config_name = 'template';
    /**
     * 默认驱动
     * @return mixed
     */
    protected function getDefault()
    {
        return config('template.default');
    }


}