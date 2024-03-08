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
Route::group('channel', function () {
    /***************************************************** H5信息 ****************************************************/
    Route::get('h5/config', 'channel.H5/get');
    //设置微信配置
    Route::put('h5/config', 'channel.H5/set');

    /***************************************************** pc信息 ****************************************************/
    Route::get('pc/config', 'channel.Pc/get');
    //设置微信配置
    Route::put('pc/config', 'channel.Pc/set');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
