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

namespace app\adminapi\controller\addon;

use app\service\admin\addon\AddonDevelopService;
use app\service\admin\niucloud\AppService;
use core\base\BaseAdminController;
use think\Response;

class AddonDevelop extends BaseAdminController
{

    /**
     * 开发插件列表
     */
    public function lists()
    {
        $data = $this->request->params([
            ['search', '']
        ]);
        return success((new AddonDevelopService())->getList($data['search']));
    }


    public function info($key)
    {
        return success((new AddonDevelopService())->getInfo($key));
    }
    /**
     * 开发插件新增
     * @return Response
     */
    public function add(string $key)
    {
        $data = $this->request->params([
            ['title', ''],
            ['desc', ''],
            ['icon', ''],
            ['cover', ''],
            ['key', ''],
            ['author', ''],
            ['version', ''],
            ['type', ''],
            ['support_app', ''],
        ], false);
        $data['key'] = $key;
        $this->validate($data, 'app\validate\addon\AddonDevelop.add');
        (new AddonDevelopService())->add($key, $data);
        return success('ADD_SUCCESS');
    }

    /**
     * 开发插件更新
     * @param string $id
     * @return Response
     */
    public function edit(string $key)
    {
        $data = $this->request->params([
            ['title', ''],
            ['desc', ''],
            ['icon', ''],
            ['cover', ''],
            ['key', ''],
            ['author', ''],
            ['version', ''],
            ['type', ''],
            ['support_app', ''],
        ], false);
        $data['key'] = $key;
        $this->validate($data, 'app\validate\addon\AddonDevelop.edit');
        (new AddonDevelopService())->edit($key, $data);
        return success('EDIT_SUCCESS');
    }


    /**
     * 删除开发插件
     * @param $key
     * @return Response
     */
    public function del(string $key)
    {
        (new AddonDevelopService())->del($key);
        return success('DELETE_SUCCESS');
    }

    /**
     *校验key是否被占用
     * @param $key
     * @return void
     */
    public function checkKey($key){

        return success(data:(new AppService())->checkKey($key));
    }

    /**
     * 打包
     * @param $key
     * @return Response
     */
    public function build($key){
        (new AddonDevelopService())->build($key);
        return success();
    }

    /**
     * 下载
     * @param $key
     * @return Response
     */
    public function download($key){

        return (new AddonDevelopService())->download($key);
    }

}
