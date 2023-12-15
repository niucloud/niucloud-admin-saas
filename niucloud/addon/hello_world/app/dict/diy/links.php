<?php

return [
    'HELLO_WORLD_LINK' => [
        'key' => 'hello_world',
        'addon_title' => get_lang('dict_diy.hello_world_title'),
        'title' => get_lang('dict_diy.hello_world_link'),
        'child_list' => [
            [
                'name' => 'HELLO_WORLD_INDEX',
                'title' => get_lang('dict_diy.hello_world_index'),
                'url' => '/hello_world/pages/index',
                'is_share' => 1,
                'action' => ''
            ],
            [
                'name' => 'HELLO_WORLD_INFO',
                'title' => get_lang('dict_diy.hello_world_info'),
                'url' => '/hello_world/pages/info',
                'is_share' => 1,
                'action' => ''
            ],
        ]
    ],
];