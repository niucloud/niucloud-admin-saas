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


class Menu extends BaseDict
{
    /**
     * 加载菜单
     * @param array $data //传入插件，应用类型
     * @return array
     */
    public function load(array $data): array
    {
        $menu_path = $this->getAddonDictPath($data['addon']) . "menu" . DIRECTORY_SEPARATOR . $data['app_type'] . ".php";
        if (is_file($menu_path)) {
            return include $menu_path;
        }
        return [];
    }
}