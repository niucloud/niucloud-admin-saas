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
 * 文章管理
 */
Route::group('article', function () {

    /***************************************************** 文章管理 ****************************************************/
    //文章列表
    Route::get('article', 'article.Article/lists');
    //文章详情
    Route::get('article/:id', 'article.Article/info');
    //文章
    Route::get('article/all', 'article.Article/all');
    /***************************************************** 文章分类管理 ****************************************************/
    //文章分类列表
    Route::get('category', 'article.ArticleCategory/lists');
    //文章分类详情
    Route::get('category/:id', 'article.ArticleCategory/info');

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, false)
    ->middleware(ApiLog::class);