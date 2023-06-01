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

namespace app\dict\sys;

/**
 * 短信枚举类
 * Class SmsDict
 * @package app\dict\sys
 */
class SmsDict
{
    //阿里云短信
    const ALISMS = 'aliyun';
    //腾讯云短信
    const TENCENTSMS = 'tencent';

    public static function getType(){
        return [
            self::ALISMS => [
                'name' => '阿里云短信',
                //配置参数
                'params' => [
                    'sign' => '短信签名',
                    'app_key' => 'APP_KEY',
                    'secret_key' => 'SECRET_KEY'
                ]
            ],
            self::TENCENTSMS => [
                'name' => '腾讯云短信',
                //配置参数
                'params' => [
                    'sign' => '短信签名',
                    'app_id' => 'APP_ID',
                    'secret_id' => 'SECRET_ID',
                    'secret_key' => 'SECRET_KEY'
                ]
            ],

        ];
    }


    const SENDING = 'sending';
    const SUCCESS = 'success';
    const FAIL = 'fail';

    public function getStatusType(){
        return [
            self::SENDING => 'dict_sms.status_sending',
            self::SUCCESS => 'dict_sms.status_success',
            self::FAIL => 'dict_sms.status_fail',
        ];
    }

    const LOGIN = 'login';
    const REGISTER = 'register';
    const BIND_MOBILE = 'bind_mobile';


    const FIND_PASS = 'find_pass';
    //支持的短信场景
    const SCENE_TYPE = [
        self::LOGIN,
        self::REGISTER,
        self::BIND_MOBILE,
        self::FIND_PASS
    ];

}