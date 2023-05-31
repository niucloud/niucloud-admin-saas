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

namespace app\adminapi\controller\sys;

use app\service\admin\sys\ConfigService;
use core\base\BaseAdminController;
use think\Response;

class Config extends BaseAdminController
{
    /**
     * 获取网站设置
     * @return Response
     */
    public function getWebsite(){
        return success((new ConfigService())->getWebSite());
    }

    /**
     * 网站设置
     * @return Response
     */
    public function setWebsite(){
        $data = $this->request->params([
            ["site_name",""],
            ["logo",""],
            ["keywords",""],
            ["desc",""],
            ["latitude",""],
            ["longitude",""],
            ["province_id",0],
            ["city_id",0],
            ["district_id",0],
            ["address",""],
            ["full_address",""],
            ["phone",""],
            ["business_hours",""],
            ["site_name",""],
            ["logo",""],
            ["front_end_name", ""],
            ["front_end_logo", ""],
            ["icon", ""]
        ]);
        $this->validate($data, 'app\validate\site\Site.edit');
        (new ConfigService())->setWebSite($data);

        $service_data = $this->request->params([
            ["wechat_code",""],
            ["enterprise_wechat",""],
            ["tel",""],
        ]);
        (new ConfigService())->setService($service_data);

        return success();
    }

    /**
     * 获取版权信息
     * @return Response
     */
    public function getCopyright(){
        return success((new ConfigService())->getCopyright());
    }

    /**设置版权信息
     * @return Response
     */
    public function setCopyright(){
        $data = $this->request->params([
            ['icp', ''],
            ['gov_record', ''],
            ['gov_url', ''],
            ['market_supervision_url', ''],
            ['logo', ''],
            ['company_name', ''],
            ['copyright_link', ''],
            ['copyright_desc', ''],
        ]);
        (new ConfigService())->setCopyright($data);
        return success();
    }

    /**
     * 场景域名
     * @return Response
     */
    public function getSceneDomain(){
        return success((new ConfigService())->getSceneDomain());
    }

    /**
     * 获取服务信息
     * @return Response
     */
    public function getServiceInfo(){
        return success((new ConfigService())->getService());
    }
}
