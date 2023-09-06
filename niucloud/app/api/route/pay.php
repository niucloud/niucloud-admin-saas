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

//支付异步回调
Route::any('pay/notify/:site_id/:channel/:type/:action', 'pay.Pay/notify')
    ->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class)
    ->middleware(ApiLog::class);
/**
 * 路由
 */
Route::group('pay',function () {
    //去支付
    Route::post('', 'pay.Pay/pay');
    //支付信息
    Route::get('info/:trade_type/:trade_id', 'pay.Pay/info');
    //
    Route::get('type/:trade_type', 'pay.Pay/getPayType');

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class)
    ->middleware(ApiLog::class);