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


class UniappComponent extends BaseDict
{
    /**
     * 系统uniapp组件配置
     * @param array $data //系统
     * @return array|mixed
     */
    public function load(array $data)
    {
        $addons  = $this->getLocalAddons();
        $components_files = [];
        foreach ($addons as $k => $v)
        {
            $components_path = $this->getAddonDictPath($v). "diy". DIRECTORY_SEPARATOR. "components.php";
            if(is_file($components_path))
            {
                $components_files[] = $components_path;
            }
        }
        $components_files_data = $this->loadFiles($components_files);
        $components = $data;
        foreach ($components_files_data as $file_data)
        {
            $components = empty($components) ? $file_data : array_merge2($components, $file_data);
        }
        return $components;
    }
}