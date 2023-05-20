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

use think\facade\Route;

/**
 * 路由
 */
Route::group(function () {
    //用户登录
    Route::get('login/:app_type', 'login.Login/login');

    //登录注册设置
    Route::get('login/config', 'login.Config/getConfig');

    //生成验证码
    Route::get('captcha/create', 'login.Captcha/create');
    //一次校验验证码
    Route::get('captcha/check', 'login.Captcha/check');

    Route::get('terminal', 'sys.Terminal/exec');
});

//加载插件路由
(new \core\addon\AddonLoader("Route"))->load(['app_type' => 'adminapi']);