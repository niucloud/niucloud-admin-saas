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

namespace app\service\api\site;

use app\model\site\Site;
use app\service\core\site\CoreSiteService;
use core\base\BaseApiService;

/**
 * 站点服务层
 * Class Site
 * @package app\service\admin\site
 */
class SiteService extends BaseApiService
{
    public static $cache_tag_name = 'site_cash';
    public function __construct()
    {
        parent::__construct();
        $this->model = new Site();
    }



    /**
     * 获取授权当前站点信息(用做缓存)
     * @return mixed
     */
    public function getSiteCache(){

        return (new CoreSiteService())->getSiteCache($this->site_id);
    }

}