<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

use think\facade\Route;

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;


// USER_CODE_BEGIN -- sys_dict
Route::group('dict', function () {

    //数据字典列表
    Route::get('dict', 'dict.Dict/lists');
    //数据字典详情
    Route::get('dict/:id', 'dict.Dict/info');
    //添加数据字典
    Route::post('dict', 'dict.Dict/add');
    //编辑数据字典
    Route::put('dict/:id', 'dict.Dict/edit');
    //删除数据字典
    Route::delete('dict/:id', 'dict.Dict/del');
    //编辑数据字典
    Route::put('dictionary/:id', 'dict.Dict/addDictData');
    //全部数据字典
    Route::get('all', 'dict.Dict/getAll');
    //数据字典关键词
    Route::get('dictionary/type/:type', 'dict.Dict/getKeyInfo');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- sys_dict
