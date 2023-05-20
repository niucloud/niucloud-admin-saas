<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: yunwuxin <448901948@qq.com>
// +----------------------------------------------------------------------

return [
    'default'     => 'database',
    'connections' => [
        'sync'     => [
            'type' => 'sync',
        ],
        'database' => [
            'type'       => 'database',
            'queue'      => 'default',
            'table'      => 'jobs',
            'connection' => null,
        ],
        'redis'    => [
            // 驱动方式
            'type'          => 'redis',

            'queue'      => 'default',
            // 服务器地址
            'host'          => env('redis.redis_hostname', '127.0.0.1'),
            // 端口
            'port'          => env('redis.port', '6379'),
            // 密码
            'password'      => env('redis.redis_password', ''),
            // 缓存有效期 0表示永久缓存
            'expire'        => 0 ,
            // 缓存前缀
            'prefix'     => 'QUERY',
            // 缓存标签前缀
            'tag_prefix'    => 'QUERY:',
            // 数据库 0号数据库
            'select'        => env('redis.select', 0),
            // 服务端主动关闭
            'timeout'       => 0,

            'persistent' => false,
        ],
    ],
    'failed'      => [
        'type'  => 'none',// none  不记录失败任务  database  将失败任务迁移到失败任务表
        'table' => 'jobs_failed',
    ],
];
