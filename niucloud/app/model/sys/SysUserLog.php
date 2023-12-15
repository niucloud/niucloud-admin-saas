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

use core\base\BaseModel;
use think\db\Query;

/**
 * 系统用户日志模型
 * Class SysUserLog
 * @package app\model\sys
 */
class SysUserLog extends BaseModel
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
    protected $name = 'sys_user_log';


    // 设置json类型字段
    protected $json = ['params'];

    protected $jsonAssoc = true;

    /**
     * 用户id搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchUidAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->where('uid', $value);
        }
    }

    /**
     * 用户名搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchUsernameAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->whereLike('username', '%' . $value . '%');
        }
    }

    /**
     * 请求方式搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchTypeAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->where('type', $value);
        }
    }

    /**
     * 链接搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchUrlAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->whereLike('url', '%' . $value . '%');
        }
    }

    /**
     * ip搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchIpAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->whereLike('ip', '%' . $value . '%');
        }
    }

    /**
     * 创建时间搜索器
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
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

}
