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
use think\facade\Route;


/**
 * 会员个人信息管理
 */
Route::group('member', function () {

    /***************************************************** 会员管理 ****************************************************/
    //会员个人详情
    Route::get('member', 'member.Member/info');
    //会员中心
    Route::get('center', 'member.Member/center');
    //会员信息修改
    Route::put('modify/:field', 'member.Member/modify');
    //会员信息编辑
    Route::put('update', 'member.Member/update');
    //绑定手机号
    Route::put('mobile', 'member.Member/mobile');

    /***************************************************** 会员账户 ****************************************************/
    //会员积分流水
    Route::get('account/point', 'member.Account/point');
    //会员余额流水
    Route::get('account/balance', 'member.Account/balance');
    /***************************************************** 会员提现 ****************************************************/Route::get('account/point', 'member.Account/point');
    //会员提现列表
    Route::get('withdraw', 'member.MemberWithdraw/lists');
    //会员提现详情
    Route::get('withdraw/:id', 'member.MemberWithdraw/info');
    //提现配置
    Route::get('withdraw/config', 'member.MemberWithdraw/config');
    //提现转账方式
    Route::get('withdraw/transfertype', 'member.MemberWithdraw/getTransferType');
    //提现申请
    Route::post('withdraw/apply', 'member.MemberWithdraw/apply');
    //撤销提现申请
    Route::put('withdraw/cancel/:id', 'member.MemberWithdraw/cancel');
})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, true)
    ->middleware(ApiLog::class);