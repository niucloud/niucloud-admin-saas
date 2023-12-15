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
Route::group('applet', function () {

    /***************************************************** 小程序版本 ****************************************************/
    //列表
    Route::get('version', 'applet.Version/lists');
    //详情
    Route::get('version/:id', 'applet.Version/info');
    //创建版本
    Route::post('version', 'applet.Version/add');
    //编辑
    Route::put('version/:id', 'applet.Version/edit');
    //删除
    Route::delete('version/:id', 'applet.Version/del');
    //设置状态
    Route::put('version/status/:id/:status', 'applet.Version/setStatus');
    //上传
    Route::post('upload', 'applet.Version/upload');

    /***************************************************** 站点下载或升级版本记录 ****************************************************/
    //列表
    Route::get('site/version', 'applet.SiteVersion/lists');
    //详情
    Route::get('site/version/:id', 'applet.SiteVersion/info');
    //最后一个升级的版本
    Route::get('site/version/last', 'applet.SiteVersion/getLastVersion');
    //查看最新的版本
    Route::get('site/version/upgrade', 'applet.SiteVersion/getUpgradeVersion');

    //下载
    Route::get('version/download/:id', 'applet.VersionDownload/download');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);