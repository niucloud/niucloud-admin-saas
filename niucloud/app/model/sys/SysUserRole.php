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

use app\dict\sys\UserDict;
use app\model\site\Site;
use core\base\BaseModel;
use think\model\relation\HasOne;

/**
 * 用户角色模型
 * Class SysUserRole
 * @package app\model\sys
 */
class SysUserRole extends BaseModel
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
    protected $name = 'sys_user_role';

    // 设置json类型字段
    protected $json = ['role_ids'];
    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 关联查询用户信息
     * @return HasOne
     */
    public function userinfo()
    {
        return $this->hasOne(SysUser::class, 'uid', 'uid')->joinType('inner')
            ->withField('uid,username,head_img,real_name,last_ip,last_time,login_count,create_time')
            ->bind(['username', 'head_img', 'real_name', 'last_ip', 'last_time', 'login_count']);
    }

    /**
     * 关联查询站点信息
     * @return HasOne
     */
    public function siteInfo()
    {
        return $this->hasOne(Site::class, 'site_id', 'site_id')->joinType('inner')
            ->withField('site_id, site_name, app_type, status, expire_time')
            ->bind(['site_name', 'app_type', 'status', 'expire_time', 'status_name'])->append(['status_name']);
    }

    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        if (!isset($data['status']) || empty($data['status'])) return '';
        return UserDict::getStatus()[$data['status']] ?? '';
    }
}
