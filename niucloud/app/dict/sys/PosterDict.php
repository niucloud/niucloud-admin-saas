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

/**
 * 海报枚举类
 */
class PosterDict
{

    /**
     * 获取方式
     * @return array
     */
    public static function getType()
    {
        $list = [];
        $temp = array_filter(event('GetPosterType') ?? []);
        foreach($temp as $v){
            $list = array_merge($list, $v);
        }
        return $list;
    }
    public const ON = '1';//开启
    public const OFF = '2';//关闭
    /**
     * 状态
     * @return array
     */
    public static function getStatus()
    {
        return [
            self::ON => '启用',
            self::OFF => '关闭',
        ];
    }

}