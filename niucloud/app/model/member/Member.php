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

use app\dict\common\ChannelDict;
use app\dict\common\CommonDict;
use app\dict\member\MemberDict;
use app\dict\member\MemberLoginTypeDict;
use app\dict\member\MemberRegisterChannelDict;
use app\dict\member\MemberRegisterTypeDict;
use core\base\BaseModel;
use think\db\Query;
use think\model\concern\SoftDelete;

/**
 * 会员模型
 * Class Member
 * @package app\model\member
 */
class Member extends BaseModel
{


    use SoftDelete;

    protected $type = [
        'last_visit_time' => 'timestamp',
        'login_time' => 'timestamp',
        'last_consum_time' => 'timestamp',
    ];
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'member_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'member';

    /**
     * 定义软删除标记字段
     * @var string
     */
    protected $deleteTime = 'delete_time';

    /**
     * 定义软删除字段的默认值
     * @var int
     */
    protected $defaultSoftDelete = 0;

    // 设置json类型字段
    protected $json = ['member_label'];
    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        if (empty($data['status']))
            return '';
        return MemberDict::getStatus()[$data['status']] ?? '';
    }

    /**
     * 注册来源字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getRegisterChannelNameAttr($value, $data)
    {
        if (empty($data['register_channel']))
            return '';
        return MemberRegisterChannelDict::getType()[$data['register_channel']] ?? '';
    }

    /**
     * 注册方式字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getRegisterTypeNameAttr($value, $data)
    {
        if (empty($data['register_type']))
            return '';
        return MemberRegisterTypeDict::getType()[$data['register_type']] ?? '';
    }

    /**
     * 登录渠道字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getLoginChannelNameAttr($value, $data)
    {
        if (empty($data['login_channel']))
            return '';
        return ChannelDict::getType()[$data['login_channel']] ?? '';
    }

    /**
     * 登录方式字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getLoginTypeNameAttr($value, $data)
    {
        if (empty($data['login_type']))
            return '';
        return MemberLoginTypeDict::getType()[$data['login_type']] ?? '';
    }

    /**
     * 性别名称
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getSexNameAttr($value, $data)
    {
        if (empty($data['sex']))
            return '';
        return CommonDict::getSexType()[$data['sex']] ?? '';
    }

    /**
     * 是否删除搜索器
     * @param $query
     */
    public function searchIsDelAttr($query)
    {
        $query->where('is_del', 0);
    }

    /**
     * 关键字搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchKeywordAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('member_no|username|nickname|mobile', 'like', '%' . $value . '%');
        }
    }


    /**
     * 注册方式搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchRegisterTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('register_type', '=', $value);
        }
    }

    /**
     * 注册渠道搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchRegisterChannelAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('register_channel', '=', $value);
        }
    }

    /**
     * 标签筛选
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchMemberLabelAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->whereLike('member_label', '%"' . $value . '"%');
        }
    }


    /**
     * 创建时间搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['create_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['create_time', '<=', $end_time]]);
        }
    }

    /**
     * 创建时间搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchJoinCreateTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('member.create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['member.create_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['member.create_time', '<=', $end_time]]);
        }
    }


}
