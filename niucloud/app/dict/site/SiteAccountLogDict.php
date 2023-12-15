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

namespace app\dict\site;

class SiteAccountLogDict
{
    const PAY = 'pay';//支付
    const REFUND = 'refund'; //退款
    const TRANSFER = 'transfer'; //转账

    /**
     * 站点状态
     * @return array
     */
    public static function getType()
    {
        return [
            self::PAY => get_lang('dict_site.pay'),//支付
            self::REFUND => get_lang('dict_site.refund'),//退款
            self::TRANSFER => get_lang('dict_site.transfer'),//转账
        ];
    }

}