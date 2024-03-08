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

use app\api\middleware\ApiChannel;
use app\api\middleware\ApiCheckToken;
use app\api\middleware\ApiLog;
use app\api\route\dispatch\BindDispatch;
use core\dict\DictLoader;
use think\facade\Route;
use app\service\core\niucloud\CoreNotifyService;

//公众号消息推送
Route::any('wechat/serve/:site_id', 'wechat.Serve/serve')
    ->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class)
    ->middleware(ApiLog::class);

Route::group(function() {
    Route::post('niucloud/notify', function(){
        return (new CoreNotifyService())->notify();
    });

});

/**
 * 路由
 */
Route::group(function() {
    //获取授权地址
    Route::get('wechat/codeurl', 'wechat.Wechat/getCodeUrl');

    //公众号通过code登录
    Route::post('wechat/login', 'wechat.Wechat/login');
    //公众号通过code注册
    Route::post('wechat/register', 'wechat.Wechat/register');
    //公众号通过code同步授权
    Route::post('wechat/sync', 'wechat.Wechat/sync');
    //公众号扫码登录
    Route::post('wechat/scanlogin', 'wechat.Wechat/scanLogin');
    //小程序通过code登录
    Route::post('weapp/login', 'weapp.Weapp/login');
    //小程序通过code注册
    Route::post('weapp/register', 'weapp.Weapp/register');
    // 获取小程序订阅消息模板id
    Route::get('weapp/subscribemsg', 'weapp.Weapp/subscribeMessage');
    //登录
    Route::get('login', 'login.Login/login');
    //第三方绑定
    Route::post('bind', BindDispatch::class);
    //密码重置
    Route::post('password/reset', 'login.Login/resetPassword');
    //账号密码注册
    Route::post('register', 'login.Register/account');
    //手机号注册
    Route::post('register/mobile', 'login.Register/mobile');
    //账号密码注册
    Route::get('captcha', 'login.Login/captcha');
    //手机号发送验证码
    Route::post('send/mobile/:type', 'login.Login/sendMobileCode');
    //手机号登录
    Route::post('login/mobile', 'login.Login/mobile');

    //校验扫码信息
    Route::get('checkscan', 'sys.scan/checkScan');
    /***************************************************** 会员相关设置**************************************************/
    //获取注册与登录设置
    Route::get('login/config', 'login.Config/getLoginConfig');
    // 协议
    Route::get('agreement/:key', 'agreement.Agreement/info');
    // 获取公众号jssdk config
    Route::get('wechat/jssdkconfig', 'wechat.Wechat/jssdkConfig');
    /***************************************************** 版权相关设置**************************************************/
    Route::get('copyright', 'sys.Config/getCopyright');
    // 站点信息
    Route::get('site', 'sys.Config/site');
    //场景域名
    Route::get('scene_domain', 'sys.Config/getSceneDomain');
    // 获取手机端首页列表
    Route::get('wap_index', 'sys.Config/getWapIndexList');

    /***************************************************** 地区管理 ****************************************************/
    //通过pid获取列表
    Route::get('area/list_by_pid/:pid', 'sys.Area/listByPid');
    //通过层级获取列表
    Route::get('area/tree/:level', 'sys.Area/tree');
    // 获取省市县数据根据地址id
    Route::get('area/code/:code', 'sys.Area/areaByAreaCode');

    /***************************************************** 海报管理 ****************************************************/
    //获取海报
    Route::get('poster', 'poster.Poster/poster');
})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class)
    ->middleware(ApiLog::class);
//加载插件路由
( new DictLoader("Route") )->load([ 'app_type' => 'api' ]);
