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

namespace app\service\core\diy;

use app\dict\sys\ConfigKeyDict;
use app\model\sys\SysConfig;
use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;
use think\Model;

/**
 * 自定义配置相关
 * Class CoreDiyConfigService
 * @package app\service\core\diy
 */
class CoreDiyConfigService extends BaseCoreService
{
    public function getBottomList($params = [])
    {
        $list = array_values(array_filter(event('BottomNavigation', $params)));
        $app_bottom_nav_config = [];
        foreach ($list as $k => &$v) {

            // 将系统底部导航放到第一个位置
            if ($v[ 'key' ] == 'app') {
                $app_bottom_nav_config = $v;
                unset($list[ $k ]);
            }
        }
        $list = array_values($list);
        if (!empty($app_bottom_nav_config)) {
            array_unshift($list, $app_bottom_nav_config);
        }
        return $list;
    }

    /**
     * 获取底部导航配置
     * @param int $site_id
     * @param string $key
     * @return array
     */
    public function getBottomConfig(int $site_id, string $key = 'app')
    {
        $default_config = $this->getBottomList([ 'key' => $key ])[ 0 ] ?? [];

        $config_key = ConfigKeyDict::DIY_BOTTOM . '_' . $key;
        $info = (new CoreConfigService())->getConfig($site_id, $config_key)[ 'value' ] ?? [];

        if (!empty($default_config)) {
            if (!empty($info)) {
                $value = $info;
                $res[ 'key' ] = $default_config[ 'key' ];
                $res[ 'info' ] = $default_config[ 'info' ];
                $res[ 'value' ] = $value;
                $info = $res;
            } else {
                $info = $default_config;
            }
        }
        return $info;
    }

    /**
     * 设置底部导航
     * @param int $site_id
     * @param array $data
     * @param string $key
     * @return SysConfig|bool|Model
     */
    public function setBottomConfig(int $site_id, array $data, string $key = 'app')
    {
        return (new CoreConfigService())->setConfig($site_id, ConfigKeyDict::DIY_BOTTOM . '_' . $key, $data);
    }

    /**
     * 设置启动页
     * @param int $site_id
     * @param array $data
     * @return SysConfig|bool|Model
     */
    public function setStartUpPageConfig(int $site_id, array $data)
    {
        return (new CoreConfigService())->setConfig($site_id, 'START_UP_PAGE_' . strtoupper($data[ 'type' ]), $data);
    }

    /**
     * 获取启动页配置
     * @param int $site_id
     * @param string $type
     * @return array
     */
    public function getStartUpPageConfig(int $site_id, string $type)
    {
        $info = (new CoreConfigService())->getConfig($site_id, 'START_UP_PAGE_' . strtoupper($type))[ 'value' ] ?? [];
        if (!empty($info)) {
            $info[ 'name' ] = isset($info[ 'name' ]) ? $info[ 'name' ] : '';
        }
        return $info;
    }
}
