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


class UniappPages extends BaseDict
{
    /**
     * 系统uniapp页面
     * @param array $data
     * @return array|mixed
     */
    public function load(array $data)
    {
        $addons = $this->getLocalAddons();
        $page_files = [];
        foreach ($addons as $v) {
            $page_path = $this->getAddonDictPath($v) . "diy" . DIRECTORY_SEPARATOR . "pages.php";
            if (is_file($page_path)) {
                $page_files[] = $page_path;
            }
        }
        $page_files_data = $this->loadFiles($page_files);
        $pages = $data;
        foreach ($page_files_data as $file_data) {
            if (empty($pages)) {
                $pages = $file_data;
            } else {
                $pages = array_merge2($pages, $file_data);
            }
        }
        return $pages;
    }
}
