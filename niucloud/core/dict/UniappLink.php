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


use app\service\admin\addon\AddonService;

class UniappLink extends BaseDict
{
    /**
     * 系统uniapp页面链接
     * @param array $data
     * @param array $params
     * @return array|false|mixed|string
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function load(array $data = [], array $params = [])
    {
        if (!empty($params[ 'addon' ])) {
            $addons = [ $params[ 'addon' ] ];
        } else {
            $addons = $this->getLocalAddons();
        }

        $link_files = [];

        foreach ($addons as $v) {
            $link_path = $this->getAddonDictPath($v) . "diy" . DIRECTORY_SEPARATOR . "links.php";
            if (is_file($link_path)) {
                $link_files[ $v ] = $link_path;
            }
        }

        $addon_service = new AddonService();
        $addon_info_list = $addon_service->getAddonListByKeys(array_keys($link_files));

        if (!empty($params[ 'query' ]) && $params[ 'query' ] == 'addon') {
            $list_key = array_column($addon_info_list, 'key');
            $addon_info_list = array_combine($list_key, $addon_info_list);
            return $addon_info_list;
        } else {

            $links = $data;

            foreach ($link_files as $k => $v) {
                $addon_link = include $v;
                if (!empty($addon_link)) {
                    $addon_info = [];
                    foreach ($addon_info_list as $ck => $cv) {
                        if ($cv[ 'key' ] == $k) {
                            $addon_info = $cv;
                            break;
                        }
                    }

                    foreach ($addon_link as $ck => $cv) {
                        $addon_link[ $ck ][ 'addon_info' ] = $addon_info;
                    }
                    $links = array_merge($links, $addon_link);
                }
            }

            return $links;
        }
    }
}
