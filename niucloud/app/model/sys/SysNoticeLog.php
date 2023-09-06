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

use app\dict\notice\NoticeDict;
use app\dict\notice\NoticeTypeDict;
use core\base\BaseModel;
use think\db\Query;

/**
 * 系统消息发送记录
 * Class SysMessageLog
 * @package app\model\sys
 */
class SysNoticeLog extends BaseModel
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
    protected $name = 'sys_notice_log';

    protected $type = [
        'send_time' => 'timestamp',
    ];

    // 设置json类型字段
    protected $json = ['params', 'content'];
    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 名称
     * @param $value
     * @param $data
     * @return string
     */
    public function getContentAttr($value, $data)
    {
        if ($value) {
            $temp = json_decode($value, true);
        }
        return $temp ?? $value;
    }

    /**
     * 名称
     * @param $value
     * @param $data
     * @return string
     */
    public function getNameAttr($value, $data)
    {
        $name = '';
        if (!empty($data['key'])) {
            $temp = NoticeDict::getNotice()[$data['key']] ?? [];
            $name = $temp['name'] ?? '';
        }
        return $name;
    }

    /**
     * 名称
     * @param $value
     * @param $data
     * @return string
     */
    public function getNoticeTypeNameAttr($value, $data)
    {
        $name = '';
        if (!empty($data['notice_type'])) {
            $temp = NoticeTypeDict::getType()[$data['notice_type']] ?? [];
            $name = $temp['name'] ?? '';
        }
        return $name;
    }

    /**
     * 消息类型
     * @param $query
     * @param $value
     * @return void
     */
    public function searchKeyAttr($query, $value)
    {
        if ($value) {
            $query->where('key', $value);
        }
    }

    /**
     * 接收人
     * @param $query
     * @param $value
     * @return void
     */
    public function searchReceiverAttr($query, $value)
    {
        if ($value) {
            $query->where('receiver', $value);
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

}
