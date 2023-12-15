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
Route::group('user', function () {
    /***************************************************** 用户 ****************************************************/
    //用户列表
    Route::get('user', 'user.user/lists');
    //全部用户列表
    Route::get('user_all', 'user.user/pages');
    //用户详情
    Route::get('user/:uid', 'user.user/info');
    // 查询账号是否存在
    Route::get('isexist', 'user.user/checkUserIsExist');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
