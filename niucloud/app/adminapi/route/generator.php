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

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;
use think\facade\Route;


/**
 * 代码生成
 */
Route::group('generator', function () {

    /***************************************************** 代码生成操作 ****************************************************/

    //代码生成列表
    Route::get('generator', 'generator.generator/lists');
    //代码生成详情
    Route::get('generator/:id', 'generator.generator/info');
    //添加代码生成
    Route::post('generator', 'generator.generator/add');
    //编辑代码生成
    Route::put('generator/:id', 'generator.generator/edit');
    //删除代码生成
    Route::delete('generator/:id', 'generator.generator/del');
    //代码生成
    Route::post('download', 'generator.generator/create');
    //表列表
    Route::get('table', 'generator.generator/tableList');
    //代码生成预览
    Route::get('preview/:id', 'generator.generator/preview');
    //代码验证
    Route::get('check_file', 'generator.generator/checkFile');
    //关联信息
    Route::get('table_column', 'generator.generator/getTableColumn');
    //全部模型
    Route::get('all_model', 'generator.generator/getModels');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
