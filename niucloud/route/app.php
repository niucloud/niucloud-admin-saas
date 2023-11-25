<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
use think\facade\Route;
use think\facade\Request;

Route::domain('install.php', ':\app\install\controller');
// 访问首页自动跳转到admin
Route::rule('/', function () {
    if (Request::isMobile()) {
        return redirect('/wap');
    } else {
        return redirect('/web');
    }
});
// 管理后台
Route::rule('admin/:any', function () {
    return view(app()->getRootPath() . 'public/admin/index.html');
})->pattern(['any' => '\w+']);
// 站点端
Route::rule('site', function () {
    return view(app()->getRootPath() . 'public/admin/index.html');
})->pattern(['any' => '\w+']);
// 站点管理端
Route::rule('home', function () {
    return view(app()->getRootPath() . 'public/admin/index.html');
})->pattern(['any' => '\w+']);
// 装修端
Route::rule('decorate/:any', function () {
    return view(app()->getRootPath() . 'public/admin/index.html');
})->pattern(['any' => '\w+']);
// 手机端
Route::rule('wap/:any', function () {
    return view(app()->getRootPath() . 'public/wap/index.html');
})->pattern(['any' => '\w+']);
// 电脑端
Route::rule('web/:any', function () {
    return view(app()->getRootPath() . 'public/web/index.html');
})->pattern(['any' => '\w+']);
//用于公众号授权证书
Route::any('MP_verify_<name>.txt',  function ($name) {
    echo $name;
});
