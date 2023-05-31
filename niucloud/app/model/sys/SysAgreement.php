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

namespace app\model\sys;

use app\dict\sys\AgreementDict;
use core\base\BaseModel;

/**
 * 系统协议模型
 * Class SysAgreement
 * @package app\model\sys
 */
class SysAgreement extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'sys_agreement';

    //设置只读字段
    protected $readonly = ['agreement_key'];


    /**
     * 字段转化
     * @param $value
     * @return mixed
     */
    public function getAgreementKeyNameAttr($value, $data)
    {
        return AgreementDict::getType()[$data['agreement_key'] ?? ''] ?? '';
    }
}
