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

namespace core\addon;

use core\loader\Loader;

/**
 * @see \core\addon\AddonLoader
 * @mixin \core\addon\BaseAddon
 * @method  array|null load(array $data)
 */
class AddonLoader extends Loader
{

    /**
     * 空间名
     * @var string
     */
    protected $namespace = '\\core\\addon\\';

    protected $config_name = 'addon';
    /**
     * 默认驱动
     * @return mixed
     */
    protected function getDefault()
    {
        return "Event";
    }

}