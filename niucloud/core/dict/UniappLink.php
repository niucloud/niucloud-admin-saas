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


class UniappLink extends BaseDict
{
    /**
     * 系统uniapp页面链接
     * @param array $data //系统
     * @return array|mixed
     */
    public function load(array $data)
    {
        $addons = $this->getLocalAddons();
        $link_files = [];
        foreach ($addons as $k => $v) {
            $link_path = $this->getAddonDictPath($v) . "diy" . DIRECTORY_SEPARATOR . "links.php";
            if (is_file($link_path)) {
                $link_files[] = $link_path;
            }
        }
        $link_files_data = $this->loadFiles($link_files);
        $links = $data;

        foreach ($link_files_data as $file_data) {
            if (empty($links)) {
                $links = $file_data;
            } else {
                $links = array_merge2($links, $file_data);
            }
        }
        return $links;
    }
}