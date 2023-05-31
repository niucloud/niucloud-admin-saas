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

use app\dict\common\ChannelDict;

class PayChannelDict
{


    /**
     * 支付渠道类型
     * @return array
     */
    public static function getPayChannel(array $types = []){
        $channel = ChannelDict::getType();
        $list = [];
        $pay_type = PayDict::getPayType();
//        foreach($pay_type as $k => $v){
//            if($k == PayDict::BALANCEPAY){
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