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

namespace app\service\admin\pay;

use app\service\core\pay\CorePayConfigService;
use core\base\BaseAdminService;

/**
 * 支付配置服务层
 * Class PayConfigService
 * @package app\service\admin\pay
 */
class PayConfigService extends BaseAdminService
{

    public $core_pay_config_service;
    public function __construct()
    {
        parent::__construct();
        $this->core_pay_config_service = new CorePayConfigService();
    }

    /**
     * 获取配置
     * @param string $key
     * @param string $value
     * @param int $site_id
     */
    public function getConfigByType(string $type){
        return $this->core_pay_config_service->getConfigByType($this->site_id, $type);
    }

    /**
     * 设置配置信息
     * @param string $key
     * @param int $site_id
     * @return mixed
     */
    public function setConfigByType(string $type, array $data)
    {
        return $this->core_pay_config_service->setConfigByType($this->site_id, $type, $data);
    }

    /**
     * 获取支付方式配置列表
     * @return array|null
     */
    public function getPayConfigList(){
        return $this->core_pay_config_service->getPayConfigList($this->site_id);
    }


}