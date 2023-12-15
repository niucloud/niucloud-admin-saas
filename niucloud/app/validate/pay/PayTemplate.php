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

namespace app\validate\pay;

use app\dict\pay\PayDict;
use think\facade\Lang;
use think\Validate;

/**
 * Class PayTemplate
 * @package app\validate\pay
 */
class PayTemplate extends Validate
{

    //用户名或密码的规范可能是从数据库中获取的
    protected $rule = [
        'name' => 'require',
        //支付宝
        'app_id' => 'requireIf:type,' . PayDict::ALIPAY,
        'app_secret_cert' => 'requireIf:type,' . PayDict::ALIPAY,
        'app_public_cert_path' => 'requireIf:type,' . PayDict::ALIPAY,
        'alipay_public_cert_path' => 'requireIf:type,' . PayDict::ALIPAY,
        'alipay_root_cert_path' => 'requireIf:type,' . PayDict::ALIPAY,

        //微信
        'mch_id' => 'requireIf:type,' . PayDict::WECHATPAY,
        'mch_secret_key' => 'requireIf:type,' . PayDict::WECHATPAY,
        'mch_secret_cert' => 'requireIf:type,' . PayDict::WECHATPAY,
        'mch_public_cert_path' => 'requireIf:type,' . PayDict::WECHATPAY,

        //支付方式
        'type' => 'require|checkPayType',
    ];

    protected $message = [
        'app_id.requireIf' => 'validate_pay.app_id_requireif',
        'app_secret_cert.requireIf' => 'validate_pay.app_secret_cert_requireif',
        'app_public_cert_path.requireIf' => 'validate_pay.app_public_cert_path_requireif',
        'alipay_public_cert_path.requireIf' => 'validate_pay.alipay_public_cert_path_requireif',
        'alipay_root_cert_path.requireIf' => 'validate_pay.alipay_root_cert_path_requireif',

        'mch_id.requireIf' => 'validate_pay.mch_id_requireif',
        'mch_secret_key.requireIf' => 'validate_pay.mch_secret_key_requireif',
        'mch_secret_cert.requireIf' => 'validate_pay.mch_secret_cert_requireif',
        'mch_public_cert_path.requireIf' => 'validate_pay.mch_public_cert_path_requireif',

        'name.require' => 'validate_pay.name_require'
    ];

    protected $scene = [
        'add' => [
            'app_id', 'app_secret_cert', 'app_public_cert_path', 'alipay_public_cert_path', 'alipay_root_cert_path',
            'mch_id', 'mch_secret_key', 'mch_secret_cert', 'mch_public_cert_path',
            'type', 'name'
        ],
        'edit' => [
            'app_id', 'app_secret_cert', 'app_public_cert_path', 'alipay_public_cert_path', 'alipay_root_cert_path',
            'mch_id', 'mch_secret_key', 'mch_secret_cert', 'mch_public_cert_path',
            'name'
        ],
    ];

    /**
     * 自定义验证 支付类型
     * @param $value
     * @param $rule
     * @param array $data
     * @return Lang|true
     */
    protected function checkPayType($value, $rule, $data = [])
    {
        return isset(PayDict::getPayType()[$value]) ? true : get_lang('validate_pay.not_exit_pay_type');
    }

}