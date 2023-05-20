<?php

return [
    'default' => 'local',//默认驱动
    'drivers' => [
        //本地上传
        'local' => [],
        //七牛云
        'qiniu' => [
            'access_key' => '',
            'secret_key' => '',
            'bucket' => ''
        ],
        //阿里云
        'aliyun' => [
            'access_key' => '',
            'secret_key' => '',
            'endpoint' => '',
            'bucket' => ''
        ],
        //腾讯云
        'qcloud' => [
            'access_key' => '',
            'secret_key' => '',
            'region' => '',
            'bucket' => ''
        ],
    ],
    // 默认规则
    'rules' => [
        'image' => [
            'ext' => ['jpg', 'jpeg', 'webp', 'png', 'gif'],
            'mime' => [ 'image/jpeg','image/gif','image/png','image/webp'],
            'size' => 2097152
        ],
        'video' => [
            'ext' => ['mp4'],
            'mime' => [ 'video/mp4'],
            'size' => 2097152
        ],
        'wechat' => [
            'ext' => ['pem'],
            'mime' => [
                'application/x-x509-ca-cert',
                'application/octet-stream'
            ],
            'size' => 2097152
        ],
        'aliyun' => [
            'ext' => ['crt'],
            'mime' => [
                'application/x-x509-ca-cert',
                'application/octet-stream'
            ],
            'size' => 2097152
        ],
    ]
];
