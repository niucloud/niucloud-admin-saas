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

namespace app\service\core\sys;

use core\base\BaseCoreService;

/**
 * 配置服务层
 * Class BaseService
 * @package app\service
 */
class CoreSysConfigService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();

    }

    /**
     * 暂用于单站点业务(不适用于命令行模式)
     * @param int $site_id
     * @return array
     */
    public function getSceneDomain(int $site_id){
        //todo  如果是默认站点
        $domain = env('system.wap_domain') ?: $this->request->domain();
        $wap_domain = $domain.'/wap';
        $web_domain = $domain.'/web';
        if($site_id != $this->request->defaultSiteId()){
            $wap_domain = $wap_domain.'/'.$site_id.'/' ;
            $web_domain = $web_domain.'/'.$site_id.'/' ;
        }
        return [
            'wap_domain' => $wap_domain,
            'web_domain' => $web_domain,
        ];
    }

    /**
     * 获取版权信息(网站整体，不按照站点设置)
     * @return array|mixed
     */
    public function getCopyright()
    {
        $info = (new CoreConfigService())->getConfig(0, 'COPYRIGHT');
        if(empty($info))
        {
            $info = [];
            $info['value'] = [
                'icp' => '',
                'gov_record' => '',
                'gov_url' => '',
                'market_supervision_url' => '',
                'logo' => '',
                'company_name' => '',
                'copyright_link' => '',
                'copyright_desc' => ''
            ];
        }
        return $info['value'];
    }
}