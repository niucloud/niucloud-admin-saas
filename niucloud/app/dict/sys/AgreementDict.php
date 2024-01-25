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

use think\facade\Log;

/**
 * 协议相关枚举类
 * Class AgreementDict
 * @package app\dict\sys
 */
class AgreementDict
{

    /**
     * 获取协议类型
     * @return string[]
     */
    public static function getType()
    {
        $data = [
            'service' => get_lang('dict_agreement.service'),//服务协议,
            'privacy' => get_lang('dict_agreement.privacy'),//隐私协议
        ];
        $addon_data = event("AgreementType");
        Log::write("检测数据");
        Log::write($addon_data);
        foreach ($addon_data as $k => $v)
        {
            $data = array_merge($data, $v);
        }
        return $data;
    }

}