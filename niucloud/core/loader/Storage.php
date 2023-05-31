<?php
namespace core\loader;


abstract class Storage
{

    /**
     * 驱动名称
     * @var string
     */
    protected $name;

    /**
     * 驱动配置文件名
     * @var string
     */
    protected $config_file;

    /**
     * 错误信息
     * @var string
     */
    protected $error;

    /**
     * BaseStorage constructor.
     * @param string $name 驱动名
     * @param string $config_file 驱动配置名
     * @param array $config 其他配置
     */
    public function __construct(string $name, array $config = [], string $config_file = null)
    {
        $this->name = $name;
        $this->config_file = $config_file;
        $this->initialize($config);
    }
    /**
     * 设置错误信息
     * @param string|null $error
     * @return bool
     */
    protected function setError(?string $error = null)
    {
        $this->error = $error;
        return false;
    }

    /**
     * 获取错误信息
     * @return string
     */
    public function getError()
    {
        $error = $this->error;
        $this->error = null;
        return $error;
    }

    /**
     * 初始化
     * @param array $config
     * @return mixed
     */
    abstract protected function initialize(array $config);

}
