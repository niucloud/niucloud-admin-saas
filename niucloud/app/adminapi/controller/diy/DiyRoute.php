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

use app\adminapi\controller\BaseAdminController;
use app\service\admin\diy\DiyRouteService;


/**
 * 自定义路由表控制器
 * Class DiyRouteController
 * @package app\adminapi\controller\diy
 */
class DiyRoute extends BaseAdminController
{
    /**
     * @notes 获取自定义路由表列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ "title", "" ],
            [ "name", "" ],
            [ "page", "" ],
            [ "sort", "" ]
        ]);
        return success(( new DiyRouteService() )->getPage($data));
    }

    /**
     * 自定义路由表详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id)
    {
        return success(( new DiyRouteService() )->getInfo($id));
    }

    /**
     * 添加自定义路由表
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
            [ "title", "" ],
            [ "name", "" ],
            [ "page", "" ],
            [ "share", "" ],
            [ "is_share", "" ]
        ]);
        $this->validate($data, 'app\validate\diy\DiyRoute.add');
        $id = ( new DiyRouteService() )->add($data);
        return success(100011, [ 'id' => $id ]);
    }

    /**
     * 自定义路由表编辑
     * @param $id  自定义路由表id
     * @return \think\Response
     */
    public function update($id)
    {
        $data = $this->request->params([
            [ "title", "" ],
            [ "name", "" ],
            [ "page", "" ],
            [ "share", "" ],
            [ "is_share", "" ]
        ]);
        $this->validate($data, 'app\validate\diy\DiyRoute.update');
        ( new DiyRouteService() )->update($id, $data);
        return success(100004);
    }

    /**
     * 自定义路由表删除
     * @param $id  自定义路由表id
     * @return \think\Response
     */
    public function del(int $id)
    {
        ( new DiyRouteService() )->del($id);
        return success(100003);
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
        ( new DiyRouteService() )->modifyShare($id, $data);
        return success(100004);
    }

}
