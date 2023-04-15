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
Route::group('member', function () {
    /***************************************************** 会员管理 ****************************************************/
    //会员列表
    Route::get('member', 'member.Member/lists');
    //会员详情
    Route::get('member/:id', 'member.Member/info');
    //会员添加
    Route::post('member', 'member.Member/add');
    //会员添加
    Route::put('member/:member_id', 'member.Member/update');//会员添加
    Route::put('member/modify/:member_id/:field', 'member.Member/modify');
    //会员使用场景
    Route::get('registertype', 'member.Member/getMemberRegisterType');
    //会员列表(不分页)
    Route::get('member/list', 'member.Member/getMemberList');
    /***************************************************** 会员标签 ****************************************************/
    //会员标签列表
    Route::get('label', 'member.MemberLabel/lists');
    //会员标签详情
    Route::get('label/:id', 'member.MemberLabel/info');
    //会员标签添加
    Route::post('label', 'member.MemberLabel/add');
    //会员标签编辑
    Route::put('label/:id', 'member.MemberLabel/update');
    //会员标签删除
    Route::delete('label/:id', 'member.MemberLabel/del');
    //会员标签
    Route::get('label/all', 'member.MemberLabel/getAll');
    /***************************************************** 会员账户 ****************************************************/
    //会员积分流水
    Route::get('account/point', 'member.Account/point');
    //会员余额流水
    Route::get('account/balance', 'member.Account/balance');
    //会员零钱流水
    Route::get('account/money', 'member.Account/money');
    //会员积分调整
    Route::post('account/point', 'member.Account/adjustPoint');
    //会员余额调整
    Route::post('account/balance', 'member.Account/adjustBalance');
    //会员账户类型变动方式
    Route::get('account/change_type/:account_type', 'member.Account/changeType');
    /***************************************************** 会员相关设置**************************************************/
    //获取注册与登录设置
    Route::get('config/login', 'member.Config/getLoginConfig');
    //更新注册与登录设置
    Route::post('config/login', 'member.Config/setLoginConfig');
    //获取会员提现设置
    Route::get('config/withdraw', 'member.Config/getWithdrawConfig');
    //更新提现设置
    Route::post('config/withdraw', 'member.Config/setWithdrawConfig');
    /***************************************************** 会员体现**************************************************/
    //会员提现列表
    Route::get('withdraw', 'member.Withdraw/lists');
    //会员提现详情
    Route::get('withdraw/:id', 'member.Withdraw/info');
    //会员提现审核
    Route::put('withdraw/audit/:id/:action', 'member.Withdraw/audit');
    //转账方式
    Route::get('withdraw/transfertype', 'member.Withdraw/getTransferType');
    //转账方式
    Route::put('withdraw/transfer/:id', 'member.Withdraw/transfer');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);