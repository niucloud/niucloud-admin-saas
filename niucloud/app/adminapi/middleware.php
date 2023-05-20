<?php
// 全局中间件定义文件
use app\adminapi\middleware\AllowCrossDomain;

return [
    //跨域请求中间件
    AllowCrossDomain::class,
];
