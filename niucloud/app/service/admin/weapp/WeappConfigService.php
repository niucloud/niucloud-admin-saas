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

namespace app\service\admin\weapp;

use app\enum\channel\WechatEnum;
use app\Request;
use app\service\admin\BaseAdminService;

use app\service\core\weapp\CoreWeappConfigService;
use app\service\core\wechat\CoreWechatConfigService;

/**
 * 微信小程序设置
 * Class WeappConfigService
 * @package app\service\admin\weapp
 */
class WeappConfigService extends BaseAdminService
{
    /**
     * 获取配置信息
     * @return array|null
     */
    public function getWeappConfig()
    {
        $config_info = (new CoreWeappConfigService())->getWeappConfig($this->site_id);
        $config_info = array_merge($config_info, $this->getWeappStaticInfo());
        return $config_info;

    }

    /**
     * 设置配置
     * @param array $data
     * @return \app\model\sys\SysConfig|bool|\think\Model
     */
    public function setWeappConfig(array $data){
        return (new CoreWeappConfigService())->setWeappConfig($this->site_id, $data);
    }

    /**
     *查询微信小程序需要的静态信息
     * @return array
     */
    public function getWeappStaticInfo(){
        $domain = request()->domain();
        return [
            'serve_url' => (string)url('/api/weapp/serve/'.$this->site_id, [],'',true),
            'request_url' => $domain,
            'socket_url'   => "wss://".request()->host(),
            'upload_url'  => $domain,
            'download_url'   => $domain,
        ];
    }
}