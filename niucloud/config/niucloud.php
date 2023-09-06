<?php

return [
    'auth' => [
        'code' => env('niucloud.code', ''),//授权码
        'secret' => env('niucloud.secret', ''),//授权秘钥
    ],
    'http' => [
        'max_retries' => 1,// 重试次数，默认 1，指定当 http 请求失败时重试的次数。
        'retry_delay' => 500,//重试延迟间隔（单位：ms），默认 500
        'timeout' => 5.0,//最大运行时间(超时)
        'verify' => false,//请求时验证SSL证书行为。设置成 true 启用SSL证书验证，默认使用操作系统提供的CA包。设置成 false 禁用证书验证(这是不安全的！)。设置成字符串启用验证，并使用该字符串作为自定义证书CA包的路径。
    ],
    'response_type' => 'array',

];
