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
 * 消息模块 相关路由
 */
Route::group('message', function () {

    /***************************************************** 消息管理 ****************************************************/
    //消息列表
    Route::get('message', 'message.Message/lists');
    //消息详情
    Route::get('message/:key', 'message.Message/info');
    //消息启动与关闭
    Route::post('message/updatestatus', 'message.Message/updateStatus');
    //短信配置列表
    Route::get('message/sms', 'message.Message/smsList');
    //短信配置详情
    Route::get('message/sms/:sms_type', 'message.Message/smsConfig');
    //短信配置修改
    Route::put('message/sms/:sms_type', 'message.Message/updateSms');
    //消息发送记录
    Route::get('message/log', 'message.Message/getLogList');
    //消息修改
    Route::post('message/update', 'message.Message/update');

    //消息发送记录
    Route::get('log', 'message.MessageLog/lists');
    //消息发送记录详情
    Route::get('log/:id', 'message.MessageLog/info');

    //短信发送记录
    Route::get('sms/log', 'message.SmsLog/lists');
    //短信发送记录详情
    Route::get('sms/log/:id', 'message.SmsLog/info');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
