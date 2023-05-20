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

use app\api\middleware\ApiChannel;
use app\api\middleware\ApiCheckToken;
use app\api\middleware\ApiLog;
use think\facade\Route;


/**
 * 会员个人信息管理
 */
Route::group('order', function () {

    /***************************************************** 充值订单相关 *************************************************/
    //充值订单创建
    Route::post('recharge', 'order.Recharge/create');
    // 充值订单列表
    Route::get('recharge', 'order.Recharge/lists');
    // 充值订单详情
    Route::get('recharge/:order_id', 'order.Recharge/detail');
})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, true)
    ->middleware(ApiLog::class);