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

use app\model\article\Article;
use app\service\api\BaseApiService;

/**
 * 文章服务层
 * Class ArticleService
 * @package app\service\api\article
 */
class ArticleService extends BaseApiService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Article();
    }

    /**
     * 获取文章列表
     * @param array $where
     * @param string $order
     */
    public function getPage(array $where = [])
    {
        $where[] = [ 'site_id', '=', $this->site_id ];
        $field = 'id, category_id, site_id, title, intro, summary, image, author, content, visit, visit_virtual, is_show, sort, create_time, update_time';
        $order = 'create_time desc';
        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ 'title', 'category_id'], $where)->with('articleCategory')->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 文章列表
     * @param array $where
     * @return mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getAll(array $where = [], int $limit = 0){
        $where[] = [ 'site_id', '=', $this->site_id ];
        $field = 'id, category_id, site_id, title, intro, summary, image, author, content, visit, visit_virtual, is_show, sort, create_time, update_time';
        $order = 'create_time desc';
        $list = $this->model->where([ [ 'site_id', '=', $this->site_id ] , ['is_show', '=', 1]])->withSearch([ 'title', 'category_id', 'ids' ], $where)->limit($limit)->with('articleCategory')->field($field)->order($order)->select()->toArray();
        return $list;
    }

    /**
     * 获取文章信息
     * @param int $id
     */
    public function getInfo(int $id)
    {
        $field = 'id, category_id, site_id, title, intro, summary, image, author, content, visit, visit_virtual, is_show, sort, create_time, update_time';

        $info = $this->model->with('articleCategory')->field($field)->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->findOrEmpty()->toArray();
        return $info;
    }

}