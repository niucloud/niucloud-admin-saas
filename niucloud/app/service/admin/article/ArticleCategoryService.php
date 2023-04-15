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

use app\model\article\ArticleCategory;
use app\service\admin\BaseAdminService;

/**
 * 文章分类（栏目）服务层
 * Class ArticleService
 * @package app\service\admin\article
 */
class ArticleCategoryService extends BaseAdminService
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
     * 查询所有分类（文章添加）
     */
    public function getAll()
    {

        $field = 'category_id, site_id, name, sort';
        $order = 'sort desc';
        $list = $this->model->where([['site_id', '=', $this->site_id], ['is_show', '=', 1]])->field($field)->order($order)->select()->toArray();
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

    /**
     * 添加文章分类
     * @param array $data
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $res = $this->model->create($data);
        return $res->category_id;

    }

    /**
     * 文章分类编辑
     * @param int $id
     * @param array $data
     */
    public function update(int $id, array $data)
    {
        $data['update_time'] = time();
        $this->model->where([['category_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除文章分类
     * @param int $id
     */
    public function del(int $id)
    {
        $res = $this->model->where([['category_id', '=', $id], ['site_id', '=', $this->site_id]])->delete();
        return $res;
    }

}