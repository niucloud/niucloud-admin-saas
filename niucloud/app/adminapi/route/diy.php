<?php
// +----------------------------------------------------------------------
// | Niushop商城系统 - 团队十年电商经验汇集巨献!
// +----------------------------------------------------------------------
// | Copyright (c) 2022~2025 https://www.niushop.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed Niushop并不是自由软件，未经许可不能去掉Niushop相关版权
// +----------------------------------------------------------------------
// | Author: Niushop Team <niucloud@outlook.com>
// +----------------------------------------------------------------------

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;
use think\facade\Route;


/**
 * 自定义页面控制器
 */
Route::group('diy', function() {

    /***************************************************** 自定义页面管理 ****************************************************/
    //自定义页面列表
    Route::get('diy', 'diy.Diy/lists');

    //自定义页面详情
    Route::get('diy/:id', 'diy.Diy/info');

    //添加自定义页面
    Route::post('diy', 'diy.Diy/add');

    //编辑自定义页面
    Route::put('diy/:id', 'diy.Diy/update');

    //删除自定义页面
    Route::delete('diy/:id', 'diy.Diy/del');

    // 页面初始化数据
    Route::get('init', 'diy.Diy/getPageInit');

    // 获取自定义链接列表
    Route::get('link', 'diy.Diy/getLink');

    // 设为使用
    Route::put('use', 'diy.Diy/setUse');

    // 获取页面类型
    Route::get('type', 'diy.Diy/getPageType');

    // 自定义路由列表
    Route::get('route', 'diy.DiyRoute/lists');

    // 编辑自定义路由分享内容
    Route::put('route/share', 'diy.DiyRoute/modifyShare');

    // 编辑自定义页面分享内容
    Route::put('diy/share', 'diy.Diy/modifyShare');


    /***************************************************** 配置相关 *****************************************************/

    //底部导航查询
    Route::get('bottom', 'diy.Config/getBottom');

    //底部导航配置
    Route::post('bottom', 'diy.Config/setBottom');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);