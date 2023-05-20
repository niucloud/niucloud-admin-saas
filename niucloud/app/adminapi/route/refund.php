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
 * 退款相关路由
 */
Route::group('refund', function () {
    /***************************************************** 退款 *************************************************/
    //退款列表
    Route::get('refund', 'order.Refund/lists');
    //退款详情
    Route::get('refund/:refund_id', 'order.Refund/detail');
    //退款状态
    Route::get('status', 'order.Refund/status');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);