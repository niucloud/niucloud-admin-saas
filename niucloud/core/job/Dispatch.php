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

namespace core\job;

use core\util\Queue;

/**
 * 任务派遣队列
 */
class Dispatch
{

    /**
     * 加入队列
     * @param $action
     * @param array $data
     * @param string|null $queue_name
     * @return mixed
     */
    public static function invoke($action, array $data = [], int $secs = 0, string $queue_name = null, bool $is_async = true)
    {
        $class = get_called_class();//调用主调类
        if ($is_async) {
            $queue = Queue::instance()->job($class)->secs($secs);
            if (is_array($action)) {
                $queue->data(...$action);
            } else if (is_string($action)) {
                $queue->method($action)->data(...$data);
            }
            if ($queue_name) {
                $queue->setQueueName($queue_name);
            }
            return $queue->push();
        } else {
            $class_name = '\\' . $class;
            $res = new $class_name();
            if (is_array($action)) {
                return $res->doJob(...$action);
            } else {
                return $res->$action(...$data);
            }

        }
    }
}
