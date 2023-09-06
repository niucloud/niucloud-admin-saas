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

namespace app\dict\channel;

class CertDict
{
    /************************************************* 证书 *****************************************/


    public const WECHATPAY = 'wechatpay';

    public const WECHAT = 'wechat';

    public const ALIYUN = 'aliyun';

    public const WEAPP = 'weapp';

    public const ALIAPP = 'aliapp';

    /**
     * 加解密方式
     * @return array
     */
    public static function getCertType()
    {
        return [
            self::WECHATPAY,
            self::WECHAT,
            self::ALIYUN,
            self::WEAPP,
            self::ALIAPP,
        ];
    }

}