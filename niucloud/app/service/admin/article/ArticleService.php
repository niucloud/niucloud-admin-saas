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

namespace app\service\admin\article;

use app\model\article\Article;
use core\base\BaseAdminService;

/**
 * 文章服务层
 * Class ArticleService
 * @package app\service\admin\article
 */
class ArticleService extends BaseAdminService
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
        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ 'title', 'category_id', 'is_show'], $where)->with('articleCategory')->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取文章信息
     * @param int $id
     */
    public function getInfo(int $id)
    {
        $field = 'id, category_id, site_id, title, intro, summary, image, author, content, visit, visit_virtual, is_show, sort, create_time, update_time';

        $info = $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->with('articleCategory')->field($field)->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加文章
     * @param array $data
     */
    public function add(array $data)
    {
        $data[ 'site_id' ] = $this->site_id;
        $data[ 'create_time' ] = time();
        $res = $this->model->create($data);
        return $res->id;

    }

    /**
     * 文章编辑
     * @param int $id
     * @param array $data
     */
    public function edit(int $id, array $data)
    {
        $data[ 'update_time' ] = time();
        $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update($data);
        return true;
    }

    /**
     * 删除文章
     * @param int $id
     */
    public function del(int $id)
    {
        $res = $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->delete();
        return $res;
    }

}