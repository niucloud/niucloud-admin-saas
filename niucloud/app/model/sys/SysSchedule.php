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

use app\dict\schedule\ScheduleDict;
use core\base\BaseModel;
use think\db\Query;

/**
 * 定时任务模型
 */
class SysSchedule extends BaseModel
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
    protected $name = 'sys_schedule';

    protected $type = [
        'last_time' => 'timestamp',
        'next_time' => 'timestamp',
        'update_time' => 'timestamp',
    ];

    // 设置json类型字段
    protected $json = ['time'];
    // 设置JSON数据返回数组
    protected $jsonAssoc = true;


    /**
     * 启用状态
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        if (empty($data['status'])) return '';
        return ScheduleDict::getStatus()[$data['status']] ?? '';
    }

    /**
     * 任务类型搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchKeyAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->where('key', $value);
        }
    }

    /**
     * 状态搜索
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchStatusAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->where('status', $value);
        }
    }


    /**
     * 执行时间搜索器
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchLastTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('last_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['last_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['last_time', '<=', $end_time]]);
        }
    }

}
