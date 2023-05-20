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

namespace core\util;

/**
 * 系统配置文件加载（event，lang）等
 * Class ConfigUtil
 * @package core\util
 */
class ConfigUtil
{
    /**
     * config参数
     * @var array
     */
    public $config = [];

    public $files = [];

    //是否保留唯一key
    public $unique_key;

    /**
     * 配置文件目录
     * @var string
     */
    protected $path;

    /**
     * 初始化
     * ConfigUtil constructor.
     * @param $path
     * @param $init
     */
    public function __construct(string $path, array $init = [], bool $unique_key = false)
    {
        $this->path = $path;
        $this->config = $init;
        $this->unique_key = $unique_key;
    }

    /**
     * 加载配置文件（多种格式）
     * @access public
     * @param string $file 配置文件名
     * @param string $name 一级配置名
     * @return array
     */
    public function loadConfig() : array
    {
        $files_data = $this->loadFiles();
        if (!empty($files_data)) {
            foreach ($files_data as $data) {
                if ($this->unique_key) {
                    $this->config = $this->config + $data;
                } else {
                    $this->config = array_merge($this->config, $data);
                }
            }
        }

        return $this->config;
    }

    /**
     * 加载返回所有文件数据
     */
    public function loadFiles()
    {
        $this->parseFiles($this->path);
        $default_sort = 100000;
        $files_data = [];
        if (!empty($this->files)) {
            foreach ($this->files as $file) {
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
     * 整理所有文件
     * @param string $path
     */
    protected function parseFiles(string $path)
    {
        $files = scandir($path);
        //先加载系统(system),然后加载非插件，最后按照插件安装顺序进行加载
        foreach ($files as $file) {
            if ($file != '.' && $file != '..') {
                if (is_dir($path . DIRECTORY_SEPARATOR . $file)) {
                    $this->parseFiles($path . DIRECTORY_SEPARATOR . $file);
                } else {
                    $this->files[] = $path . DIRECTORY_SEPARATOR . $file;
                }
            }
        }
    }

}
