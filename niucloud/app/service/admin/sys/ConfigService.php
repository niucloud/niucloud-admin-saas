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

namespace app\service\admin\sys;

use app\service\admin\site\SiteService;
use app\service\core\sys\CoreConfigService;
use app\service\core\sys\CoreSysConfigService;
use core\base\BaseAdminService;

/**
 * 配置服务层
 * Class ConfigService
 * @package app\service\core\sys
 */
class ConfigService extends BaseAdminService
{
    //系统配置文件
    public $core_config_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_config_service = new CoreConfigService();
    }

    /**
     * 获取版权信息(网站整体，不按照站点设置)
     * @return array|mixed
     */
    public function getCopyright()
    {
        return (new CoreSysConfigService())->getCopyright();
    }

    /**
     * 设置版权信息(整体设置，不按照站点)
     * @param array $value
     * @return bool
     */
    public function setCopyright(array $value)
    {
        $data = [
            'icp' => $value['icp'],
            'gov_record' => $value['gov_record'],
            'gov_url' => $value['gov_url'],
            'market_supervision_url' => $value['market_supervision_url'],
            'logo' => $value['logo'],
            'company_name' => $value['company_name'],
            'copyright_link' => $value['copyright_link'],
            'copyright_desc' => $value['copyright_desc']
        ];
        $res = $this->core_config_service->setConfig(0,'COPYRIGHT', $data);
        return $res;
    }

    /**
     * 获取网站信息
     * @return mixed
     */
    public function getWebSite()
    {
        return (new SiteService())->getInfo($this->site_id);

    }
    /**
     * 设置网站信息
     * @return bool
     */
    public function setWebSite($data)
    {

        return (new SiteService())->edit($this->site_id, $data);

    }
    /**
     * 获取前端域名
     * @return array|string[]
     */
    public function getSceneDomain(){
        return (new CoreSysConfigService())->getSceneDomain($this->site_id);
    }
}