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

namespace app\adminapi\controller\applet;

use app\service\admin\applet\AppletVersionService;
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
        return success((new AppletVersionService())->getPage($data));
    }

    /**
     * 详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new AppletVersionService())->getInfo($id));
    }

    /**
     * 添加
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            ['type', ''],
            ['desc', ''],
            ['status', ''],
            ['path', ''],
            ['version', ''],
        ]);
        $id = (new AppletVersionService())->add($data);
        return success('ADD_SUCCESS');
    }

    /**
     * 编辑
     * @param int $id
     * @return Response
     */
    public function edit(int $id)
    {
        $data = $this->request->params([
            ['desc', ''],
            ['status', ''],
            ['path', ''],
            ['version', ''],
        ]);

        (new AppletVersionService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 删除
     * @param int $id
     * @return Response
     */
    public function del(int $id)
    {
        (new AppletVersionService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 设置状态
     * @param int $id
     * @param $status
     * @return Response
     */
    public function setStatus(int $id, $status)
    {
        (new AppletVersionService())->setStatus($id, $status);
        return success('EDIT_SUCCESS');
    }

    /**
     * 小程序包上传
     * @return Response
     * @throws Exception
     */
    public function upload()
    {
        $data = $this->request->params([
            ['file', 'file'],
        ]);
        return success(data: (new AppletVersionService())->upload($data['file']));
    }
}
