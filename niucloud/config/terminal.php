<?php
// +----------------------------------------------------------------------
// | Trace设置 开启调试模式后有效
// +----------------------------------------------------------------------

return [

    // 命令行
    'commands'             => [

        // 查看版本的命令
        'version'      => [
            'npm'  => 'npm -v',
            'node' => 'node -v',
        ],
        'npm-admin'  => [
            'cwd'     => 'admin',
            'command' => 'npm install',
        ],

        'npm-web'  => [
            'cwd'     => 'web',
            'command' => 'npm install',
        ],

        'npm-uni-app'  => [
            'cwd'     => 'uni-app',
            'command' => 'npm install',
        ],

        'composer-install'  => [
            'cwd'     => 'niucloud',
            'command' => 'composer update',
        ],
        // 切换到国内镜像
        'set-mirror' => [
            //切换到淘宝镜像
            'npm'    => 'npm config set registry https://registry.npmjs.org',
            //切换到阿里云镜像
            'composer' => 'composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/',
        ],
    ],
];

