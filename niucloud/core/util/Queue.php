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

use think\facade\Queue as ThinkQueue;
use think\facade\Log;

/**
 * Class Queue
 * @package core\util
 * @method $this method(string $method) 设置任务执行方法
 * @method $this job(string $job) 设置任务执行类名
 * @method $this errorCount(int $error_count) 执行失败次数
 * @method $this data(...$data) 执行数据
 * @method $this secs(int $secs) 延迟执行秒数
 */
class Queue
{

    /**
     * 错误信息
     * @var string
     */
    protected $error;
    /**
     * 任务执行方法
     * @var string
     */
    protected $method = 'doJob';

    /**
     * 默认任务执行方法名
     * @var string
     */
    protected $default_method;
    /**
     * 任务类名
     * @var string
     */
    protected $job;
    /**
     * 队列失败次数
     * @var int
     */
    protected $error_count = 3;
    /**
     * 数据
     * @var array|string
     */
    protected $data;
    /**
     * 队列名称
     * @var null
     */
    protected $queue_name = null;
    /**
     * 延迟执行秒数
     * @var int
     */
    protected $secs = 0;

    /**
     * 允许的方法或属性
     * @var array
     */
    protected $allow_function = ['method', 'data', 'error_count', 'job', 'secs'];
    /**
     * 当前实例
     * @var static
     */
    protected static $instance;
    protected function __construct()
    {
        $this->default_method = $this->method;
    }

    /**
     * 实例化当前队列
     * @return static
     */
    public static function instance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new static();
        }
        return self::$instance;
    }

    /**
     * 设置队列名称
     * @param string $queue_name
     * @return $this
     */
    public function setQueueName(string $queue_name)
    {
        $this->queue_name = $queue_name;
        return $this;
    }

    /**
     * 加入队列
     * @param array|null $data
     * @return bool
     */
    public function push(?array $data = null)
    {
        if (!$this->job) {
            return $this->setError('JOB_NOT_EXISTS');
        }
        $jodValue = $this->getValues($data);
        //todo 队列扩展策略调度,
        $res = ThinkQueue::{$this->action()}(...$jodValue);
        if (!$res) {
            $res = ThinkQueue::{$this->action()}(...$jodValue);
            if (!$res) {
                Log::error('队列推送失败，参数：' . json_encode($jodValue));
            }
        }
        $this->clean();
        return $res;
    }

    /**
     * 清除数据
     */
    public function clean()
    {
        $this->secs = 0;
        $this->data = [];
        $this->queue_name = null;
        $this->error_count = 3;
        $this->method = $this->default_method;
    }

    /**
     * 获取任务方式
     * @return string
     */
    protected function action()
    {
        return $this->secs ? 'later' : 'push';
    }

    /**
     * 获取参数
     * @param $data
     * @return array
     */
    protected function getValues($data)
    {
        $jobData['data'] = $data ?: $this->data;
        $jobData['method'] = $this->method;
        $jobData['error_count'] = $this->error_count;
        if ($this->method != $this->default_method) {
            $this->job .= '@'.$this->method;
        }
        if ($this->secs) {
            return [$this->secs, $this->job, $jobData, $this->queue_name];
        } else {
            return [$this->job, $jobData, $this->queue_name];
        }
    }

    /**
     * 不可访问时调用
     * @param $name
     * @param $arguments
     * @return $this
     */
    public function __call($method, $arguments)
    {
        if (in_array($method, $this->allow_function)) {
            if ($method === 'data') {
                $this->{$method} = $arguments;
            } else {
                $this->{$method} = $arguments[0] ?? null;
            }
            return $this;
        } else {
            throw new \Exception('Method does not exist' . __CLASS__ . '->' . $method . '()');
        }
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
}
