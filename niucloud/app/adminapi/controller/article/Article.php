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

namespace app\adminapi\controller\article;

use app\service\admin\article\ArticleService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 文章控制器
 * Class Article
 * @package app\adminapi\controller\article
 */
class Article extends BaseAdminController
{
    /**
     * 文章列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['title', ''],
            ['category_id', ''],
            ['sort', ''],
            ['is_show', ''],
        ]);
        return success((new ArticleService())->getPage($data));
    }

    /**
     * 文章详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new ArticleService())->getInfo($id));
    }

    /**
     * 添加文章
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            ['title', ''],
            ['category_id', ''],
            ['intro', ''],
            ['summary', ''],
            ['image', ''],
            ['author', ''],
            ['content', '', false],
            ['visit_virtual', 0],
            ['is_show', 1],
            ['sort', 0],
        ]);
        $this->validate($data, 'app\validate\article\Article.add');
        $id = (new ArticleService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 文章编辑
     * @param int $id
     * @return Response
     */
    public function edit(int $id)
    {
        $data = $this->request->params([
            ['title', ''],
            ['category_id', ''],
            ['intro', ''],
            ['summary', ''],
            ['image', ''],
            ['author', ''],
            ['content', '', false],
            ['visit_virtual', 0],
            ['is_show', 1],
            ['sort', 0],
        ]);
        $this->validate($data, 'app\validate\article\Article.edit');
        (new ArticleService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 文章删除
     * @param int $id
     * @return Response
     */
    public function del(int $id)
    {

        (new ArticleService())->del($id);
        return success('DELETE_SUCCESS');
    }


}
