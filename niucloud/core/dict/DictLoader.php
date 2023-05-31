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

namespace core\dict;

use core\loader\Loader;

/**
 * @see \core\dict\DictLoader
 * @mixin \core\dict\BaseDict
 * @method  array|null load(array $data = [])
 */
class DictLoader extends Loader
{

    /**
     * 空间名
     * @var string
     */
    protected $namespace = '\\core\\dict\\';

    protected $config_name = 'dict';
    /**
     * 默认驱动
     * @return mixed
     */
    protected function getDefault()
    {
        return "Event";
    }

}