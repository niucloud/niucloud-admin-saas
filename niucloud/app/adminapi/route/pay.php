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
 * 支付相关路由
 */
Route::group('pay', function () {
    /***************************************************** 系统整体信息 *************************************************/
    //设置支付配置
    Route::put('config/:type', 'pay.Config/set');
    //获取支付配置
    Route::get('config/:type', 'pay.Config/get');
    //获取支付方式列表
    Route::get('lists', 'pay.Config/lists');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);