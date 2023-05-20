<?php

return [
    //文件执行序列号
    'bind' => [
    ],

    'listen' => [

        //应用管理
        'appManage' => ['addon\hello_world\app\listener\AppManageListener'],
    ],

    'subscribe' => [
    ],
];
