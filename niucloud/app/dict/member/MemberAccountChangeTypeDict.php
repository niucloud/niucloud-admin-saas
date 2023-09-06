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

namespace app\dict\member;

use core\dict\DictLoader;

/**
 * 会员账户变动类型
 * Class MemberAccountTypeDict
 * @package app\dict\member
 */
class MemberAccountChangeTypeDict
{

    /**
     * 获取账户变动方式
     * @param string $type
     * @return array|mixed|string
     */
    public static function getType($type = '')
    {
        $account_change_type = (new DictLoader("MemberAccountChangeType"))->load();
        if (empty($type)) {
            return $account_change_type;
        }
        return $account_change_type[$type] ?? '';
    }

}