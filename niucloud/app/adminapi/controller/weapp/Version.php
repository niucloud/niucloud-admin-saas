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

namespace app\adminapi\controller\weapp;

use app\service\admin\weapp\WeappVersionService;
use core\base\BaseAdminController;
use Exception;
use think\Response;

/**
 * 小程序版本管理控制器
 */
class Version extends BaseAdminController
{
    /**
     * 列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([

        ]);
        return success((new WeappVersionService())->getPage($data));
    }

    /**
     * 详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new WeappVersionService())->getInfo($id));
    }

    /**
     * 添加
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            ['desc', '']
        ]);
        return success(data:(new WeappVersionService())->add($data));
    }

    /**
     * 获取预览码
     * @param int $id
     * @return Response
     */
    public function preview()
    {
        return success(data:(new WeappVersionService())->getPreviewImage());
    }

    /**
     * 删除
     * @param int $id
     * @return Response
     */
    public function del(int $id)
    {
        (new WeappVersionService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 获取小程序上传日志
     * @param string $key
     * @return Response
     */
    public function uploadLog(string $key) {
        return success(data: (new WeappVersionService())->getUploadLog($key));
    }
}
