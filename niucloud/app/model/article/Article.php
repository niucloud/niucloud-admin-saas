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

namespace app\model\article;

use core\base\BaseModel;
use think\db\Query;
use think\model\relation\HasOne;

/**
 * 文章模型
 * Class Article
 * @package app\model\article
 */
class Article extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'article';

    /**
     * @return HasOne
     */
    public function articleCategory()
    {
        return $this->hasOne(ArticleCategory::class, 'category_id', 'category_id')->joinType('left')->withField('category_id, name')->bind(['category_name' => 'name']);
    }
    /**
     * 文章分类搜索器
     * @param $value
     * @param $data
     */
    public function searchCategoryIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('category_id', $value);
        }
    }

    /**
     * 文章标题搜索器
     * @param $value
     * @param $data
     */
    public function searchTitleAttr($query, $value, $data)
    {
        if($value) {
            $query->where('title', 'like', '%' . $value . '%');
        }
    }

    /**
     * 文章标题搜索器
     * @param $value
     * @param $data
     */
    public function searchIsShowAttr($query, $value, $data)
    {
        if($value != '') {
            $query->where('is_show', $value);
        }
    }

    public function searchIdsAttr(Query $query, $value, $data)
    {
        if(!empty($value)) {
            $query->whereIn('id', $data['ids']);
        }
    }


    /**
     * 文章标题搜索器
     * @param $value
     * @param $data
     */
    public function searchSortAttr($query, $value, $data)
    {
        if($value) {
            $query->where('sort', $value);
        }
    }

    public function getArticleUrlAttr($value, $data) {
        $site_tag = $data['site_id'] == 1 ? '' : '/s' . $data['site_id'];
        $data = [
            'wap_url' => ( !empty(env("system.wap_domain")) ? env("system.wap_domain") : request()->domain() ) . "/wap" . $site_tag . "/pages/article/detail?id={$data['id']}",
            'web_url' => ( !empty(env("system.web_domain")) ? env("system.web_domain") : request()->domain() ) . "/web" . $site_tag . "/article/detail?id={$data['id']}"
        ];
        return $data;
    }

}
