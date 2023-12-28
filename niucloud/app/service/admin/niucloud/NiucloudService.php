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

namespace app\service\admin\niucloud;

use app\dict\sys\ConfigKeyDict;
use app\service\core\niucloud\CoreAuthService;
use app\service\core\niucloud\CoreModuleService;
use app\service\core\sys\CoreConfigService;
use core\base\BaseAdminService;
use core\exception\CommonException;

/**
 * 消息管理服务层
 */
class NiucloudService extends BaseAdminService
{
    public $core_config_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_config_service = new CoreConfigService();

    }

    /**
     * 设置 授权信息
     * @param $data
     * @return \app\model\sys\SysConfig|bool|\think\Model
     */
    public function setAuthorize($data){

        $data = [
            'auth_code' => $data['auth_code'],
            'auth_secret' => $data['auth_secret']
        ];
        $service = (new CoreAuthService($data['auth_code'], $data['auth_secret']));
        $auth_info = $service->getAuthInfo()['data'] ?? [];
        if (empty($auth_info)) throw new CommonException('AUTH_NOT_EXISTS');
        $service->clearAccessToken();
        return $this->core_config_service->setConfig(0,ConfigKeyDict::NIUCLOUD_CONFIG, $data);
    }

    /**
     * 获取授权信息
     * @return mixed|string[]
     */
    public function getAuthorize(){
        $info = $this->core_config_service->getConfig(0, ConfigKeyDict::NIUCLOUD_CONFIG);
        if(empty($info))
        {
            $info = [];
            $info['value'] = [
                'auth_code' => '',
                'auth_secret' => ''
            ];
        }
        return $info['value'];
    }

    /**
     * 获取框架最新版本
     */
    public function getFrameworkLastVersion() {
        return (new CoreModuleService())->getFrameworkLastVersion();
    }

    /**
     * 获取框架版本更新记录
     */
    public function getFrameworkVersionList() {
        return (new CoreModuleService())->getFrameworkVersionList();
    }
}
