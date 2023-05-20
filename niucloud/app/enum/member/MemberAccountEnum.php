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

namespace app\enum\member;

use core\util\ConfigUtil;

/**
 * 会员账户类型
 * Class MemberAccountEnum
 * @package app\enum\member
 */
class MemberAccountEnum
{
    //会员积分
    const POINT = 'point';
    //会员余额
    const BALANCE = 'balance';

    //会员可提现余额
    const MONEY = 'money';

    //会员佣金
    const COMMISSION = 'commission';

    //账户增加
    const INC = 'inc';

    //账户减少
    const DEC = 'dec';

    public static function getType($type = '')
    {
        $data = [
            self::POINT => get_lang('enum_member.account_point'),
            self::BALANCE => get_lang('enum_member.account_balance'),
            self::MONEY => get_lang('enum_member.account_money'),
            self::COMMISSION => get_lang('enum_member.account_commission'),
        ];
        if (empty($type)) {
            return $data;
        }
        return $data[ $type ] ?? '';
    }

    /**
     * 获取账户变动方式
     * @param string $type
     * @return array|mixed|string
     */
    public static function getFromType($type = '')
    {
        $type_util = new ConfigUtil(root_path() . str_replace('/', DIRECTORY_SEPARATOR, "app/enum/member/fromtypes"));
        $file_data = $type_util->loadFiles();
        $types = [];
        foreach ($file_data as $data) {
            $types = empty($types) ? $data : array_merge2($types, $data);
        }

        if (empty($type)) {
            return $types;
        }
        return $types[ $type ] ?? '';
    }

}