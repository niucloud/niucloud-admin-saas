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

namespace app\service\core\addon;

use app\model\addon\AddonLog;

/**
 * 安装服务层
 * Class CoreInstallService
 * @package app\service\core\install
 */
class CoreAddonLogService extends CoreAddonBaseService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new AddonLog();
    }

    /**
     * 新增插件日志
     * @param array $params
     * @return true
     */
    public function add(array $params){
        $data = array(
            'type' => $params['type'],
            'key' => $params['key'],
            'from_version' => $params['from_version'],
            'to_version' => $params['to_version'],
        );
        $this->model->create($data);
        return true;
    }

}