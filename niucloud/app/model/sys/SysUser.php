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

use app\enum\sys\UserEnum;
use app\model\BaseModel;
use think\db\Query;
use think\model\concern\SoftDelete;

/**
 * 系统用户模型
 * Class SysUser
 * @package app\model\sys
 */
class SysUser extends BaseModel
{

    use SoftDelete;

    protected $type = [
        'last_time'  =>  'timestamp',
    ];
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'uid';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'sys_user';
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

    public function userrole()
    {
        return $this->hasOne(SysUserRole::class, 'uid', 'uid')->joinType('inner');
    }

    /**
     * 权限组
     * @return mixed
     */
    public function roles()
    {
        return $this->hasMany(SysUserRole::class, 'uid', 'uid');
    }

    /**
     * 状态字段转化
     * @param $value
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        return UserEnum::getStatus()[$data['status'] ?? ''] ?? '';
    }

    /**
     * 账号搜索器
     * @param $value
     */
    public function searchUsernameAttr($query, $value)
    {
        if ($value) {
            $query->whereLike('username', '%'.$value.'%');
        }

    }

    /**
     * 用户实际姓名搜索器
     * @param $value
     */
    public function searchRealnameAttr($query, $value)
    {
        if ($value) {
            $query->whereLike('real_name', '%'.$value.'%');
        }

    }

    /**
     * 是否删除搜索器
     * @param $value
     */
    public function searchIsDelAttr($query)
    {
        $query->where('is_del', 0);
    }

    /**
     * 状态搜索器
     * @param $value
     */
    public function searchStatusAttr($query, $value)
    {
        $query->where('status', $value);
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
            $query->whereBetweenTime('sys_user.create_time', $start_time, $end_time);
        }else if($start_time > 0 && $end_time == 0){
            $query->where([['sys_user.create_time', '>=', $start_time]]);
        }else if($start_time == 0 && $end_time > 0){
            $query->where([['sys_user.create_time', '<=', $end_time]]);
        }
    }


}
