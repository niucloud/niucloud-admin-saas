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

namespace app\adminapi\controller\home;

use app\service\admin\home\AuthSiteService;
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
            ['status', ''],
            ['app', ''],
        ]);
        return success((new AuthSiteService())->getSitePage($data));
    }

    /**
     * 站点详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new AuthSiteService())->getSiteInfo($id));
    }

    /**
     * 站点更新
     */
    public function edit($id)
    {
        $data = $this->request->params([
            ['site_name', ''],
            ['logo', ''],
            ['keywords', ''],
            ['desc', ''],
            //地址
//            ['latitude', ''],
//            ['longitude', ''],
//            ['province_id', 0],
//            ['city_id', 0],
//            ['district_id', 0],
//            ['address', ''],
//            ['full_address', ''],
//
            ['phone', ''],
//
//            ['business_hours', ''],
//            ['front_end_name', ''],
//            ['front_end_logo', ''],
//            ['icon', '']
        ]);
        $this->validate($data, 'app\validate\site\Site.edit');
        (new AuthSiteService())->editSite($id, $data);

        return success('MODIFY_SUCCESS');
    }

}
