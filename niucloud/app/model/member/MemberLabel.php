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

    /**
     * 获取对应标签的会员数量
     * @param $value
     * @return mixed
     */
    public function getMemberNumAttr($value, $data)
    {
        if(isset($data['label_id']))
        {
            return (new Member())->where([['member_label', 'like', '%"' . $data['label_id'] . '"%' ]])->count();
        }else
            return 0;
    }

    /**
     * 会员标签
     * @param $value
     * @param $data
     */
    public function searchLabelNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('label_name','like', '%'.$value.'%');
        }
    }

}
