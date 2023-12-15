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
Route::group('weapp', function () {

    /***************************************************** 微信配置 ****************************************************/
    Route::get('config', 'weapp.Config/get');
    //设置微信配置
    Route::put('config', 'weapp.Config/set');

    /***************************************************** 订阅消息 ****************************************************/
    //同步订阅消息
    Route::put('template/sync', 'weapp.Template/sync');
    Route::get('template', 'weapp.Template/lists');

    /***************************************************** 小程序版本管理 ****************************************************/
    //添加版本
    Route::post('version', 'weapp.Version/add');
    //版本列表
    Route::get('version', 'weapp.Version/lists');
    //获取预览码
    Route::get('preview', 'weapp.Version/preview');
    //获取小程序上传日志
    Route::get('upload/:key', 'weapp.Version/uploadLog');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
