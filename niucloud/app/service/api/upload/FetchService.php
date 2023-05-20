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

namespace app\service\api\upload;

use app\service\core\upload\CoreFetchService;
use core\base\BaseApiService;

/**
 * 用户服务层
 * Class BaseService
 * @package app\service
 */
class FetchService extends BaseApiService
{
    private $root_path = 'file';


    /**
     * 远程拉取图片
     * @param $url
     * @return array
     */
    public function image(string $url){

        $dir = $this->root_path.'/'.'image'.'/'.$this->site_id.'/'.date('Ym').'/'.date('d');
        $core_upload_service = new CoreFetchService();
        return $core_upload_service->image($url, $this->site_id, $dir);
    }


}