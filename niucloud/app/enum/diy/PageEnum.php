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
 * 自定义页面类型
 * Class PageEnum
 * @package app\enum\sys
 */
class PageEnum
{
    // 首页
    const INDEX = 'DIY_INDEX';
    const INDEX_PAGE = 'pages/index/index';

    // 个人中心
    const MEMBER_INDEX = 'DIY_MEMBER_INDEX';
    const MEMBER_PAGE = 'pages/member/index';

    // 自定义页面
    const DIY_PAGE = 'DIY_PAGE';
    const DIY_PAGE_PAGE = 'pages/index/diy';

    /**
     * 获取页面类型
     * @param string $type
     */
    public static function getPageType($type = '')
    {
        $data = [
            self::INDEX => [
                'type' => self::INDEX,
                'type_name' => get_lang('enum_diy.page_index'),
                'page' => self::INDEX_PAGE,
            ],
            self::MEMBER_INDEX => [
                'type' => self::MEMBER_INDEX,
                'type_name' => get_lang('enum_diy.page_member_index'),
                'page' => self::MEMBER_PAGE,
            ],
            self::DIY_PAGE => [
                'type' => self::DIY_PAGE,
                'type_name' => get_lang('enum_diy.page_diy'),
                'page' => self::DIY_PAGE_PAGE,
            ]
        ];
        if (empty($type)) {
            return $data;
        }
        return $data[ $type ] ?? '';
    }

}