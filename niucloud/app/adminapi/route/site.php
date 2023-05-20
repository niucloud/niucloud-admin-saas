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
 * 站点相关（平台0）
 */
Route::group('site', function () {

    /***************************************************** 站点管理 ****************************************************/
    //站点列表
    Route::get('site', 'site.Site/lists');
    //站点信息
    Route::get('site/:id', 'site.Site/info');
    //添加站点
    Route::post('site', 'site.Site/add');
    //更新站点
    Route::put('site/:id', 'site.Site/edit');
    //站点状态
    Route::get('statuslist', 'site.Site/getStatuList');
    /***************************************************** 站点分组 *************************************************/
    //站点分组
    Route::get('group', 'site.SiteGroup/lists');
    //站点分组详情
    Route::get('group/:group_id', 'site.SiteGroup/info');
    //站点分组新增
    Route::post('group', 'site.SiteGroup/add');
    //站点分组编辑
    Route::put('group/:group_id', 'site.SiteGroup/edit');
    //站点分组删除
    Route::delete('group/:group_id', 'site.SiteGroup/del');
    //获取所有分组
    Route::get('group/all', 'site.SiteGroup/all');
    /***************************************************** 当前站点用户 *************************************************/
    //站点用户列表
    Route::get('user', 'site.User/lists');
    //站点用户详情
    Route::get('user/:uid', 'site.User/info');
    //站点用户新增
    Route::post('user', 'site.User/add');
    //站点用户锁定
    Route::put('user/lock/:uid', 'site.User/lock');
    //站点用户解锁
    Route::put('user/unlock/:uid', 'site.User/unlock');
    //站点编辑用户
    Route::put('user/:uid', 'site.User/edit');
    //站点修改用户属性
    Route::put('user/:uid/:field', 'site.User/modify');
    /***************************************************** 操作日志 **************************************************/
    //操作日志列表
    Route::get('log', 'site.UserLog/lists');
    //操作日志详情
    Route::get('log/:id', 'site.UserLog/info');
    /***************************************************** 站点菜单 **************************************************/
    Route::get('site/menu', 'site.Site/menu');


})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);