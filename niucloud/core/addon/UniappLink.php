<?php

namespace core\addon;


class UniappLink extends BaseAddon
{
    /**
     * 系统uniapp页面链接
     * @param array $data //系统
     * @return array|mixed
     */
    public function load(array $data)
    {
        $addons  = $this->getLocalAddons();
        $link_files = [];
        foreach ($addons as $k => $v)
        {
            $link_path = $this->getAddonEnumPath($v). "diy". DIRECTORY_SEPARATOR. "links.php";
            if(is_file($link_path))
            {
                $link_files[] = $link_path;
            }
        }
        $link_files_data = $this->loadFiles($link_files);
        $links = $data;
        foreach ($link_files_data as $file_data)
        {
            if(empty($links))
            {
                $links = $file_data;
            }else
                $links = array_merge($links, $file_data);
        }
        return $links;
    }
}