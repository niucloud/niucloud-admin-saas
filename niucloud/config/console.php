<?php
// +----------------------------------------------------------------------
// | 控制台配置
// +----------------------------------------------------------------------
return [
    // 指令定义
    'commands' => [
        // 定时任务
        'crontab' => 'app\command\CronTab',
        //消息队列 自定义命令
        'queue:work' => 'think\queue\command\Work',
        'queue:restart' => 'think\queue\command\Restart',
        'queue:listen' => 'think\queue\command\Listen'
    ],
];
