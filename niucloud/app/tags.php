<?php
// 应用行为扩展定义文件
return [
    // 应用初始化
    'app_init'     => [],
    // 应用开始
    'app_begin'    => [],
    // 模块初始化
    'module_init'  => [],
    // 操作开始执行
    'action_begin' => [],
    // 视图内容过滤
    'view_filter'  => [],
    // 日志写入
    'log_write'    => [],
    // 应用结束
    'app_end'      => [],

    // 任务失败统一回调,有四种定义方式
    'queue_failed'=> [
        ['app\behavior\QueueFailedLogger', 'report'],
        // 数组形式，[ 'ClassName' , 'methodName']
//        ['app\behavior\QueueFailedLogger', 'report'],

        // 字符串(静态方法)，'StaicClassName::methodName'
        // 'MyQueueFailedLogger::logAllFailedQueues'

        // 字符串(对象方法)，'ClassName'，此时需在对应的ClassName类中添加一个名为 queueFailed 的方法
        // 'application\\behavior\\MyQueueFailedLogger'

        // 闭包形式
        /*
        function( &$jobObject , $extra){
            // var_dump($jobObject);
            return true;
        }
        */
    ]
];