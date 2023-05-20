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

namespace app\service\api\article;

use app\model\article\ArticleCategory;
use core\base\BaseApiService;

/**
 * 文章分类（栏目）服务层
 * Class ArticleService
 * @package app\service\api\article
 */
class ArticleCategoryService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new ArticleCategory();
    }

    /**
     * 获取文章分类列表
     * @param array $where
     */
    public function getPage(array $where = [])
    {
        $field = 'category_id, site_id, name, sort, is_show, create_time, update_time';
        $order = 'create_time desc';
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(['name'], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取文章分类信息
     * @param int $id
     */
    public function getInfo(int $id)
    {
        $field = 'category_id, site_id, name, sort, is_show, create_time, update_time';

        $info = $this->model->field($field)->where([['category_id', '=', $id], ['site_id', '=', $this->site_id]])->findOrEmpty()->toArray();
        return $info;
    }
}