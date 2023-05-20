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

namespace app\api\controller\article;

use app\service\api\article\ArticleCategoryService;
use core\base\BaseApiController;
use think\Response;

/**
 * 文章分类
 * Class ArticleCategory
 * @package app\api\controller\article
 */
class ArticleCategory extends BaseApiController
{
    /**
     * 文章分类列表
     * @return Response
     */
    public function lists(){
        $data = $this->request->params([
            ['name', ''],
        ]);
        return success((new ArticleCategoryService())->getPage($data));
    }

    /**
     * 文章分类详情
     * @param int $id
     */
    public function info(int $id){
        return success((new ArticleCategoryService())->getInfo($id));
    }



}
