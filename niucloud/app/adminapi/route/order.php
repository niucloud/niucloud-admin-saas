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
 * 订单相关路由
 */
Route::group('order', function () {
    /***************************************************** 充值订单 *************************************************/
    //订单列表
    Route::get('recharge', 'order.Recharge/lists');
    //订单详情
    Route::get('recharge/:order_id', 'order.Recharge/detail');
    //订单状态
    Route::get('recharge/status', 'order.Recharge/status');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);