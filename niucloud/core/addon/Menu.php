<?php

namespace core\addon;


class Menu extends BaseAddon
{
    /**
     * 加载菜单
     * @param array $data  //传入插件，应用类型
     * @return array|mixed
     */
    public function load(array $data):array
    {
        $menu_path = $this->getAddonEnumPath($data['addon'])."menu".DIRECTORY_SEPARATOR. $data['app_type']. ".php";
        if(is_file($menu_path))
        {
            return include $menu_path;
        }
        return [];
    }
}