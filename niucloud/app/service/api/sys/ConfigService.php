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

namespace app\service\api\sys;

use app\service\core\sys\CoreSysConfigService;
use core\base\BaseApiService;

/**
 * 配置服务层
 * Class ConfigService
 * @package app\service\core\sys
 */
class ConfigService extends BaseApiService
{
    //系统配置文件


    public function __construct()
    {
        parent::__construct();

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
     * 获取前端域名
     * @return array|string[]
     */
    public function getSceneDomain(){
        return (new CoreSysConfigService())->getSceneDomain($this->site_id);
    }


}