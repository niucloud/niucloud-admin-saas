<?php

return [
    //文件执行序列号
    'bind' => [
    ],

    'listen' => [

        //应用管理
        'AppManage' => ['addon\hello_world\app\listener\AppManageListener'],
        'SiteLayout' => ['addon\hello_world\app\listener\SiteLayout']
    ],

    'subscribe' => [
    ],
];
