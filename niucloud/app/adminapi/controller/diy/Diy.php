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

use app\dict\diy\PagesDict;
use app\service\admin\diy\DiyService;
use core\base\BaseAdminController;
use Exception;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Response;


/**
 * 自定义页面控制器
 * Class DiyController
 * @package app\adminapi\controller\diy
 */
class Diy extends BaseAdminController
{
    /**
     * @notes 获取自定义页面分页列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ "title", "" ],
            [ "type", "" ],
            [ 'mode', '' ],
            [ 'addon_name', '' ]
        ]);
        return success(( new DiyService() )->getPage($data));
    }

    /**
     * @notes 获取自定义页面列表
     * @return Response
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getList()
    {
        $data = $this->request->params([
            [ "title", "" ],
            [ "type", "" ],
            [ 'mode', '' ]
        ]);
        return success(( new DiyService() )->getList($data));
    }

    /**
     * 自定义页面详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success(( new DiyService() )->getInfo($id));
    }

    /**
     * 添加自定义页面
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            [ "title", "" ],
            [ "name", "" ],
            [ "type", "" ],
            [ 'template', '' ],
            [ 'mode', 'diy' ], // 页面展示模式，diy：自定义，fixed：固定
            [ "value", "" ],
            [ 'is_default', 0 ],
            [ 'is_change', '' ]
        ]);

        $this->validate($data, 'app\validate\diy\Diy.add');
        $id = ( new DiyService() )->add($data);
        return success('ADD_SUCCESS', [ 'id' => $id ]);
    }

    /**
     * 自定义页面编辑
     * @param $id
     * @return Response
     */
    public function edit($id)
    {
        $data = $this->request->params([
            [ "title", "" ],
            [ "name", "" ],
            [ "value", "" ],
            [ 'is_change', '' ]
        ]);
        $this->validate($data, 'app\validate\diy\Diy.edit');
        ( new DiyService() )->edit($id, $data);
        return success('MODIFY_SUCCESS');
    }

    /**
     * 自定义页面删除
     * @param int $id
     * @return Response
     */
    public function del(int $id)
    {
        ( new DiyService() )->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 设为使用
     * @param $id
     * @return Response
     * @throws Exception
     */
    public function setUse($id)
    {
        ( new DiyService() )->setUse($id);
        return success('MODIFY_SUCCESS');
    }

    /**
     * 获取页面初始化数据
     * @return Response
     */
    public function getPageInit()
    {
        $params = $this->request->params([
            [ 'id', "" ],
            [ "name", "" ],
            [ "type", "" ],
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
     * @return Response
     */
    public function getTemplate()
    {
        $params = $this->request->params([
            [ 'key', '' ], // 页面模板标识
            [ 'action', '' ], // 页面是否装修标识，为空标识不装修，decorate：装修
            [ 'mode', '' ], // 页面展示模式，diy：自定义，fixed：固定
            [ 'type', '' ], // 页面类型，index：首页、member_index：个人中心，空：普通页面
            [ 'addon', '' ], // 插件标识
        ]);
        $diy_service = new DiyService();
        return success($diy_service->getTemplate($params));
    }

    /**
     * 修改页面分享内容
     * @param int $id
     * @return Response
     */
    public function modifyShare(int $id)
    {
        $data = $this->request->params([
            [ "share", "" ],
        ]);
        ( new DiyService() )->modifyShare($id, $data);
        return success('MODIFY_SUCCESS');
    }

    /**
     * 获取装修页面列表
     */
    public function getDecoratePage()
    {
        $params = $this->request->params([
            [ 'type', '' ],
        ]);
        return success(( new DiyService() )->getDecoratePage($params));
    }

    /**
     * 切换模板
     */
    public function changeTemplate()
    {
        $data = $this->request->params([
            [ 'type', '' ], // 页面类型
            [ 'name', '' ], // 链接名称标识
            [ 'parent', '' ], // 链接父级名称标识
            [ 'page', '' ], // 链接路由
            [ 'title', '' ], // 链接标题
            [ 'action', '' ] // 是否存在操作，decorate 表示支持装修
        ]);
        ( new DiyService() )->changeTemplate($data);
        return success('MODIFY_SUCCESS');
    }

    /**
     * 获取模板页面列表
     * @return Response
     */
    public function getTemplatePages()
    {
        $params = $this->request->params([
            [ 'type', '' ], // 页面类型
            [ 'mode', '' ] // 页面模式：diy：自定义，fixed：固定
        ]);
        $pages = PagesDict::getPages($params);
        return success($pages);
    }

    /**
     * 获取模板页面（存在的应用插件列表）
     * @return Response
     */
    public function getApps()
    {
        return success(( new DiyService() )->getApps());
    }
}
