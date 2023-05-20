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

namespace app\service\admin\file;

use app\model\sys\SysConfig;
use app\service\core\upload\CoreUploadConfigService;
use core\base\BaseAdminService;
use think\Model;
use think\Response;

/**
 * 用户服务层
 * Class BaseService
 * @package app\service
 */
class UploadConfigService extends BaseAdminService
{

    public $core_upload_config_service;
    public function __construct()
    {
        parent::__construct();
        $this->core_upload_config_service = new CoreUploadConfigService();
    }

    /**
     * 获取上传配置
     * @return array|Response
     */
    public function getUploadConfig()
    {
        return $this->core_upload_config_service->getUploadConfig($this->site_id);

    }

    /**
     * 上传设置
     * @param array $data
     * @return SysConfig|bool|Model
     */
    public function setUploadConfig(array $data)
    {
        return $this->core_upload_config_service->setUploadConfig($this->site_id, $data);
    }



}