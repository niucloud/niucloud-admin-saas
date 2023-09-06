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

namespace app\service\admin\wechat;

use app\model\sys\SysConfig;
use app\service\core\sys\CoreConfigService;
use app\service\core\wechat\CoreWechatApiService;
use core\base\BaseAdminService;
use core\exception\WechatException;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use EasyWeChat\Kernel\Exceptions\InvalidConfigException;
use GuzzleHttp\Exception\GuzzleException;
use think\Model;

/**
 * 微信菜单
 * Class WechatConfigService
 * @package app\service\core\wechat
 */
class WechatMenuService extends BaseAdminService
{
    /**
     * 获取微信菜单
     * @return array|mixed
     */
    public function getInfo(){
        $core_config_service = new CoreConfigService();
        return $core_config_service->getConfig($this->site_id, 'WECHAT_MENU')['value'] ?? [];
    }


    /**
     * 更新微信菜单
     * @param array $data
     * @return SysConfig|bool|Model
     * @throws GuzzleException
     * @throws InvalidConfigException
     */
    public function edit(array $data){
        $core_wechat_api_service = new CoreWechatApiService();
        $menu_result = $core_wechat_api_service->menuCreate($this->site_id, $data);
        if(!empty($menu_result['errcode']) && $menu_result['errcode'] != 0)
            throw new WechatException($menu_result['errmsg']);

        //先尝试改变微信接口菜单
        $core_config_service = new CoreConfigService();
        return $core_config_service->setConfig($this->site_id, 'WECHAT_MENU', $data);
    }
}