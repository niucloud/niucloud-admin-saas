<?php

return [
    'HELLO_WORLD_LINK' => [
        'title' => get_lang('dict_diy.hello_world_link'),
        'child_list' => [
            [
                'name' => 'HELLO_WORLD_INDEX',
                'title' => get_lang('dict_diy.hello_world_index'),
                'url' => '/addon/hello_world/pages/index',
                'is_share' => 1,
                'action' => ''
            ],
            [
                'name' => 'HELLO_WORLD_INFO',
                'title' => get_lang('dict_diy.hello_world_info'),
                'url' => '/addon/hello_world/pages/info',
                'is_share' => 1,
                'action' => ''
            ],
        ]
    ],
];