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

class UniappTemplate extends BaseDict
{
    /**
     * 系统uniapp页面模板
     * @param array $params
     * @return array|false|mixed|string
     */
    public function load(array $params)
    {
        if (!empty($params[ 'params' ][ 'addon' ])) {
            $addons = [ $params[ 'params' ][ 'addon' ] ];
        } else {
            $addons = $this->getLocalAddons();
        }

        $app_keys = []; // 应用插件key集合
        $apps = []; // 应用插件集合
        $page_files = []; // 模板页面文件集合

        // 筛选插件
        if (!empty($params[ 'params' ]) && !empty($params[ 'params' ][ 'addon' ])) {
            $is_pass = true;
            foreach ($addons as $k => $v) {
                if ($params[ 'params' ][ 'addon' ] == $v) {
                    $addons = [ $v ];
                    $is_pass = false;
                    break;
                }
            }

            // 如果没有匹配到，则返回系统的
            if ($is_pass) {
                return $params[ 'data' ];
            }
        }

        foreach ($addons as $v) {
            $page_path = $this->getAddonDictPath($v) . "diy" . DIRECTORY_SEPARATOR . "template.php";
            if (is_file($page_path)) {
                if (!empty($params[ 'params' ][ 'query' ]) && $params[ 'params' ][ 'query' ] == 'addon') {
                    $file = include $page_path;
                    if (!empty($file)) {
                        $app_keys[] = $v;
                        $apps[ $v ] = $file;
                    }
                } else {
                    $page_files[] = $page_path;
                }
            }
        }

        // 查询存在模板页面的应用插件列表
        if (!empty($params[ 'params' ][ 'query' ]) && $params[ 'params' ][ 'query' ] == 'addon') {
            $addon_service = new AddonService();
            $list = $addon_service->getAddonListByKeys($app_keys);
            $list_key = array_column($list, 'key');
            $list = array_combine($list_key, $list);
            foreach ($list as $k => $v) {
                $list[ $k ][ 'list' ] = $apps[ $k ];
            }
            return $list;
        } else {
            // 查询应用插件下的模板页面数据
            $page_files_data = $this->loadFiles($page_files);
            if (!empty($params[ 'params' ]) && !empty($params[ 'params' ][ 'addon' ])) {
                $pages = [];
            } else {
                $pages = $params[ 'data' ];
            }
            foreach ($page_files_data as $file_data) {
                if (empty($pages)) {
                    $pages = $file_data;
                } else {
                    $pages = array_merge($pages, $file_data);
                }
            }
            return $pages;
        }
    }
}
