<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud-admin.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;
use think\facade\Route;


/**
 * 路由
 */
Route::group('auth', function () {
    /***************************************************** 授权信息 ****************************************************/
    Route::put('logout', 'login.Login/logout');
    /***************************************************** 授权信息 ****************************************************/
    //授权用户菜单
    Route::get('authmenu', 'auth.Auth/authMenuList');
    //授权用户菜单
    Route::get('get', 'auth.Auth/get');
    //授权用户菜单
    Route::put('modify/:field', 'auth.Auth/modify');
    //授权用户菜单
    Route::put('update', 'auth.Auth/update');
    //授权站点信息
    Route::get('site', 'auth.Auth/site');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);