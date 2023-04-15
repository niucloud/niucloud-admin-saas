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

namespace app\validate\article;


use think\Validate;

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2023-01-07
 * Time: 18:08
 */
class Article extends Validate
{

    //用户名或密码的规范可能是从数据库中获取的
    protected $rule = [
        'title' => 'require|max:20',
        'intro' => 'max:50',
        'summary' => 'max:50',
        'image' => 'max:100',
        'author' => 'max:20',
        'is_show' => 'number|between:0,1',
        'sort' => 'number|between:0,10000',
        'category_id' => 'number|require',
        'content' => 'require',
    ];

    protected $message = [
        'title.require' => 'validate_article.title_require',
        'title.max' => 'validate_article.title_max',
        'intro.max' => 'validate_article.intro_max',
        'summary.max' => 'validate_article.summary_max',
        'image.max' => 'validate_article.image_max',
        'author.max' => 'validate_article.author_max',
        'is_show.number' => 'validate_article.is_show_number',
        'is_show.between' => 'validate_article.is_show_between',
        'sort.number' => 'validate_article.sort_number',
        'sort.between' => 'validate_article.sort_between',
        'category_id.require' => 'validate_article.category_id_require',
        'category_id.number' => 'validate_article.category_id_number',
        'content.require' => 'validate_article.content_require',
    ];

    protected $scene = [
        'add' => ['title','intro', 'summary', 'image', 'author', 'is_show', 'sort', 'content', 'category_id'],
        'update' => ['title','intro', 'summary', 'image', 'author', 'is_show', 'sort', 'content', 'category_id'],
    ];
}