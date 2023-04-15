<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2023-02-17
 * Time: 15:58
 */

namespace extend\driver\file;

use extend\driver\file\storage\Local;

/**
 * 文件管理驱动类
 * Class FileDriver
 * @package extend\driver\file
 * @mixin Local
 */
class FileDriver
{
    /**
     * 附件处理引擎
     * @var Storage
     */
    private $driver;

    /**
     * FileDriver constructor.
     * @param $config{ storage_type: 存储方式  local  本地存储,  }
     */
    public function __construct(private $config, string $storage_type){
        $this->driver = $this->getDriverClass($storage_type);
    }

    /**
     * 获取启用的存储引擎
     */
    public function getDriverClass(string $storage_type){
        $class = __NAMESPACE__ . '\\storage\\' . ucfirst(strtolower($storage_type));
        return new $class($this->config);
    }

    /**
     * 上传附件
     * @param string $path
     * @return mixed
     */
    public function upload(string $dir){
        $this->driver->concatFullPath($dir);
        return $this->driver->upload($dir);
    }

    /**
     * 远程拉取附件
     * @param $url
     * @param $key
     * @return mixed
     */
    public function fetch(string $url, ?string $key){
        return $this->driver->fetch($url, $key);
    }

    /**
     * 读取文件
     * @param $name
     */
    public function read(string $name, bool $is_rename = true){
        return $this->driver->read($name, $is_rename);
    }
    public function setUpload(){

    }

    /**
     * 动态调用
     * @param $method
     * @param $arguments
     * @return mixed
     */
    public function __call($method, $arguments)
    {
        return $this->driver->{$method}(...$arguments);
    }
//    /**
//     * 获取存储的文件名
//     */
//    public function getFileName(){
//        return $this->driver->getFileName();
//    }
//
//    /**
//     * 获取存储的文件信息
//     * @return mixed
//     */
//    public function getFileInfo(){
//        return $this->driver->getFileInfo();
//    }
//
//    /**
//     * 获取上传后的完整路径
//     * @return mixed
//     */
//    public function getFullPath(){
//        return $this->driver->getFullPath();
//    }
}