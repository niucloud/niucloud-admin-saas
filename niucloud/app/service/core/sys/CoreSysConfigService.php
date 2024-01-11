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
        $wap_domain = !empty(env("system.wap_domain")) ? preg_replace('#/$#', '', env("system.wap_domain")) : request()->domain();
        $web_domain = !empty(env("system.web_domain")) ? preg_replace('#/$#', '', env("system.web_domain")) : request()->domain();

        return  [
            'wap_url' => $wap_domain . "/wap/" . $site_id . "/",
            'web_url' => $web_domain . "/web/" . $site_id . "/"
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

    /**
     * 获取手机端首页列表
     * @param array $data
     * @return array
     */
    public function getWapIndexList($data = [])
    {
        $result = array_filter(event("WapIndex"));
        if (empty($result)) return [];

        $index_list = [];
        foreach ($result as $v) {
            $index_list = empty($index_list) ? $v : array_merge($index_list, $v);
        }

        foreach ($index_list as $k => $v) {
            if (!empty($data[ 'key' ]) && !in_array($v[ 'key' ], explode(',', $data[ 'key' ]))) {
                unset($index_list[ $k ]);
                continue;
            }
        }

        $index_list = array_values($index_list);
        return $index_list;
    }
}
