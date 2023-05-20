<?php

namespace core\addon;


class Notice extends BaseAddon
{
    /**
     * 系统uniapp页面链接
     * @param array $data //系统
     * @return array|mixed
     */
    public function load(array $data)
    {
        $template_files = [];
        $system_path = $this->getEnumPath(). "notice". DIRECTORY_SEPARATOR. $data['type']. ".php";
        if(is_file($system_path))
        {
            $template_files[] = $system_path;
        }
        $addons  = $this->getLocalAddons();
        foreach ($addons as $k => $v)
        {
            $template_path = $this->getAddonEnumPath($v). "notice". DIRECTORY_SEPARATOR. $data['type']. ".php";
            if(is_file($template_path))
            {
                $template_files[] = $template_path;
            }
        }
        $template_files_data = $this->loadFiles($template_files);

        $template_data_array = [];
        foreach ($template_files_data as $file_data)
        {
            $template_data_array = empty($template_data_array) ? $file_data : array_merge($template_data_array, $file_data);
        }
        return $template_data_array;
    }
}