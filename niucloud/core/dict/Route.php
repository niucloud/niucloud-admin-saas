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


class Route extends BaseDict
{
    /**
     * 加载路由
     * @param array $data 传入路由端口
     * @return true
     */
    public function load(array $data)
    {
        $addons = $this->getLocalAddons();

        foreach ($addons as $k => $v) {
            $route_path = $this->getAddonAppPath($v) . DIRECTORY_SEPARATOR . $data['app_type'] . DIRECTORY_SEPARATOR . "route" . DIRECTORY_SEPARATOR . "route.php";
            if (is_file($route_path)) {
                include $route_path;
            }
        }
        return true;
    }
}