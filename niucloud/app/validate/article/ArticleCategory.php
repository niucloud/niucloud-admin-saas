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
 * 文章分类(栏目)验证
 * Class Article
 * @package app\validate\article
 */
class ArticleCategory extends Validate
{

    //用户名或密码的规范可能是从数据库中获取的
    protected $rule = [
        'name' => 'require|max:20',
        'is_show' => 'number|between:0,1',
        'sort' => 'number|between:0,10000'
    ];

    protected $message = [
        'name.require' => 'validate_article.cate_name_require',
        'name.max' => 'validate_article.cate_name_max',
        'is_show.number' => 'validate_article.is_show_number',
        'is_show.between' => 'validate_article.is_show_between',
        'sort.number' => 'validate_article.sort_number',
        'sort.between' => 'validate_article.sort_between',
    ];

    protected $scene = [
        'add' => ['name', 'is_show', 'sort'],
        'edit' => ['name', 'is_show', 'sort'],
    ];
}