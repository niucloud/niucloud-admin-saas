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

namespace app\service\core\pay;

use app\enum\pay\PayEnum;
use app\enum\sys\ConfigKeyEnum;
use app\model\sys\SysConfig;
use app\service\core\sys\CoreConfigService;
use app\service\core\weapp\CoreWeappConfigService;
use app\service\core\wechat\CoreWechatConfigService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use think\Model;


/**
 * 支付配置服务层
 * Class CorePayConfigService
 * @package app\service\core\pay
 */
class CorePayConfigService extends BaseCoreService
{

    /**
     * 获取启用的支付方式
     * @param $site_id
     * @return void
     */
    public function getPayList(int $site_id, array $allow_type = [])
    {
        $pay_list = [];
        foreach(PayEnum::getPayType($allow_type) as $k => $v){
            switch($k){
                case PayEnum::WECHATPAY:
                    $config = $this->getWechatpayConfig($site_id);
                    break;
                case PayEnum::ALIPAY:
                    $config = $this->getAlipayConfig($site_id);
                    break;
                case PayEnum::OFFLINEPAY:
                    $config = $this->getOfflinepayConfig($site_id);
                    break;
            }
            if($config['status'] == PayEnum::ON){
                $pay_list[] = [
                    'key' => $k,
                    'name' => $v['name'],
                    'icon' => $v['icon']
                ];
            }
        }
        return $pay_list;
    }

    /**
     * 获取支付方式列表的配置
     * @param $site_id
     * @return void
     */
    public function getPayConfigList(int $site_id)
    {
        $pay_config_list = [];
        foreach(PayEnum::getPayType() as $k => $v){
            switch($k){
                case PayEnum::WECHATPAY:
                    $config = self::getWechatpayConfig($site_id);
                    break;
                case PayEnum::ALIPAY:
                    $config = self::getAlipayConfig($site_id);
                    break;
                case PayEnum::OFFLINEPAY:
                    $config = self::getOfflinepayConfig($site_id);
                    break;
            }
            $pay_config_list[] = [
                'key' => $k,
                'name' => $v['name'],
                'icon' => $v['icon'],
                'config' => $config
            ];
        }
        return $pay_config_list;
    }

    /**
     * 微信支付配置
     * @param $site_id
     * @return array|mixed|string[]
     */
    public function getWechatpayConfig(int $site_id){
        $config = (new CoreConfigService())->getConfig($site_id, ConfigKeyEnum::WECHAT_PAY)['value'] ?? [];
        if(empty($config)){
            $config = array(
                'status' => PayEnum::OFF,
                'icon' => path_to_url(PayEnum::WECHATPAY_ICON),
                'mch_id' => '',//商户号
                'mch_secret_key' => '',//商户秘钥  现在默认认为是v3版
                'mch_secret_cert' => '',//商户私钥 字符串或路径
                'mch_public_cert_path' => '',//商户公钥证书路径
            );
        }
        return $config;
    }

    /**
     * 阿里云支付配置
     * @param $site_id
     * @return array|mixed|string[]
     */
    public function getAlipayConfig(int $site_id){
        $config = (new CoreConfigService())->getConfig($site_id, ConfigKeyEnum::ALIPAY)['value'] ?? [];
        if(empty($config)){
            $config = array(
                'status' => PayEnum::OFF,
                'app_id' => path_to_url(PayEnum::ALIPAY_ICON),// 必填-支付宝分配的 app_id
                'app_secret_cert' => '',// 必填-应用私钥 字符串或路径
                'app_public_cert_path' => '',//必填-应用公钥证书 路径
                'alipay_public_cert_path' => '',//必填-支付宝公钥证书 路径
                'alipay_root_cert_path' => '',// 必填-支付宝根证书 路径
            );
        }
        return $config;
    }

    /**
     * 线下支付
     * @param $site_id
     * @return array|mixed|string[]
     */
    public function getOfflinepayConfig(int $site_id){
        $config = (new CoreConfigService())->getConfig($site_id, ConfigKeyEnum::OFFLINE_PAY)['value'] ?? [];
        if(empty($config)){
            $config = array(
                'status' => PayEnum::OFF,
            );
        }
        return $config;
    }

    /**
     * 通过支付方式查询支付配置(todo 注意: 用于支付 用于支付 用于支付)
     * @param $site_id
     * @param $type
     * @return void
     */
    public function getPayConfigByType(int $site_id, string $type){
        switch($type){
            case PayEnum::WECHATPAY:
                $config = self::getWechatpayConfig($site_id);
                $config = array_merge($config, $this->getWechatPayFullConfig($site_id));//一般来说,微信支付商户号不能完整的进行支付活动,需要我们主动完善支付信息, 例如公众号appid
                break;
            case PayEnum::ALIPAY:
                $config = self::getAlipayConfig($site_id);
                break;
            case PayEnum::OFFLINEPAY:
                $config = self::getOfflinepayConfig($site_id);
                break;
        }
        if($config['status'] != PayEnum::ON)
            throw new CommonException('PAYMENT_METHOD_NOT_EXIST');

        return $config;
    }

    /**
     * 通过支付方式获取配置(用于配置查询)
     * @param $site_id
     * @param $type
     * @return array|array[]|mixed|string[]
     */
    public function getConfigByType(int $site_id, string $type){
        switch($type){
            case PayEnum::WECHATPAY:
                $config = self::getWechatpayConfig($site_id);
                break;
            case PayEnum::ALIPAY:
                $config = self::getAlipayConfig($site_id);
                break;
            case PayEnum::OFFLINEPAY:
                $config = self::getOfflinepayConfig($site_id);
                break;
        }
        return $config;
    }
    /**
     * 获取完整的微信支付配置
     * @param $site_id
     * @return void
     */
    public function getWechatPayFullConfig(int $site_id){
        //TODO 先判断是否是开放平台授权,然后再决定使用什么appid
        //查询公众号配置
        $core_wechat_config_service = new CoreWechatConfigService();
        $mp_app_id = $core_wechat_config_service->getWechatConfig($site_id)['app_id'];//公众号appid

        //查询公众号配置
        $core_weapp_config_service = new CoreWeappConfigService();
        $mini_app_id = $core_weapp_config_service->getWeappConfig($site_id)['app_id'];//公众号appid

        //todo  查询微信小程序 appid  .  应用appid.....
        return [
            'mp_app_id' => $mp_app_id,
            'mini_app_id' => $mini_app_id
            //............
        ];
    }

    /**
     * 设置线下支付
     * @param $site_id
     * @param $data
     * @return SysConfig|bool|Model
     */
    public function setOfflinepayConfig(int $site_id, array $data){

        $config = [
            'status' => $data['status'],
        ];
        return (new CoreConfigService())->setConfig($site_id, ConfigKeyEnum::OFFLINE_PAY, $config);
    }
    /**
     * 设置线下支付
     * @param $site_id
     * @param $data
     * @return SysConfig|bool|Model
     */
    public function setWechatpayConfig(int $site_id, array $data){

        $config = [
            'status' => $data['status'],
            'mch_id' => $data['mch_id'],//商户号
            'mch_secret_key' => $data['mch_secret_key'],//商户秘钥  现在默认认为是v3版
            'mch_secret_cert' => $data['mch_secret_cert'],//商户私钥 字符串或路径
            'mch_public_cert_path' => $data['mch_public_cert_path'],//商户公钥证书路径
        ];
        return (new CoreConfigService())->setConfig($site_id, ConfigKeyEnum::WECHAT_PAY, $config);
    }
    /**
     * 设置线下支付
     * @param $site_id
     * @param $data
     * @return SysConfig|bool|Model
     */
    public function setAlipayConfig(int $site_id, array $data){

        $config = [
            'status' => $data['status'],
            'app_id' => $data['app_id'],// 必填-支付宝分配的 app_id
            'app_secret_cert' => $data['app_secret_cert'],// 必填-应用私钥 字符串或路径
            'app_public_cert_path' => $data['app_public_cert_path'],//必填-应用公钥证书 路径
            'alipay_public_cert_path' => $data['alipay_public_cert_path'],//必填-支付宝公钥证书 路径
            'alipay_root_cert_path' => $data['alipay_root_cert_path'],// 必填-支付宝根证书 路径
        ];
        return (new CoreConfigService())->setConfig($site_id, ConfigKeyEnum::ALIPAY, $config);
    }

    /**
     * 通过支付方式设置支付配置
     * @param $site_id
     * @param $type
     * @param $data
     * @return array|mixed|string[]
     */
    public function setConfigByType(int $site_id, string $type, array $data){
        switch($type){
            case PayEnum::WECHATPAY:
                $result = $this->setWechatpayConfig($site_id, $data);
                break;
            case PayEnum::ALIPAY:
                $result = $this->setAlipayConfig($site_id, $data);
                break;
            case PayEnum::OFFLINEPAY:
                $result = $this->setOfflinepayConfig($site_id, $data);
                break;
        }
        return $result;
    }
}