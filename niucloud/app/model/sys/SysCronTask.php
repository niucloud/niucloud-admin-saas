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

use app\dict\sys\CronDict;
use core\base\BaseModel;
use think\db\Query;

/**
 * 定时任务模型
 * Class SysArea
 * @package app\model\sys
 */
class SysCronTask extends BaseModel
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
    protected $name = 'sys_cron_task';

    protected $type = [
        'last_time'  =>  'timestamp',
        'next_time'  =>  'timestamp',
        'update_time'  =>  'timestamp',
    ];

    // 设置json类型字段
    protected $json = ['data'];
    // 设置JSON数据返回数组
    protected $jsonAssoc = true;
    /**
     * 任务模式
     * @param $value
     * @return mixed
     */
    public function getTypeNameAttr($value, $data)
    {
        return CronDict::getType()[$data['type'] ?? ''] ?? '';
    }

    /**
     * 任务周期
     * @param $value
     * @return mixed
     */
    public function getCrondTypeNameAttr($value, $data)
    {
        return CronDict::getCrondType()[$data['crond_type'] ?? ''] ?? '';
    }
    /**
     * 任务名称搜索器
     * @param $value
     */
    public function searchTitleAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->whereLike('title', '%'.$value.'%');
        }
    }

    /**
     * 任务类型搜索器
     * @param $value
     */
    public function searchTypeAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->where('type', $value);
        }
    }

    /**
     * 执行时间搜索器
     * @param $value
     */
    public function searchLastTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]) ;
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]) ;
        if($start_time > 0 && $end_time > 0){
            $query->whereBetweenTime('last_time', $start_time, $end_time);
        }else if($start_time > 0 && $end_time == 0){
            $query->where([['last_time', '>=', $start_time]]);
        }else if($start_time == 0 && $end_time > 0){
            $query->where([['last_time', '<=', $end_time]]);
        }
    }

}
