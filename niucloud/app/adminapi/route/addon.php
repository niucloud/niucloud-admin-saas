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
 * 应用插件相关路由
 */
Route::group(function () {
    //获取本地插件
    Route::get('addon/local', 'addon.Addon/getLocalAddonList');
    //获取插件列表
    Route::get('addon', 'addon.Addon/lists');
    //获取插件详情
    Route::get('addon/:id', 'addon.Addon/info');

    Route::put('addon/status/:id/:status', 'addon.Addon/setStatus');
    //安装插件
    Route::post('addon/install/:addon', 'addon.Addon/install');
    //插件安装检测安装环境
    Route::get('addon/install/check/:addon', 'addon.Addon/installCheck');
    // 执行安装
    Route::post('addon/install/execute/:addon', 'addon.Addon/execute');
    //插件安装状态
    Route::get('addon/install/:addon/status/:key', 'addon.Addon/getInstallState');

    //卸载插件
    Route::post('addon/uninstall/:addon', 'addon.Addon/uninstall');
    //卸载插件
    Route::post('addon/edit/:addon', 'addon.Addon/edit');
    //应用列表(...)
    Route::get('app/list', 'addon.App/getAppList');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
