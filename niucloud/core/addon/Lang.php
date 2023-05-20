<?php

namespace core\addon;


class Lang extends BaseAddon
{
    /**
     * 加载事件
     * @param array $data  //传入语言类型
     * @return array|mixed
     */
    public function load(array $data)
    {
        $addons  = $this->getLocalAddons();
        $system_lang_path = $this->getAppPath()."lang". DIRECTORY_SEPARATOR. $data['lang_type']. DIRECTORY_SEPARATOR;
        $lang_files = [
            $system_lang_path. "api.php",
            $system_lang_path. "enum.php",
            $system_lang_path. "validate.php",
        ];


        foreach ($addons as $k => $v)
        {
            $lang_path = $this->getAddonAppPath($v)."lang". DIRECTORY_SEPARATOR. $data['lang_type']. DIRECTORY_SEPARATOR;

            $api_path = $lang_path."api.php";
            $enum_path = $lang_path."enum.php";
            $validate_path = $lang_path."validate.php";
            if(is_file($api_path))
            {
                $lang_files[] = $api_path;

            }
            if(is_file($enum_path))
            {
                $lang_files[] = $enum_path;
            }
            if(is_file($validate_path))
            {
                $lang_files[] = $validate_path;
            }
        }
        $files_data = $this->loadFiles($lang_files);
        $lang = [];
        foreach ($files_data as $file_data) {
            $lang = empty($lang) ? $file_data : array_merge($lang, $file_data);
        }
        return $lang;
    }
}