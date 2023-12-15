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

namespace app\service\core\wechat;

use app\dict\channel\WechatDict;
use app\dict\sys\ConfigKeyDict;
use app\model\sys\SysConfig;
use app\service\core\sys\CoreConfigService;
use app\service\core\sys\CoreSysConfigService;
use core\base\BaseCoreService;
use think\Model;

/**
 * 微信配置模型
 * Class WechatConfigService
 * @package app\service\core\wechat
 */
class CoreWechatConfigService extends BaseCoreService
{
    /**
     * 获取微信公众号配置
     * @param int $site_id
     * @return array
     */
    public function getWechatConfig(int $site_id){
        $info = (new CoreConfigService())->getConfig($site_id, ConfigKeyDict::WECHAT)['value'] ?? [];
        return [
            'wechat_name' => $info['wechat_name'] ?? '',//公众号名称
            'wechat_original' => $info['wechat_original'] ?? '',//原始ID
            'app_id'            => $info['app_id'] ?? '',//AppID
            'app_secret'        => $info['app_secret'] ?? '',//AppSecret
            'qr_code' => $info['qr_code'] ?? '',//公众号二维码
            'token'             => $info['token'] ?? '',
            'encoding_aes_key'  => $info['encoding_aes_key'] ?? '',
            'encryption_type'   => $info['encryption_type'] ?? 'not_encrypt',//加解密模式   not_encrypt 明文   compatible 兼容  safe 安全
        ];
    }

    /**
     * 设置微信公众号配置
     * @param int $site_id
     * @param array $data
     * @return SysConfig|bool|Model
     */
    public function setWechatConfig(int $site_id, array $data){
        $config = [
            'wechat_name' => $data['wechat_name'] ?? '',//公众号名称
            'wechat_original' => $data['wechat_original'] ?? '',//原始ID
            'app_id'            => $data['app_id'] ?? '',//AppID
            'app_secret'        => $data['app_secret'] ?? '',//AppSecret
            'qr_code' => $data['qr_code'] ?? '',//公众号二维码
            'token'             => $data['token'] ?? '',
            'encoding_aes_key'  => $data['encoding_aes_key'] ?? '',
            'encryption_type'   => $data['encryption_type'] ?? '',
        ];
        return (new CoreConfigService())->setConfig($site_id, ConfigKeyDict::WECHAT, $config);
    }


    /**
     *查询微信需要的静态信息
     * @return array
     */
    public function getWechatStaticInfo($site_id){
//        $domain = request()->domain();
        $wap_domain = (new CoreSysConfigService())->getSceneDomain($site_id)['wap_domain'] ?? '';
        $wap_domain_array = explode('/', $wap_domain);
        if(count($wap_domain_array) > 2){
            $wap_domain = $wap_domain_array[0].'/'.$wap_domain_array[1].'/'.$wap_domain_array[2];
        }
        return [
            'serve_url' => (string)url('/api/wechat/serve/'.$site_id, [],'',true),
            'business_domain'   => $wap_domain,
            'js_secure_domain'  => $wap_domain,
            'web_auth_domain'   => $wap_domain,
            'encryption_type' => WechatDict::getEncryptionType()
        ];
    }
}