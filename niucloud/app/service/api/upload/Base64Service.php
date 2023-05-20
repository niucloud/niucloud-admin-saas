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

use app\service\core\upload\CoreBase64Service;
use core\base\BaseApiService;

/**
 * 用户服务层
 * Class BaseService
 * @package app\service
 */
class Base64Service extends BaseApiService
{
    private $root_path = 'base';


    /**
     * 远程拉取图片
     * @param $url
     * @return array
     */
    public function image(string $content){

        $dir = $this->root_path.'/'.'image'.'/'.$this->site_id.'/'.date('Ym').'/'.date('d');
        $core_base64_service = new CoreBase64Service();
        return $core_base64_service->image($content, $this->site_id, $dir);
    }


}