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
use app\service\core\site\CoreSiteService;
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
     * 获取底部导航列表
     * @param array $params
     * @return array|mixed
     */
    public function getBottomList($params = [])
    {
        $list = (new CoreDiyConfigService())->getBottomList($params);

        $site_addon = (new CoreSiteService())->getSiteCache($this->site_id);

        // 单应用，排除 系统 底部导航设置
        if (count($site_addon[ 'apps' ]) == 1) {
            foreach ($list as $k=>$v){
                if($v['key'] = 'app'){
                    unset($list[$k]);
                    break;
                }
            }
            $list  = array_values($list);
        }
        return $list;
    }

    /**
     * 获取底部导航配置
     * @param $key
     * @return array
     */
    public function getBottomConfig($key)
    {
        return (new CoreDiyConfigService())->getBottomConfig($this->site_id, $key);
    }

    /**
     * 底部导航配置
     * @param $data
     * @param $key
     * @return SysConfig|bool|Model
     */
    public function setBottomConfig($data, $key)
    {
        return (new CoreDiyConfigService())->setBottomConfig($this->site_id, $data, $key);
    }

    /**
     * 设置启动页
     * @param $data
     * @return SysConfig|bool|Model
     */
    public function setStartUpPageConfig($data)
    {
        return (new CoreDiyConfigService())->setStartUpPageConfig($this->site_id, $data);
    }

    /**
     * 获取启动页配置
     * @param $name
     * @return array
     */
    public function getStartUpPageConfig($name)
    {
        return (new CoreDiyConfigService())->getStartUpPageConfig($this->site_id, $name);
    }

}
