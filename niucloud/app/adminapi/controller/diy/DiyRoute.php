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

use app\service\admin\diy\DiyRouteService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 自定义路由表控制器
 * Class DiyRouteController
 * @package app\adminapi\controller\diy
 */
class DiyRoute extends BaseAdminController
{
    /**
     * @notes 获取自定义路由表列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ 'title', '' ], // 页面名称
            [ 'url', '' ], // 路由地址，格式：/app/pages/index/index
            [ 'addon_name', '' ] // 插件标识
        ]);
        return success((new DiyRouteService())->getList($data));
    }

    /**
     * 自定义路由表详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new DiyRouteService())->getInfo($id));
    }

    /**
     * 自定义路由表详情
     * @param string $name
     * @return Response
     */
    public function getInfoByName(string $name)
    {
        return success((new DiyRouteService())->getInfoByName($name));
    }

    /**
     * 添加自定义路由表
     * @return Response
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
        $id = (new DiyRouteService())->add($data);
        return success('ADD_SUCCESS', [ 'id' => $id ]);
    }

    /**
     * 自定义路由表编辑
     * @param $id
     * @return Response
     */
    public function edit($id)
    {
        $data = $this->request->params([
            [ "title", "" ],
            [ "name", "" ],
            [ "page", "" ],
            [ "share", "" ],
            [ "is_share", "" ]
        ]);
        $this->validate($data, 'app\validate\diy\DiyRoute.edit');
        (new DiyRouteService())->edit($id, $data);
        return success('MODIFY_SUCCESS');
    }

    /**
     * 自定义路由表删除
     * @param int $id
     * @return Response
     */
    public function del(int $id)
    {
        (new DiyRouteService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 修改页面分享内容
     */
    public function modifyShare()
    {
        $data = $this->request->params([
            [ 'share', '' ],
            [ 'title', '' ],
            [ 'name', '' ],
            [ 'page', '' ],
            [ 'is_share', 0 ],
            [ 'sort', 0 ]
        ]);
        (new DiyRouteService())->modifyShare($data);
        return success('MODIFY_SUCCESS');
    }


    /**
     * 获取模板页面（存在的应用插件列表）
     * @return Response
     */
    public function getApps()
    {
        return success((new DiyRouteService())->getApps());
    }

}
