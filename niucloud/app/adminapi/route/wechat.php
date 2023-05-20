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
Route::group('wechat', function () {

    /***************************************************** 微信配置 ****************************************************/
    Route::get('config', 'wechat.Config/get');
    //设置微信配置
    Route::put('config', 'wechat.Config/set');
    //微信设置的静态信息
    Route::get('static', 'wechat.Config/static');
    /***************************************************** 微信菜单 ****************************************************/
    /**
     * 微信菜单
     */
    //获取微信菜单
    Route::get('menu', 'wechat.Menu/info');
    //设置微信菜单
    Route::put('menu', 'wechat.Menu/edit');
    /***************************************************** 关键词回复 ****************************************************/
    //关键词回复详情
    Route::get('reply/keywords/lists', 'wechat.Reply/keyword');
    //关键词回复列表
    Route::get('reply/keywords', 'wechat.Reply/getKeywordLists');
    //新增关键词回复
    Route::post('reply/keywords', 'wechat.Reply/addKeyword');
    //更新关键词回复
    Route::put('reply/keywords/:id', 'wechat.Reply/editKeyword');
    //删除关键词回复
    Route::delete('reply/keywords/:id', 'wechat.Reply/deleteKeyword');
    /***************************************************** 默认回复 ****************************************************/
    //默认回复
    Route::get('reply/default', 'wechat.Reply/default');
    //更新默认默认回复
    Route::put('reply/default', 'wechat.Reply/editDefault');
    /***************************************************** 关注回复 ****************************************************/
    //关注回复
    Route::get('reply/subscribe', 'wechat.Reply/subscribe');
    //更新关注回复
    Route::put('reply/subscribe', 'wechat.Reply/editSubscribe');
    /***************************************************** 图文素材回复 ****************************************************/
    //图文素材列表
    Route::get('media', 'wechat.Media/lists');
    //新增图文素材
    Route::post('media', 'wechat.Media/add');
    //更新图文素材
    Route::put('media/:id', 'wechat.Media/edit');
    /***************************************************** 消息模板 ****************************************************/
    //同步全部消息模板
    Route::put('template/sync', 'wechat.Template/sync');

    Route::get('template', 'wechat.Template/lists');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);