<?php

return [
    'SYSTEM_LINK' => [
        'title' => get_lang('dict_diy.system_link'),
        'child_list' => [
            [
                'name' => 'HELLO_WORLD_INFO',
                'title' => get_lang('dict_diy.hello_world_info'),
                'url' => '/pages/hello_world/info',
                'is_share' => 1
            ],
        ]
    ],
    'HELLO_WORLD_LINK' => [
        'title' => get_lang('dict_diy.hello_world_link'),
        'child_list' => [
            [
                'name' => 'HELLO_WORLD_INDEX',
                'title' => get_lang('dict_diy.hello_world_index'),
                'url' => '/pages/hello_world/index',
                'is_share' => 1
            ],
        ]
    ],
];