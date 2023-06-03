<?php

namespace core\loader;

use think\Facade;
use think\helper\Str;

abstract class Loader extends Facade
{
    protected $config_name = null;//配置文件名

    protected $name = null;
    protected $namespace = null;

    protected $class = null;
    protected $config = null;
    protected $config_file = null;
    /**
     * @param string $type
     * @return object|\think\DbManager
     * @throws \Exception
     */
    public function __construct($name = '', array $config = []){
        if(is_array($name)){
            $config = $name;
            $name = null;
        }
        if($name){
            $this->name = $name;
        }
        $this->config = $config;
    }

    /**
     * 获取默认驱动
     * @return mixed
     */
    abstract protected function getDefault();

    /**
     * 创建实例对象
     * @param string $type
     * @return object|\think\DbManager
     * @throws \Exception
     */
    public function create(string $type){
        $class = $this->getClass($type);
        return self::createFacade($class, [
            $this->name,
            $this->config,
            $this->config_file
        ], true);
    }

    /**
     * 获取类
     * @param string $type
     * @return mixed|string
     * @throws \Exception
     */
    public function getClass(string $type){
        $class = config($this->config_name.'.drivers.'.$type.'.driver');
        if (!empty($class) && class_exists($class)) {
            return $class;
        }else{
            if ($this->namespace || str_contains($type, '\\')) {
                $class = str_contains($type, '\\') ? $type : $this->namespace . $type;
                if(class_exists($class)){
                    return $class;
                }else{
                    $class = str_contains($type, '\\') ? $type : $this->namespace . Str::studly($type);
                    if (class_exists($class)) {
                        return $class;
                    }
                }
            }
        }
        throw new \Exception("Driver [$type] not supported.");
    }

    /**
     * 通过装载器获取实例
     * @return object|\think\DbManager
     * @throws \Exception
     */
    public function getLoader(){

        if(empty($this->class)){
            $this->name = $this->name ?: $this->getDefault();
            if (!$this->name) {
                throw new \Exception(sprintf(
                    'could not find driver [%s].', static::class
                ));
            }
            $this->class = $this->create($this->name);
        }
        return $this->class;
    }
    /**
     * 动态调用
     * @param $method
     * @param $arguments
     * @return mixed
     */
    public function __call($method, $arguments)
    {
        return $this->getLoader()->{$method}(...$arguments);
    }

}