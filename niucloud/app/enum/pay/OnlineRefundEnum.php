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

class OnlineRefundEnum
{

    const SUCCESS = 'SUCCESS';//退款成功

    const CLOSED = 'CLOSED';//退款关闭

    const PROCESSING = 'PROCESSING';//退款处理中
    const ABNORMAL = 'ABNORMAL';//退款异常


    /**
     * @param string $status
     * @return string|string[]
     * 退款状态。枚举值：
     * REFUND_SUCCESS 退款处理成功；
     * 未返回该字段表示退款请求未收到或者退款失败；
     * 注：如果退款查询发起时间早于退款时间，或者间隔退款发起时间太短，可能出现退款查询时还没处理成功，后面又处理成功的情况，建议商户在退款发起后间隔10秒以上再发起退款查询请求。
     */
    public static function getAliRefundStatus(string $status = ''){
        $list = [
            'REFUND_SUCCESS ' => self::SUCCESS,//退款处理成功
            'REFUND_FAIL ' => self::ABNORMAL,//表示退款请求未收到或者退款失败
        ];
        if(!empty($status))
            return $list[$status];

        return $list;
    }

    public static function getWechatRefundStatus(string $status = ''){
        $list = [
            'SUCCESS' => self::SUCCESS,//退款成功
            'CLOSED' => self::CLOSED,//退款关闭
            'PROCESSING' => self::PROCESSING,//退款处理中
            'ABNORMAL' => self::ABNORMAL,//退款异常

        ];
        if(!empty($status))
            return $list[$status];

        return $list;
    }


}