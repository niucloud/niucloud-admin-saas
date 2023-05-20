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

namespace app\service\admin\auth;

use app\enum\sys\ConfigKeyEnum;
use app\model\sys\SysConfig;
use app\service\core\sys\CoreConfigService;
use core\base\BaseAdminService;
use think\Model;

/**
 * 登录服务层
 * Class BaseService
 * @package app\service
 */
class ConfigService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 获取注册与登录设置
     * @param $site_id
     */
    public function getConfig()
    {
        $info = (new CoreConfigService())->getConfig($this->request->defaultSiteId(), ConfigKeyEnum::ADMIN_LOGIN)['value'] ?? [];
        $config = [
            'is_captcha' => $info['is_captcha'] ?? 0,//是否启用验证码
            'is_site_captcha' => $info['is_site_captcha'] ?? 0,//是否启用站点验证码
            'bg' => $info['bg'] ?? '',//平台登录端 背景
            'site_bg' => $info['site_bg'] ?? '',//站点登录端  背景
        ];
        return $config;
    }

    /**
     * 注册与登录设置
     * @param $site_id
     * @param $data
     * @return SysConfig|bool|Model
     */
    public function setConfig(array $data)
    {
        $config = [
            'is_captcha' => $data['is_captcha'] ?? 0,//是否启用验证码
            'is_site_captcha' => $data['is_site_captcha'] ?? 0,//是否启用站点验证码
            'bg' => $data['bg'] ?? '',//平台登录端 背景
            'site_bg' => $data['site_bg'] ?? '',//站点登录端  背景
        ];
        (new CoreConfigService())->setConfig($this->site_id, ConfigKeyEnum::ADMIN_LOGIN, $config);
        return true;
    }

}