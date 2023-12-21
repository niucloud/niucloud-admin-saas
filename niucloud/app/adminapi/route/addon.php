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

    //安装插件
    Route::post('addon/install/:addon', 'addon.Addon/install');
    //云安装插件
    Route::post('addon/cloudinstall/:addon', 'addon.Addon/cloudInstall');
    // 云编译进度
    Route::get('addon/cloudinstall/:addon', 'addon.Addon/cloudInstallLog');
    //插件安装检测安装环境
    Route::get('addon/install/check/:addon', 'addon.Addon/installCheck');
    // 获取安装任务
    Route::get('addon/installtask', 'addon.Addon/getInstallTask');
    //下载插件
    Route::post('addon/download/:addon', 'addon.Addon/download');
    //插件类型
    Route::get('addontype', 'addon.Addon/getType');

    //卸载插件环境检测
    Route::get('addon/uninstall/check/:addon', 'addon.Addon/uninstallCheck');
    //卸载插件
    Route::post('addon/uninstall/:addon', 'addon.Addon/uninstall');
    //卸载插件
    Route::post('addon/edit/:addon', 'addon.Addon/edit');
    //应用列表(...)
    Route::get('app/list', 'addon.App/getAppList');
    //已安装有效应用
    Route::get('app/getAddonList', 'addon.Addon/getAddonList');
    // 取消安装任务
    Route::put('addon/install/cancel/:addon', 'addon.Addon/cancleInstall');

    Route::post('addon/upgrade/[:addon]', 'addon.Addon/upgrade');

    /******************************************************************开发插件 *******************************************************/
    //开发插件列表
    Route::get('addon_develop', 'addon.AddonDevelop/lists');
    //查询插件
    Route::get('addon_develop/:key', 'addon.AddonDevelop/info');
    //新增插件
    Route::post('addon_develop/:key', 'addon.AddonDevelop/add');
    //编辑插件
    Route::put('addon_develop/:key', 'addon.AddonDevelop/edit');
    //删除插件
    Route::delete('addon_develop/:key', 'addon.AddonDevelop/del');
    //校验是否存在
    Route::get('addon_develop/check/:key', 'addon.AddonDevelop/checkKey');
    //打包插件
    Route::post('addon_develop/build/:key', 'addon.AddonDevelop/build');
    //下载插件
    Route::post('addon_develop/download/:key', 'addon.AddonDevelop/download');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

/**
 * 应用插件相关路由
 */
Route::group(function () {
    //获取已安装插件列表
    Route::get('addon/list/install', 'addon.Addon/getInstallList');
});
