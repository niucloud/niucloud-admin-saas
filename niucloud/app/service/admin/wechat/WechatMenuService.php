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
use app\service\admin\BaseAdminService;

use app\service\core\sys\CoreConfigService;
use app\service\core\wechat\CoreWechatApiService;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use extend\exception\WechatException;
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
        $menu = $core_config_service->getConfig($this->site_id, 'WECHAT_MENU')['value'] ?? [];
        return $menu;
    }


    /**
     * 更新微信菜单
     * @param $data
     * @return SysConfig|bool|Model
     * @throws InvalidArgumentException
     */
    public function update(array $data){
        $core_wechat_api_service = new CoreWechatApiService();
        $menu_result = $core_wechat_api_service->menuCreate($this->site_id, $data);
        if(!empty($menu_result['errcode']) && $menu_result['errcode'] != 0)
            throw new WechatException($menu_result['errmsg']);

        //先尝试改变微信接口菜单
        $core_config_service = new CoreConfigService();
        return $core_config_service->setConfig($this->site_id, 'WECHAT_MENU', $data);
    }
}