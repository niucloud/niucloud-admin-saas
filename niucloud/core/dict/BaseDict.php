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

use core\loader\Storage;
use think\facade\Cache;
use think\facade\Db;

/**
 * Class BaseAddon
 * @package 
 */
abstract class BaseDict extends Storage
{
    //插件整体缓存标识
    public static $cache_tag_name = 'addon_cash';
    /**
     * 初始化
     * @param array $config
     * @return mixed|void
     */
    protected function initialize(array $config = [])
    {
    }

    /**
     * 获取本地插件目录(已安装)
     */
    protected function getLocalAddons()
    {
        if(!file_exists("../install.lock"))
        {
            //尚未安装不加载插件
            return [];
        }
        $addons = Cache::get("local_install_addons");
        if(empty($addons))
        {
            $addons = Db::name("addon")->column("key");
            if(empty($addons))
            {
                Cache::set("local_install_addons", -1);
            }else
                Cache::set("local_install_addons", $addons);
        }
        if($addons == -1)
        {
            $addons = [];
        }
        return $addons;
    }

    /**
     * 获取插件目录
     * @param string $addon
     * @return string
     */
    protected function getAddonPath(string $addon)
    {
        return root_path() . 'addon' . DIRECTORY_SEPARATOR. $addon. DIRECTORY_SEPARATOR;

    }

    /**
     * 获取系统整体app目录
     * @return string
     */
    protected function getAppPath()
    {
        return root_path(). "app". DIRECTORY_SEPARATOR;
    }
    /**
     * 获取插件对应app目录
     * @param string $addon
     * @return string
     */
    protected function getAddonAppPath(string $addon)
    {
        return $this->getAddonPath($addon). "app". DIRECTORY_SEPARATOR;
    }

    /**
     *获取系统dict path
     */
    protected function getDictPath()
    {
        return root_path(). "app". DIRECTORY_SEPARATOR. "dict". DIRECTORY_SEPARATOR;;
    }

    /**
     *获取插件对应的dict目录
     * @param string $addon
     */
    protected function getAddonDictPath(string $addon)
    {
        return $this->getAddonPath($addon). "app". DIRECTORY_SEPARATOR. "dict". DIRECTORY_SEPARATOR;
    }

    /**
     *获取插件对应的config目录
     * @param string $addon
     */
    protected function getAddonConfigPath(string $addon)
    {
        return $this->getAddonPath($addon). "config". DIRECTORY_SEPARATOR;
    }

    /**
     * 加载文件数据
     * @param $files
     * @return array
     */
    protected function loadFiles($files)
    {
        $default_sort = 100000;
        $files_data = [];
        if (!empty($files)) {
            foreach ($files as $file) {
                $config = include $file;
                if (!empty($config)) {
                    if (isset($config[ 'file_sort' ])) {
                        $sort = $config[ 'file_sort' ];
                        unset($config[ 'file_sort' ]);
                        $sort = $sort * 10;
                        while (array_key_exists($sort, $files_data)) {
                            $sort++;
                        }
                        $files_data[ $sort ] = $config;
                    } else {
                        $files_data[ $default_sort ] = $config;
                        $default_sort++;
                    }
                }
            }
        }
        ksort($files_data);
        return $files_data;
    }

    /**
     * 加载
     * @return mixed
     */
    abstract public function load(array $data);
}
