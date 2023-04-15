<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2023-02-17
 * Time: 15:58
 */

namespace extend\driver\pay;

use extend\driver\pay\driver\Alipay;

/**
 * 文件管理驱动类
 * Class FileDriver
 * @package extend\driver\pay
 * @mixin Alipay
 */
class PayDriver
{
    /**
     * 附件处理引擎
     * @var BasePay
     */
    private $driver;
    private $config;
    /**
     * FileDriver constructor.
     * @param
     */
    public function __construct(array $config, string $type){
        $this->config = $config;

        $this->driver = $this->getDriverClass($type);
    }

    /**
     * 获取启用的存储引擎
     */
    public function getDriverClass(string $type){

        $class = __NAMESPACE__ . '\\driver\\' . ucfirst(strtolower($type));
        return new $class($this->config);
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
}