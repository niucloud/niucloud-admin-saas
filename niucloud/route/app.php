<?php

use think\facade\Route;
Route::domain('install.php', ':\app\install\controller');
// 访问首页自动跳转到admin
Route::rule('/', function () {
    return redirect('/web');
});
// 管理后台
Route::rule('admin/:any', function () {
    return view(app()->getRootPath() . 'public/admin/index.html');
})->pattern(['any' => '\w+']);
// 手机端
Route::rule('wap/:any', function () {
    return view(app()->getRootPath() . 'public/wap/index.html');
})->pattern(['any' => '\w+']);
// 手机端
Route::rule('web/:any', function () {
    return view(app()->getRootPath() . 'public/web/index.html');
})->pattern(['any' => '\w+']);
//用于公众号授权证书
Route::any('MP_verify_<name>.txt',  function ($name) {
    echo $name;
});
