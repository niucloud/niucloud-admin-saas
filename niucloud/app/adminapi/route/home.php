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
Route::group('home', function () {
    /***************************************************** 用户信息管理 ****************************************************/

    /***************************************************** 站点管理 ****************************************************/
    //站点列表
    Route::get('site', 'home.Site/lists');
    //站点信息
    Route::get('site/:id', 'home.Site/info');
    //更新站点信息
    Route::put('site/:id', 'home.Site/edit');

})->middleware(AdminCheckToken::class, true)
    ->middleware(AdminLog::class);