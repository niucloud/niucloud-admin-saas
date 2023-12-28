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
Route::group('', function () {
    // 获取正在进行的升级任务
    Route::get('upgrade/task', 'addon.Upgrade/getUpgradeTask');
    // 执行升级
    Route::post('upgrade/execute', 'addon.Upgrade/execute');
    // 清除升级任务
    Route::post('upgrade/clear', 'addon.Upgrade/clearUpgradeTask');
    // 升级环境检测
    Route::get('upgrade/check/[:addon]', 'addon.Upgrade/upgradePreCheck');
    // 升级
    Route::post('upgrade/[:addon]', 'addon.Upgrade/upgrade');
    // 获取升级内容
    Route::get('upgrade/[:addon]', 'addon.Upgrade/getUpgradeContent');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
