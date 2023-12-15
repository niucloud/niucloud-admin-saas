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

namespace app\dict\pay;

class TransferDict
{

    public const WECHAT = 'wechat';//微信支付

    public const ALIPAY = 'alipay';//支付宝支付

    public const OFFLINE = 'offline';//线下转账

    public const BANK = 'bank';//银行卡转账

    //转账状态

    public const SUCCESS = 'success';//转账成功
    public const DEALING = 'dealing';//处理中
    public const WAIT = 'wait';//待转账
    public const FAIL = 'fail';//失败


    public static function getPayTypeByTransfer(string $type = '')
    {
        $list = array(
            self::WECHAT => PayDict::WECHATPAY,
            self::ALIPAY => PayDict::ALIPAY,
        );
        if (empty($type))
            return $list;
        return $list[$type];

    }

    /**
     * 支付类型
     * @return array
     */
    public static function getTransferType(array $types = [], $is_all = true)
    {
        $list = [
            self::WECHAT => [
                'name' => get_lang('dict_transfer.type_wechat'),
                'key' => self::WECHAT,
                'is_online' => true
            ],//微信
            self::ALIPAY => [
                'name' => get_lang('dict_transfer.type_ali'),
                'key' => self::ALIPAY,
                'is_online' => false
            ],//支付宝
            self::BANK => [
                'name' => get_lang('dict_transfer.type_bank'),
                'key' => self::BANK,
                'is_online' => false
            ],//银行卡
        ];
        if ($is_all) {
            $list[self::OFFLINE] = [
                'name' => get_lang('dict_transfer.type_offline'),
                'key' => self::OFFLINE,
                'is_online' => false
            ];
        }
        if (!empty($types)) {
            foreach ($list as $k => $v) {
                if (!in_array($k, $types)) {
                    unset($list[$k]);
                }
            }
        }
        return $list;
    }

    /**
     * 获取状态
     * @return array
     */
    public static function getStatus()
    {
        return [
            self::WAIT => get_lang('dict_transfer.status_wait'),
            self::DEALING => get_lang('dict_transfer.status_dealing'),
            self::SUCCESS => get_lang('dict_transfer.status_success'),
            self::FAIL => get_lang('dict_transfer.status_fail'),
        ];
    }

}