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

namespace app\enum\pay;

use app\enum\common\ChannelEnum;

class PayChannelEnum
{


    /**
     * 支付渠道类型
     * @return array
     */
    public static function getPayChannel(array $types = []){
        $channel = ChannelEnum::getType();
        $list = [];
        $pay_type = PayEnum::getPayType();
//        foreach($pay_type as $k => $v){
//            if($k == PayEnum::BALANCEPAY){
//                $pay_type[$k]['is_template'] = false;
//            }else{
//                $pay_type[$k]['is_template'] = true;
//            }
//        }
        foreach($channel as $k => $v){
            $list[$k] = [
                'name' => $v,
                'key' => $k,
                'pay_type' => $pay_type
            ];
        }
        return $list;
    }


}