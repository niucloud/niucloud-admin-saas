<?php

namespace core\addon;


class UniappComponent extends BaseAddon
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
            $components_path = $this->getAddonEnumPath($v). "diy". DIRECTORY_SEPARATOR. "components.php";
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