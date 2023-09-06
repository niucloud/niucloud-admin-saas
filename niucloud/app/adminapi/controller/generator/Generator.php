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

use app\service\admin\generator\GenerateService;
use core\base\BaseController;
use Exception;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
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
            ['table_name', ''],
            ['table_content', ''],
        ]);
        return success((new GenerateService())->getPage($data));
    }

    /**
     * 代码生成详情
     * @param int $id
     * @return Response
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function info(int $id)
    {
        return success((new GenerateService())->getInfo($id));
    }

    /**
     * 添加代码生成
     * @return Response
     * @throws Exception
     */
    public function add()
    {
        $data = $this->request->params([
            ["table_name", ""],
        ], false);
        $this->validate($data, 'app\validate\generator\Generator.add');
        $id = (new GenerateService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 代码生成编辑
     * @param $id
     * @return Response
     */
    public function edit($id)
    {
        $data = $this->request->params([
            ["table_name", ""],
            ["table_content", ""],
            ["class_name", ""],
            ["module_name", ""],
            ["edit_type", "1"],
            ["table_column", ""],
        ], false);
        $this->validate($data, 'app\validate\generator\Generator.edit');
        (new GenerateService())->edit($id, $data);
        return success('MODIFY_SUCCESS');
    }

    /**
     * 代码生成删除
     * @param int $id
     * @return Response
     */
    public function del(int $id)
    {
        (new GenerateService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 生成代码
     * @return Response
     */
    public function create()
    {
        $data = $this->request->params([
            ['id', ''],
        ]);

        $data = (new GenerateService())->generate($data);
        return success('ADD_SUCCESS', $data);
    }

    /**
     * 获取数据表列表
     * @return Response
     */
    public function tableList()
    {
        $data = $this->request->params([
            ["name", ""],
            ["comment", ""],
        ]);
        $list = (new GenerateService())->tableList($data);
        return success('ADD_SUCCESS', $list);
    }

}
