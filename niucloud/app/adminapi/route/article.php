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
 * 文章管理
 */
Route::group('article', function () {

    /***************************************************** 文章管理 ****************************************************/
    //文章列表
    Route::get('article', 'article.Article/lists');
    //文章详情
    Route::get('article/:id', 'article.Article/info');
    //添加文章
    Route::post('article', 'article.Article/add');
    //编辑文章
    Route::put('article/:id', 'article.Article/update');
    //删除文章
    Route::delete('article/:id', 'article.Article/del');
    /***************************************************** 文章分类管理 ****************************************************/
    //文章分类列表
    Route::get('category', 'article.ArticleCategory/lists');
    //所有文章分类
    Route::get('category/all', 'article.ArticleCategory/all');
    //文章分类详情
    Route::get('category/:id', 'article.ArticleCategory/info');
    //添加文章分类
    Route::post('category', 'article.ArticleCategory/add');
    //编辑文章分类
    Route::put('category/:id', 'article.ArticleCategory/update');
    //删除文章分类
    Route::delete('category/:category_id', 'article.ArticleCategory/del');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);