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

namespace app\service\core\channel;

use app\dict\sys\ConfigKeyDict;
use app\model\sys\SysAttachment;
use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;

/**
 * 素材管理服务层
 * Class CoreAttachmentService
 * @package app\service\core\sys
 */
class CoreH5Service extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysAttachment();
    }



    /**
     * 获取h5配置
     * @return array|mixed
     */
    public function getH5(int $site_id)
    {
        $info = (new CoreConfigService())->getConfig($site_id, ConfigKeyDict::H5)['value'] ?? [];
        if(empty($info))
        {
            $info = [
                'is_open' => 1
            ];
        }
        return $info;
    }
}
