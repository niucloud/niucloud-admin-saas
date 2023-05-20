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
Route::group('notice', function () {

    /***************************************************** 消息管理 ****************************************************/
    //消息列表
    Route::get('notice', 'notice.Notice/lists');
    //消息详情
    Route::get('notice/:key', 'notice.Notice/info');
    //消息启动与关闭
    Route::post('notice/editstatus', 'notice.Notice/editStatus');
    //短信配置列表
    Route::get('notice/sms', 'notice.Notice/smsList');
    //短信配置详情
    Route::get('notice/sms/:sms_type', 'notice.Notice/smsConfig');
    //短信配置修改
    Route::put('notice/sms/:sms_type', 'notice.Notice/editSms');
    //消息发送记录
    Route::get('notice/log', 'notice.Notice/getLogList');
    //消息修改
    Route::post('notice/edit', 'notice.Notice/edit');

    //消息发送记录
    Route::get('log', 'notice.NoticeLog/lists');
    //消息发送记录详情
    Route::get('log/:id', 'notice.NoticeLog/info');

    //短信发送记录
    Route::get('sms/log', 'notice.SmsLog/lists');
    //短信发送记录详情
    Route::get('sms/log/:id', 'notice.SmsLog/info');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
