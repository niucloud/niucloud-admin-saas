<?php
// 全局中间件定义文件
use app\middleware\AllowCrossDomain;
use think\middleware\LoadLangPack;

return [
    // 全局请求缓存
    // \think\middleware\CheckRequestCache::class,
    // 多语言加载
     LoadLangPack::class,
    //跨域请求中间件
    AllowCrossDomain::class,
    // Session初始化
    // \think\middleware\SessionInit::class
];
