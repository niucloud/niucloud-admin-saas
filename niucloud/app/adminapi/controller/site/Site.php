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

namespace app\adminapi\controller\site;

use app\dict\site\SiteDict;
use app\service\admin\auth\AuthSiteService;
use app\service\admin\site\SiteService;
use core\base\BaseAdminController;
use think\Response;

class Site extends BaseAdminController
{
    /**
     * 站点列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['keywords', ''],
            ['status', ""],
            ['group_id', 0],
            ['create_time', []],
            ['expire_time', []],
            ['app', ''],
//            ['']
        ]);
        return success((new SiteService())->getPage($data));
    }

    /**
     * 站点详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new SiteService())->getInfo($id));
    }

    /**
     * 添加站点
     * ['site_name' => '', 'username' => '', 'head_img' => '', 'real_name' => '', 'password' => '', 'expire_time' => 0]
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            ['site_name', ''],
            ['uid', 0],
            ['username', ''],
            ['real_name', ''],
            ['password', ''],
            ['group_id', 0],
            ['expire_time', 0]
        ]);
        $this->validate($data, 'app\validate\site\Site.add');
        if (empty($data['uid'])) $this->validate($data, 'app\validate\sys\User.add');
        $site_id = (new SiteService())->add($data);
        return success('ADD_SUCCESS', ['site_id' => $site_id]);
    }

    /**
     * 站点状态
     * @return Response
     */
    public function getStatuList()
    {
        return success(SiteDict::getStatus());
    }

    /**
     * 站点菜单
     * @return Response
     */
    public function menu()
    {
        return success((new AuthSiteService())->getMenuList(1, 'all', 'all', 0));
    }

    /**
     * 关闭站点
     */
    public function closeSite($id)
    {
        $data = $this->request->params([
            ['status', SiteDict::CLOSE],
        ]);
        (new SiteService())->edit($id, $data);
        return success();
    }

    /**
     * 菜单或接口更新
     */
    public function edit($id)
    {
        $data = $this->request->params([
            ['site_name', ''],
            ['expire_time', 0],
            ['group_id',0]
        ]);
        $this->validate($data, 'app\validate\site\Site.edit');
        (new SiteService())->edit($id, $data);
        return success('MODIFY_SUCCESS');
    }

    /**
     * 删除站点
     * @param $id
     * @return Response
     */
    public function del($id) {
        (new SiteService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 开启站点
     */
    public function openSite($id)
    {
        $data = $this->request->params([
            ['status', SiteDict::ON],
        ]);
        (new SiteService())->edit($id, $data);
        return success();
    }

    public function indexConfig()
    {

    }

    /**
     * 获取站点拥有的应用
     * @return Response
     */
    public function addons() {
        $data = $this->request->params([
            ['title', ''],
        ]);
        $data = (new SiteService())->getSiteAddons($data);
        return success(data:$data);
    }

}
