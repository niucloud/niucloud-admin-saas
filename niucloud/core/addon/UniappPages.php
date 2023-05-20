<?php

namespace core\addon;


class UniappPages extends BaseAddon
{
    /**
     * 系统uniapp页面链接
     * @param array $data //系统
     * @return array|mixed
     */
    public function load(array $data)
    {
        $addons  = $this->getLocalAddons();
        $page_files = [];
        foreach ($addons as $k => $v)
        {
            $page_path = $this->getAddonEnumPath($v). "diy". DIRECTORY_SEPARATOR. "pages.php";
            if(is_file($page_path))
            {
                $page_files[] = $page_path;
            }
        }
        $page_files_data = $this->loadFiles($page_files);
        $pages = $data;
        foreach ($page_files_data as $file_data)
        {
            if(empty($pages))
            {
                $pages = $file_data;
            }else
                $pages = array_merge($pages, $file_data);
        }
        return $pages;
    }
}