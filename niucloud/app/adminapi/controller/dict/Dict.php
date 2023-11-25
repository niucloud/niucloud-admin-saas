<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\adminapi\controller\dict;

use core\base\BaseAdminController;
use app\service\admin\dict\DictService;


/**
 * 数据字典控制器
 * Class Dict
 * @package app\adminapi\controller\dict
 */
class Dict extends BaseAdminController
{
   /**
    * 获取数据字典列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["name",""],
             ["key",""]
        ]);
        return success((new DictService())->getPage($data));
    }

    /**
     * 数据字典详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new DictService())->getInfo($id));
    }

    /**
     * 添加数据字典
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
            ["name",""],
            ["key",""],
            ["memo",""],
            ["dictionary", ""]
        ]);
//        $this->validate($data, 'app\validate\dict\Dict.add');
        $id = (new DictService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 数据字典编辑
     * @param $id  数据字典id
     * @return \think\Response
     */
    public function edit($id){
        $data = $this->request->params([
            ["name",""],
            ["key",""],
            ["memo",""],
        ]);
//        $this->validate($data, 'app\validate\dict\Dict.edit');
        (new DictService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 数据字典删除
     * @param $id  数据字典id
     * @return \think\Response
     */
    public function del(int $id){
        (new DictService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 添加数据字典内容
     */
    public function addDictData($id)
    {
        $data = $this->request->params([
            ["dictionary",'[]'],
        ]);
//        $this->validate($data, 'app\validate\dict\Dict.add');
        $data['dictionary'] = json_encode($data['dictionary'], true);
        (new DictService())->edit($id,$data);
        return success('ADD_SUCCESS');
    }

    /**
     * 获取全部数据字典
     * @return \think\Response
     */
    public function getAll(){
        return success((new DictService())->getAll());
    }

    /**
     * 数据字典详情
     * @param key 数据字典关键字
     * @return \think\Response
     */
    public function getKeyInfo(string $type){
        $res = (new DictService())->getKeyInfo($type);
        return success($res);
    }
}
