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
use core\base\BaseAdminService;

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
     * @return array
     */
    public function getPage(array $where = [])
    {

        $field = 'category_id, site_id, name, sort, is_show, create_time, update_time';
        $order = 'create_time desc';
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(['name'], $where)->field($field)->order($order)->append(["article_num"]);
        return $this->pageQuery($search_model);
    }

    /**
     * 查询所有分类（文章添加）
     */
    public function getAll()
    {

        $field = 'category_id, site_id, name, sort';
        $order = 'sort desc';
        return  $this->model->where([['site_id', '=', $this->site_id], ['is_show', '=', 1]])->field($field)->order($order)->select()->toArray();
    }

    /**
     * 获取文章分类信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'category_id, site_id, name, sort, is_show, create_time, update_time';

        return $this->model->field($field)->where([['category_id', '=', $id], ['site_id', '=', $this->site_id]])->append(["article_num"])->findOrEmpty()->toArray();
    }

    /**
     * 添加文章分类
     * @param array $data
     * @return mixed
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
     * @return true
     */
    public function edit(int $id, array $data)
    {
        $data['update_time'] = time();
        $this->model->where([['category_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除文章分类
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        return $this->model->where([['category_id', '=', $id], ['site_id', '=', $this->site_id]])->delete();
    }

}