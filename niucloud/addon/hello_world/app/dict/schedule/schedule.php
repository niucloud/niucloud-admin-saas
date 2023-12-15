<?php

return [
    [
        'key' => 'addon_schedule',
        'name' => '插件计划任务',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 1
        ],
        'class' => 'addon\hello_world\app\job\AddonSchedule',
        'function' => ''
    ],
];
