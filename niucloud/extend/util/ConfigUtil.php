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

namespace extend\util;

use think\facade\Env;

/**
 * 系统配置文件加载（event，lang）等
 * Class ConfigUtil
 * @package extend\util
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
     * @param  string $file 配置文件名
     * @param  string $name 一级配置名
     * @return array
     */
    public function loadConfig(): array
    {
        $this->praseFiles($this->path);

        if(!empty($this->files))
        {
            foreach ($this->files as $file)
            {
                $config = include $file;

                if(empty($this->config))
                {
                    $this->config = $config;
                }else{
                    if(!empty($config))
                    {
                        if($this->unique_key)
                        {
                            $this->config = $this->config + $config;
                        }else
                            $this->config = array_merge($this->config, $config);

                    }
                }
            }
        }

        return $this->config;
    }

    /**
     * 加载返回所有文件
     */
    public function loadFiles()
    {
        $this->praseFiles($this->path);
        return $this->files;
    }

    /**
     * 整理所有文件
     * @param string $path
     */
    protected function praseFiles(string $path)
    {
        $files = scandir($path);
        foreach ($files as $file) {
            if ($file != '.' && $file != '..') {
                if (is_dir($path . DIRECTORY_SEPARATOR . $file)) {
                    $this->praseFiles($path . DIRECTORY_SEPARATOR . $file);
                } else {
                    $this->files[] = $path . DIRECTORY_SEPARATOR . $file;
                }
            }
        }
    }


}
