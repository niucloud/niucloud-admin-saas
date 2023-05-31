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

namespace app\adminapi\controller\diy;

use app\service\admin\diy\DiyService;
use core\base\BaseAdminController;


/**
 * 自定义页面控制器
 * Class DiyController
 * @package app\adminapi\controller\diy
 */
class Diy extends BaseAdminController
{
    /**
     * @notes 获取自定义页面列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ "title", "" ],
            [ "type", "" ],
        ]);
        return success(( new DiyService() )->getPage($data));
    }

    /**
     * 自定义页面详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id)
    {
        return success(( new DiyService() )->getInfo($id));
    }

    /**
     * 添加自定义页面
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
            [ "title", "" ],
            [ "name", "" ],
            [ "type", "" ],
            [ "value", "" ],
            [ 'is_default', 0 ]
        ]);

        $this->validate($data, 'app\validate\diy\Diy.add');
        $id = ( new DiyService() )->add($data);
        return success('ADD_SUCCESS', [ 'id' => $id ]);
    }

    /**
     * 自定义页面编辑
     * @param $id
     * @return \think\Response
     */
    public function edit($id)
    {
        $data = $this->request->params([
            [ "title", "" ],
            [ "name", "" ],
            [ "value", "" ],
        ]);
        $this->validate($data, 'app\validate\diy\Diy.edit');
        ( new DiyService() )->edit($id, $data);
        return success('MODIFY_SUCCESS');
    }

    /**
     * 自定义页面删除
     * @param $id
     * @return \think\Response
     */
    public function del(int $id)
    {
        ( new DiyService() )->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 设为使用
     * @param $id
     * @return \think\Response
     * @throws \Exception
     */
    public function setUse($id)
    {
        ( new DiyService() )->setUse($id);
        return success('MODIFY_SUCCESS');
    }

    /**
     * 获取页面初始化数据
     * @return \think\Response
     */
    public function getPageInit()
    {
        $params = $this->request->params([
            [ 'id', "" ],
            [ "name", "" ],
            [ "template", "" ],
            [ 'template_name', '' ],
            [ "title", "" ],
        ]);

        $diy_service = new DiyService();
        return success($diy_service->getInit($params));
    }

    /**
     * 获取自定义链接列表
     */
    public function getLink()
    {
        $diy_service = new DiyService();
        return success($diy_service->getLink());
    }

    /**
     * 获取页面模板
     * @return \think\Response
     */
    public function getTemplate()
    {
        $params = $this->request->params([
            [ 'type', "" ],
        ]);
        $diy_service = new DiyService();
        return success($diy_service->getTemplate($params[ 'type' ]));
    }

    /**
     * 修改页面分享内容
     * @param int $id
     */
    public function modifyShare(int $id)
    {
        $data = $this->request->params([
            [ "share", "" ],
        ]);
        ( new DiyService() )->modifyShare($id, $data);
        return success('MODIFY_SUCCESS');
    }

}
