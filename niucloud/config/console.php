<?php
// +----------------------------------------------------------------------
// | 控制台配置
// +----------------------------------------------------------------------
return [
    // 指令定义
    'commands' => [
        //消息队列 自定义命令
        'queue:work' => 'think\queue\command\Work',
        'queue:restart' => 'think\queue\command\Restart',
        'queue:listen' => 'think\queue\command\Listen',
        'addon:install' => 'app\command\Addon\Install',
        'addon:uninstall' => 'app\command\Addon\Uninstall',
    ],
];
