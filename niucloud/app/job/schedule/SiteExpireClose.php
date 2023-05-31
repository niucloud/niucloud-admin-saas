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

namespace app\job\schedule;

use app\model\system\Cron;
use app\service\core\schedule\CoreCronService;
use app\service\core\site\CoreSiteService;
use core\base\BaseJob;
use core\exception\NoticeException;
use core\util\Schedule;
use think\facade\Log;
use think\queue\Job;

/**
 * 站点到期自动关闭
 */
class SiteExpireClose extends BaseJob
{
    public function doJob()
    {
        $core_site_service = new CoreSiteService();
        $list = $core_site_service->getExpireSiteList();
        if(!empty($list)){
            foreach($list as $k => $v){
                $core_site_service->expire($v['site_id']);
            }
        }
//        Log::write('站点到期自动关闭'.date('Y-m-d h:i:s'));
        return true;
    }
}
