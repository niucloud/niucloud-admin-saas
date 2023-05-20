<?php

namespace core\addon;


class Route extends BaseAddon
{
    /**
     * 加载路由
     * @param array $data 传入路由端口
     * @return array|mixed
     */
    public function load(array $data)
    {
        $addons  = $this->getLocalAddons();

        foreach ($addons as $k => $v)
        {
            $route_path = $this->getAddonAppPath($v). DIRECTORY_SEPARATOR. $data['app_type']. DIRECTORY_SEPARATOR. "route.php";
            if(is_file($route_path))
            {
                include $route_path;
            }
        }
        return true;
    }
}