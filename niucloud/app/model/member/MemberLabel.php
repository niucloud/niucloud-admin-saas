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

use core\base\BaseModel;

/**
 * 会员标签模型
 * Class MemberLabel
 * @package app\model\member
 */
class MemberLabel extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'label_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'member_label';

}
