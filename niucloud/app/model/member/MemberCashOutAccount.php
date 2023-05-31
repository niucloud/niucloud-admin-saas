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

namespace app\model\member;

use app\dict\pay\TransferDict;
use core\base\BaseModel;

/**
 * 会员提现账户
 */
class MemberCashOutAccount extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'account_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'member_cash_out_account';

    /**
     * 账户类型名称
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getAccountTypeNameAttr($value, $data){
        return TransferDict::getTransferType()[ $data[ 'transfer_type' ] ?? '' ] ?? '';
    }

    /**
     * 创建时间搜索器
     * @param $value
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]) ;
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]) ;
        if($start_time > 0 && $end_time > 0){
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        }else if($start_time > 0 && $end_time == 0){
            $query->where([['create_time', '>=', $start_time]]);
        }else if($start_time == 0 && $end_time > 0){
            $query->where([['create_time', '<=', $end_time]]);
        }
    }

}
