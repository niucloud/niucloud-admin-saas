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

namespace app\enum\diy;

/**
 * 自定义组件类型
 * Class ComponentTypeEnum
 * @package app\enum\sys
 */
class ComponentTypeEnum
{
    // 基础组件
    const BASICS = 'BASICS';

    /**
     * 获取组件类型
     * @return array
     */
    public static function getType()
    {
        return [
            self::BASICS => get_lang('enum_diy.component_type_basics'),
        ];
    }

}