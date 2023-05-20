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

use app\enum\site\SiteEnum;
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
            ['status', 1],
            ['group_id', 0],
        ]);
        return success((new SiteService())->getPage($data));
    }

    /**
     * 站点详情
     * @param int $id
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
            ['username', ''],
            ['real_name', ''],
            ['password', ''],
            ['group_id', 0],
            ['expire_time', 0]
        ]);
        $this->validate($data, 'app\validate\site\Site.add');
        $this->validate($data, 'app\validate\sys\User.add');
        $site_id = (new SiteService())->add($data);
        return success('ADD_SUCCESS', ['site_id' => $site_id]);
    }

    /**
     * 菜单或接口更新
     */
    public function edit($id)
    {
        $data = $this->request->params([
            ['site_name', ''],
            ['group_id', 0],
            ['expire_time', 0]
        ]);
        $this->validate($data, 'app\validate\site\Site.edit');
        (new SiteService())->edit($id, $data);
         return success('MODIFY_SUCCESS');
    }

    /**
     * 站点状态
     * @return Response
     */
    public function getStatuList()
    {
        return success(SiteEnum::getStatus());
    }

    /**
     * 站点菜单
     * @return Response
     */
    public function menu(){
        return success((new AuthSiteService())->getMenuList(1, 'all'));
    }
}
