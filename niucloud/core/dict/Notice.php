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

class Notice extends BaseDict
{
    /**
     * 系统uniapp页面链接
     * @param array $data //系统
     * @return array|mixed
     */
    public function load(array $data)
    {
        $template_files = [];
        $system_path = $this->getDictPath() . "notice" . DIRECTORY_SEPARATOR . $data[ 'type' ] . ".php";
        if (is_file($system_path)) {
            $template_files[] = $system_path;
        }
        $addons = (new AddonService())->getAddonKeysBySiteId(request()->siteId());
        foreach ($addons as $v) {
            $template_path = $this->getAddonDictPath($v) . "notice" . DIRECTORY_SEPARATOR . $data[ 'type' ] . ".php";
            if (is_file($template_path)) {
                $template_files[] = $template_path;
            }
        }
        $template_files_data = $this->loadFiles($template_files);

        $template_data_array = [];
        foreach ($template_files_data as $file_data) {
            $template_data_array = empty($template_data_array) ? $file_data : array_merge($template_data_array, $file_data);
        }
        return $template_data_array;
    }
}
