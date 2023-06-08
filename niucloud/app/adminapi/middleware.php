<?php
// 全局中间件定义文件
use app\adminapi\middleware\AllowCrossDomain;
use think\middleware\LoadLangPack;
return [
    //跨域请求中间件
    AllowCrossDomain::class,
    //语言中间件
    LoadLangPack::class,

];
