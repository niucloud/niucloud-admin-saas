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
    //会员删除
    Route::delete('member/:member_id', 'member.Member/del');
    //会员编码
    Route::get('memberno', 'member.Member/getMemberNo');
    //会员添加
    Route::put('member/:member_id', 'member.Member/edit');//会员添加

    Route::put('member/modify/:member_id/:field', 'member.Member/modify');
    //会员注册方式
    Route::get('registertype', 'member.Member/getMemberRegisterType');
    //会员注册渠道
    Route::get('register/channel', 'member.Member/getMemberRegisterChannelType');
    //会员列表(不分页)
    Route::get('member/list', 'member.Member/getMemberList');
    //获取会员状态枚举
    Route::get('status/list', 'member.Member/getStatusList');
    //会员设置状态
    Route::put('setstatus/:status', 'member.Member/setStatus');
    /***************************************************** 会员标签 ****************************************************/
    //会员标签列表
    Route::get('label', 'member.MemberLabel/lists');
    //会员标签详情
    Route::get('label/:id', 'member.MemberLabel/info');
    //会员标签添加
    Route::post('label', 'member.MemberLabel/add');
    //会员标签编辑
    Route::put('label/:id', 'member.MemberLabel/edit');
    //会员标签删除
    Route::delete('label/:id', 'member.MemberLabel/del');
    //会员标签
    Route::get('label/all', 'member.MemberLabel/getAll');
    /***************************************************** 会员账户 ****************************************************/
    //会员账户类型变动方式
    Route::get('account/type', 'member.Account/accountType');
    //会员积分流水
    Route::get('account/point', 'member.Account/point');
    //会员余额流水
    Route::get('account/balance', 'member.Account/balance');
    //会员可提现余额流水
    Route::get('account/money', 'member.Account/money');
    //会员佣金流水
    Route::get('account/commission', 'member.Account/commission');
    //会员佣金统计
    Route::get('account/sum_commission', 'member.Account/sumCommission');
    //会员积分统计
    Route::get('account/sum_point', 'member.Account/sumPoint');
    //会员积分调整
    Route::post('account/point', 'member.Account/adjustPoint');
    //会员余额调整
    Route::post('account/balance', 'member.Account/adjustBalance');
    //会员零钱调整
    Route::post('account/money', 'member.Account/adjustMoney');
    //会员账户类型变动方式
    Route::get('account/change_type/:account_type', 'member.Account/changeType');
    //会员账户类型变动方式
    Route::get('account/sum_balance', 'member.Account/sumBalance');
    /***************************************************** 会员相关设置**************************************************/
    //获取注册与登录设置
    Route::get('config/login', 'member.Config/getLoginConfig');
    //更新注册与登录设置
    Route::post('config/login', 'member.Config/setLoginConfig');
    //获取会员提现设置
    Route::get('config/cash_out', 'member.Config/getCashOutConfig');
    //更新提现设置
    Route::post('config/cash_out', 'member.Config/setCashOutConfig');
    /***************************************************** 会员体现**************************************************/
    //会员提现列表
    Route::get('cash_out', 'member.CashOut/lists');
    //会员提现详情
    Route::get('cash_out/:id', 'member.CashOut/info');
    //会员提现审核
    Route::put('cash_out/audit/:id/:action', 'member.CashOut/audit');
    //转账方式
    Route::get('cash_out/transfertype', 'member.CashOut/getTransferType');
    //转账方式
    Route::put('cash_out/transfer/:id', 'member.CashOut/transfer');
    //提现状态
    Route::get('cash_out/status', 'member.CashOut/getStatusList');
    //提现统计信息
    Route::get('cash_out/stat', 'member.CashOut/stat');
    //获取注册与登录设置
    Route::get('config/member', 'member.Config/getMemberConfig');
    //更新注册与登录设置
    Route::post('config/member', 'member.Config/setMemberConfig');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);