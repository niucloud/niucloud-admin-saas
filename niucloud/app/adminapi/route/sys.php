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
Route::group('sys', function () {
    /***************************************************** 系统整体信息 *************************************************/
    //系统信息
    Route::get('info', 'sys.System/info');
    Route::get('url', 'sys.System/url');
    /***************************************************** 用户组 ****************************************************/
    //用户组列表
    Route::get('role', 'sys.Role/lists');
    //用户组列表
    Route::get('role/all', 'sys.Role/all');
    //用户组详情
    Route::get('role/:role_id', 'sys.Role/info');
    //用户组新增
    Route::post('role', 'sys.Role/add');
    //编辑用户组
    Route::put('role/:role_id', 'sys.Role/edit');
    //删除用户组
    Route::delete('role/:role_id', 'sys.Role/del');
    /***************************************************** 菜单 ****************************************************/
    //菜单新增
    Route::post('menu', 'sys.Menu/add');
    //菜单更新
    Route::put('menu/:menu_key', 'sys.Menu/edit');
    //菜单列表
    Route::get('menu/:app_type', 'sys.Menu/lists');
    //删除单个菜单
    Route::delete('menu/:menu_key', 'sys.Menu/del');
    //菜单类型
    Route::get('menutype', 'sys.Menu/getMenuType');
    //授权用户菜单
    Route::get('authmenu', 'sys.Auth/authMenuList');
    // 获取菜单信息
    Route::get('menu/info/:menu_key', 'sys.Menu/info');
    // 初始化菜单
    Route::get('menu/refresh', 'sys.Menu/refreshMenu');

    Route::get('menu/mothod', 'sys.Menu/getMethodType');
    /***************************************************** 设置 ****************************************************/
    //网站设置
    Route::get('config/website', 'sys.Config/getWebsite');
    //网站设置
    Route::put('config/website', 'sys.Config/setWebsite');
    //版权设置
    Route::get('config/copyright', 'sys.Config/getCopyright');
    //版权设置
    Route::put('config/copyright', 'sys.Config/setCopyright');

    //登录注册设置
    Route::get('config/login', 'login.Config/getConfig');
    //登录注册设置
    Route::put('config/login', 'login.Config/setConfig');
    /***************************************************** 图片上传 ****************************************************/
    //附件图片上传
    Route::post('image', 'upload.Upload/image');
    //附件视频上传
    Route::post('video', 'upload.Upload/video');
    //附件上传
    Route::post('document/:type', 'upload.Upload/document');
    //附件列表
    Route::get('attachment', 'sys.Attachment/lists');
    //附件列表
    Route::delete('attachment/:att_id', 'sys.Attachment/del');

    //附件删除
    Route::delete('attachment/del', 'sys.Attachment/batchDel');
    //移动图片分组
//    Route::put('attachment/move/:att_id', 'sys.Attachment/moveCategory');
    //批量移动图片分组
    Route::put('attachment/batchmove', 'sys.Attachment/batchMoveCategory');
    //附件组新增
    Route::post('attachment/category', 'sys.Attachment/addCategory');
    //附件组更新
    Route::put('attachment/category/:id', 'sys.Attachment/editCategory');
    //附件组列表
    Route::get('attachment/category', 'sys.Attachment/categoryLists');
    //删除单个附件组
    Route::delete('attachment/category/:id', 'sys.Attachment/deleteCategory');
    //获取存储列表
    Route::get('storage', 'upload.Storage/storageList');
    //存储详情
    Route::get('storage/:storage_type', 'upload.Storage/storageConfig');
    //存储修改
    Route::put('storage/:storage_type', 'upload.Storage/editStorage');
    //上传设置
    Route::put('upload/config', 'upload.Upload/setUploadConfig');
    //获取上传设置
    Route::get('upload/config', 'upload.Upload/getUploadConfig');
    /***************************************************** 协议管理 ****************************************************/
    //消息列表
    Route::get('agreement', 'sys.Agreement/lists');
    //消息详情
    Route::get('agreement/:key', 'sys.Agreement/info');
    //短信配置修改
    Route::put('agreement/:key', 'sys.Agreement/edit');
    // 刷新菜单
    Route::put('menu/refresh', 'sys.Menu/refreshMenu');
    /***************************************************** 地区管理 ****************************************************/
    //通过pid获取列表
    Route::get('area/list_by_pid/:pid', 'sys.Area/listByPid');
    //通过层级获取列表
    Route::get('area/tree/:level', 'sys.Area/tree');

    /***************************************************** 任务管理 ****************************************************/
    //任务列表
    Route::get('cron', 'sys.Cron/lists');
    //任务详情
    Route::get('cron/:id', 'sys.Cron/info');
    //任务模式
    Route::get('cron/type', 'sys.Cron/getType');
    /***************************************************** 渠道管理 ****************************************************/
    Route::get('channel', 'sys.Channel/getChannelType');
    //场景域名
    Route::get('scene_domain', 'sys.Config/getSceneDomain');
    /***************************************************** 系统环境 ****************************************************/
    Route::get('system', 'sys.System/getSystemInfo');
    /***************************************************** 应用管理 ****************************************************/
    Route::get('applist', 'sys.App/getAppList');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);