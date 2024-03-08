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

use app\dict\common\ChannelDict;
use app\service\core\channel\CorePcService;
use app\service\core\sys\CoreConfigService;
use core\base\BaseAdminService;

/**
 * 配置服务层
 * Class ConfigService
 * @package app\service\core\sys
 */
class PcService extends BaseAdminService
{
    //系统配置文件
    public $core_config_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_config_service = new CoreConfigService();
    }

    /**
     * 设置pc信息
     * @param array $value
     * @return bool
     */
    public function setPc(array $value)
    {
        $data = [
            'is_open' => $value['is_open']
        ];
        return $this->core_config_service->setConfig($this->site_id,ChannelDict::PC, $data);
    }

    /**
     * 获取pc配置
     * @return mixed
     */
    public function getPc(){
        return (new CorePcService())->getPc($this->site_id);
    }
}
