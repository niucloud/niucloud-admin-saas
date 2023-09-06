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

namespace app\service\admin\diy;

use app\model\sys\SysConfig;
use app\service\core\diy\CoreDiyConfigService;
use core\base\BaseAdminService;
use think\Model;

/**
 * 自定义页面相关配置服务层
 * Class DiyConfigService
 * @package app\service\admin\diy
 */
class DiyConfigService extends BaseAdminService
{

    /**
     * 获取底部导航配置
     * @return array
     */
    public function getBottomConfig()
    {
        return (new CoreDiyConfigService())->getBottomConfig($this->site_id);
    }

    /**
     * 底部导航配置
     * @param $data
     * @return SysConfig|bool|Model
     */
    public function setBottomConfig($data)
    {
        return (new CoreDiyConfigService())->setBottomConfig($this->site_id, $data);
    }

}