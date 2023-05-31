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

namespace app\service\admin\channel;

use app\dict\sys\ConfigKeyDict;
use app\service\core\channel\CoreH5Service;
use app\service\core\sys\CoreConfigService;
use core\base\BaseAdminService;

/**
 * 配置服务层
 * Class ConfigService
 * @package app\service\core\sys
 */
class H5Service extends BaseAdminService
{
    //系统配置文件
    public $core_config_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_config_service = new CoreConfigService();
    }

    /**
     * 设置H5信息
     * @param array $value
     * @return bool
     */
    public function setH5(array $value)
    {
        $data = [
            'is_open' => $value['is_open']
        ];
        $res = $this->core_config_service->setConfig($this->site_id,ConfigKeyDict::H5, $data);
        return $res;
    }

    /**
     * 获取h5配置
     * @return mixed
     */
    public function getH5(){
        return (new CoreH5Service())->getH5($this->site_id);
    }
}