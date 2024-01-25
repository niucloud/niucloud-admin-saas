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
    Route::put('menu/:app_type/:menu_key', 'sys.Menu/edit');
    //菜单列表
    Route::get('menu/:app_type', 'sys.Menu/lists');
    //删除单个菜单
    Route::delete('menu/:app_type/:menu_key', 'sys.Menu/del');
    //菜单类型
    Route::get('menutype', 'sys.Menu/getMenuType');
    //授权用户菜单
    Route::get('authmenu', 'sys.Auth/authMenuList');
    // 获取菜单信息
    Route::get('menu/:app_type/info/:menu_key', 'sys.Menu/info');
    // 初始化菜单
    Route::post('menu/refresh', 'sys.Menu/refreshMenu');

    Route::get('menu/mothod', 'sys.Menu/getMethodType');

    Route::get('menu/system_menu', 'sys.Menu/getSystem');

    Route::get('menu/addon_menu/:app_key', 'sys.Menu/getAddonMenu');

    Route::get('menu/dir/:addon', 'sys.Menu/getMenuByTypeDir');
    /***************************************************** 设置 ****************************************************/
    //网站设置
    Route::get('config/website', 'sys.Config/getWebsite');
    //网站设置
    Route::put('config/website', 'sys.Config/setWebsite');
    //服务信息设置
    Route::get('config/service', 'sys.Config/getServiceInfo');
    //版权设置
    Route::get('config/copyright', 'sys.Config/getCopyright');
    //版权设置
    Route::put('config/copyright', 'sys.Config/setCopyright');

    //地图设置
    Route::put('config/map', 'sys.Config/setMap');
    //地图设置
    Route::get('config/map', 'sys.Config/getMap');

    //首页加载设置
    Route::put('config/site_index', 'sys.Config/setSiteIndex');
    //获取首页加载
    Route::get('config/site_index', 'sys.Config/getSiteIndexList');

    //平台首页加载设置
    Route::put('config/admin_index', 'sys.Config/setAdminIndex');
    //获取平台首页加载
    Route::get('config/admin_index', 'sys.Config/getAdminIndexList');

    // 获取手机端首页加载
    Route::get('config/wap_index', 'sys.Config/getWapIndexList');

    //快捷菜单设置
    Route::put('config/shortcut_menu', 'sys.Config/setShortcutMenu');
    //获取快捷菜单
    Route::get('config/shortcut_menu', 'sys.Config/getShortcutMenu');

    //登录注册设置
    Route::get('config/login', 'login.Config/getConfig');
    //登录注册设置
    Route::put('config/login', 'login.Config/setConfig');

    // 开发者key
    Route::put('config/developer_token', 'sys.Config/setDeveloperToken');
    // 开发者key
    Route::get('config/developer_token', 'sys.Config/getDeveloperToken');

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
    // 获取图标库列表
    Route::get('attachment/icon_category', 'sys.Attachment/getIconCategoryList');
    // 获取图标库列表
    Route::get('attachment/icon', 'sys.Attachment/getIconList');
    /***************************************************** 协议管理 ****************************************************/
    //消息列表
    Route::get('agreement', 'sys.Agreement/lists');
    //消息详情
    Route::get('agreement/:key', 'sys.Agreement/info');
    //短信配置修改
    Route::put('agreement/:key', 'sys.Agreement/edit');
    /***************************************************** 地区管理 ****************************************************/
    //通过pid获取列表
    Route::get('area/list_by_pid/:pid', 'sys.Area/listByPid');
    //通过层级获取列表
    Route::get('area/tree/:level', 'sys.Area/tree');
    //获取地址位置信息
    Route::get('area/get_info', 'sys.Area/addressInfo');
    Route::get('area/contrary', 'sys.Area/contraryAddress');
    // 获取省市县数据根据地址id
    Route::get('area/code/:code', 'sys.Area/areaByAreaCode');

    /***************************************************** 渠道管理 ****************************************************/
    Route::get('channel', 'sys.Channel/getChannelType');
    //场景域名
    Route::get('scene_domain', 'sys.Config/getSceneDomain');
    /***************************************************** 系统环境 ****************************************************/
    Route::get('system', 'sys.System/getSystemInfo');
    //校验消息队列
    Route::get('job', 'sys.System/checkJob');
    //校验计划任务
    Route::get('schedule', 'sys.System/checkSchedule');
    //环境变量
    Route::get('env', 'sys.System/getEnvInfo');

    /***************************************************** 计划任务 ****************************************************/
    //计划任务列表
    Route::get('schedule/list', 'sys.Schedule/lists');
    //任务详情
    Route::get('schedule/:id', 'sys.Schedule/info');
    //设置任务状态
    Route::put('schedule/modify/status/:id', 'sys.Schedule/modifyStatus');
    //任务新增
    Route::post('schedule', 'sys.Schedule/add');
    //编辑任务
    Route::put('schedule/:id', 'sys.Schedule/edit');
    //删除任务
    Route::delete('schedule/:id', 'sys.Schedule/del');
    //任务模式
    Route::get('schedule/type', 'sys.Schedule/getType');
    //任务模板
    Route::get('schedule/template', 'sys.Schedule/template');
    //任务时间间隔
    Route::get('schedule/datetype', 'sys.Schedule/getDateType');
    /***************************************************** 应用管理 ****************************************************/
    Route::get('applist', 'sys.App/getAppList');

    /***************************************************** 清理缓存-刷新菜单 ****************************************************/
    Route::post('schema/clear', 'sys.System/schemaCache');

    /***************************************************** 公共字典数据 ****************************************************/
    Route::get('date/month', 'sys.Common/getMonth');
    Route::get('date/week', 'sys.Common/getWeek');

    /***************************************************** 获取布局 ****************************************************/
    Route::get('layout', 'sys.System/layout');
    Route::put('layout', 'sys.System/setLayout');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

//系统环境（不效验登录状态）
Route::group('sys', function () {
    Route::get('web/website', 'sys.Config/getWebsite');
    // 获取版权信息
    Route::get('web/copyright', 'sys.Config/getCopyright');
});
