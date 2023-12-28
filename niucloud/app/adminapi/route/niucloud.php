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
Route::group('niucloud', function () {
    //设置 授权信息
    Route::post('authinfo', 'niucloud.Module/setAuthorize');
    //获取 授权设置
    Route::get('admin/authinfo', 'niucloud.Module/getAuthorize');

    //获取授权信息
    Route::get('authinfo', 'niucloud.Module/authorize');


    //获取应用插件列表
    Route::get('module', 'addon.Addon/getLocalAddonList');
    //获取应用详情
    Route::get('module', 'addon.Addon/getLocalAddonList');
    //获取插件插件列表
    Route::get('module/version', 'addon.Addon/lists');
    //下载
    Route::get('module/download/:version_id', 'addon.Addon/info');
    //更新
    Route::put('addon/status/:version_id', 'addon.Addon/setStatus');
    // 获取框架最新版本
    Route::get('framework/newversion', 'niucloud.Module/getFrameworkLastVersion');
    // 获取框架版本更新记录
    Route::get('framework/version/list', 'niucloud.Module/getFrameworkVersionList');

    // 云编译
    Route::post('build', 'niucloud.Cloud/build');
    // 获取编译任务
    Route::get('build', 'niucloud.Cloud/getBuildTask');
    // 获取云编译
    Route::get('build/log', 'niucloud.Cloud/getBuildLog');
    // 清除编译任务
    Route::post('build/clear', 'niucloud.Cloud/clearBuildTask');
    // 编译前环境检测
    Route::get('build/check', 'niucloud.Cloud/buildPreCheck');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
