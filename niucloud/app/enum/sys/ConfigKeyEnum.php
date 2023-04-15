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

class ConfigKeyEnum
{

    const WECHAT = 'WECHAT';//微信公众号

    const WEAPP = 'weapp';//微信小程序
    const WECHAT_PAY = 'wechat_pay';//微信支付
    const ALIPAY = 'alipay';//支付宝支付
    const OFFLINE_PAY = 'offline_pay';//线下支付
    const UPLOAD = 'upload';//上传配置
    const DIY_BOTTOM = 'diy_bottom';//底部导航配置

    const MEMBER_WITHDRAW = 'member_withdraw';//会员提现


    const ALIAPP = 'aliapp';//支付宝小程序

    const H5 = 'h5';//h5

}