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

namespace app\enum\sys;

/**
 * 消息类
 * Class MessageEnum
 * @package app\enum\sys
 */
class MessageEnum
{
    /**
     * 获取消息
     * @return array
     */
    public static function getMessage(string $key = ''){
        $message = [
            'verify_code' => [
                'key' => 'verify_code',
                'app_type' => 'admin',
                'name' => '手机验证码',
                'title' => '管理端验证码登录',
                'variable' =>[
                    'code' => '验证码'
                ],
                'support_type' => ['sms'],
                'receiver_type' => 2,
                'sms_default_content' => '您的手机验证码{code}，请不要轻易告诉其他人',
                'wechat_json' => '',
                'weapp_json' => ''
            ],
            //手机验证码，站点应用发送
            'member_verify_code' => [
                'key' => 'member_verify_code',
                'app_type' => 'site',
                'name' => '手机验证码',
                'title' => '前端验证码登录，注册，手机验证',
                'variable' =>[
                    'code' => '验证码'
                ],
                'support_type' => ['sms'],
                'receiver_type' => 1,
                'sms_default_content' => '您的手机验证码{code}，请不要轻易告诉其他人',
                'wechat_json' => '',
                'weapp_json' => ''
            ],
            //充值成功通知，站点端发送
            'recharge_success' => [
                'key' => 'recharge_success',
                'app_type' => 'site',
                'name' => '充值成功通知',
                'title' => '会员充值成功后发送',
                'variable' =>[
                    'price' => '充值金额',
                    'balance' => '充值后账户',
                    'time' => '充值时间',
                    'trade_no' => '交易单号'
                ],
                'support_type' => ['sms','wechat','weapp'],
                'receiver_type' => 1,
                'sms_default_content' => '您充值金额￥{price}, 充值后金额￥{balance}',
                'wechat_json' => [
                    'temp_key' => 'OPENTM414089457',
                    'first' => '',
                    'content' => [
                        ['充值时间', '{time}'],
                        ['充值金额', '{price}'],
                        ['充值状态', '充值成功']
                    ],
                    'remark' => ''
                ],
                'weapp_json' => [
                    'temp_key' => '755',
                    'content' => [
                        ['交易单号', '{trade_no}'],
                        ['充值金额', '{price}'],
                        ['账户余额', '{balance}'],
                        ['充值时间', '{time}'],
                    ],
                ]
            ]
        ];
        if(empty($key))
        {
            return $message;
        }else
            return $message[$key];
    }

}