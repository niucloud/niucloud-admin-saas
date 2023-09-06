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

namespace app\dict\sys;

use core\dict\DictLoader;

/**
 * 获取图标
 * Class IconDict
 * @package app\dict\sys
 */
class IconDict
{

    public static function getIcon($params = [])
    {
        $system_pages = [];
        return (new DictLoader("Icon"))->load($system_pages);
    }

}