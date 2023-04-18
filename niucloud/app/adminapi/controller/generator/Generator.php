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

namespace app\adminapi\controller\generator;

use app\BaseController;
use app\service\admin\generator\GenerateService;
use think\Response;

/**
 * 代码生成-控制器
 * Class Generate
 * @package app\adminapi\controller\generate
 */
class Generator extends BaseController
{
    /**
     * 代码生成器列表
     * @return Response
     */
    public function lists()
    {

        $data = $this->request->params([
            [ 'table_name', '' ],
            [ 'table_content', '' ],
        ]);
        return success(( new GenerateService() )->getPage($data));
    }

    /**
     * 代码生成详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success(( new GenerateService() )->getInfo($id));
    }

    /**
     * 添加代码生成
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            [ "table_name", "" ],
        ], false);
        $this->validate($data, 'app\validate\generator\Generator.add');
        $id = ( new GenerateService() )->add($data);
        return success(100011, [ 'id' => $id ]);
    }

    /**
     * 代码生成编辑
     * @param $id
     * @return Response
     */
    public function update($id)
    {
        $data = $this->request->params([
            [ "table_name", "" ],
            [ "table_content", "" ],
            [ "class_name", "" ],
            [ "module_name", "" ],
            [ "edit_type", "1" ],
            [ "table_column", "" ],
        ], false);
        $this->validate($data, 'app\validate\generator\Generator.update');
        ( new GenerateService() )->update($id, $data);
        return success(100004);
    }

    /**
     * 代码生成删除
     * @param int $id
     * @return Response
     */
    public function del(int $id)
    {
        ( new GenerateService() )->del($id);
        return success(100003);
    }

    /**
     * 生成代码
     * @return Response
     */
    public function create()
    {
        $data = $this->request->params([
            [ 'id', '' ],
        ]);

        $data = ( new GenerateService() )->generate($data);
        return success(100011, $data);
    }

    /**
     * 获取数据表列表
     * @return Response
     */
    public function tableList()
    {
        $data = $this->request->params([
            [ "name", "" ],
            [ "comment", "" ],
        ]);
        $list = ( new GenerateService() )->tableList($data);
        return success(100011, $list);
    }

}
