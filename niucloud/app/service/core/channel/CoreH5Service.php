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

use app\enum\sys\ConfigKeyEnum;
use app\model\sys\SysAttachment;
use app\service\core\BaseCoreService;
use app\service\core\file\CoreStorageService;
use app\service\core\sys\CoreConfigService;
use extend\driver\file\FileDriver;
use extend\exception\AdminException;
use extend\exception\UploadFileException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

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
        $info = (new CoreConfigService())->getConfig($site_id, ConfigKeyEnum::H5)['value'] ?? [];
        if(empty($info))
        {
            $info = [
                'is_open' => 0
            ];
        }
        return $info;
    }
}