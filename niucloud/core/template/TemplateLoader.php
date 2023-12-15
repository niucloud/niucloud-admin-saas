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
 * @see TemplateLoader
 * @package think\facade
 * @mixin Wechat
 * @method  string|null send(array $data) 发送
 * @method  mixed addTemplate(array $data) 增加
 * @method  mixed delete(array $data) 删除
 * @method  mixed get() 模板记录
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