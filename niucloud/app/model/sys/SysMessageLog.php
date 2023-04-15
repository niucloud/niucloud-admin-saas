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

use app\enum\sys\MessageEnum;
use app\enum\sys\MessageTypeEnum;
use app\model\BaseModel;
use think\db\Query;

/**
 * 系统消息发送记录
 * Class SysMessageLog
 * @package app\model\sys
 */
class SysMessageLog extends BaseModel
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
    protected $name = 'sys_message_log';

    protected $type = [
        'send_time'  =>  'timestamp',
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
    public function getContentAttr($value,$data)
    {
        $temp = json_decode($value);
        if(!$temp){
            $temp = $value;
        }
        return  $temp;
    }
    /**
     * 名称
     * @param $value
     * @param $data
     * @return string
     */
    public function getNameAttr($value,$data)
    {
        $temp = MessageEnum::getMessage()[$data['key'] ?? ''] ?? '';
        return  $temp['name'] ?? '';
    }

    /**
     * 名称
     * @param $value
     * @param $data
     * @return string
     */
    public function getMessageTypeNameAttr($value,$data)
    {
        $temp = MessageTypeEnum::getType()[$data['message_type'] ?? ''] ?? '';
        return  $temp['name'] ?? '';
    }
    /**
     * 消息类型
     * @param $value
     * @return mixed
     */
    public function searchKeyAttr($query, $value)
    {
        if ($value) {
            $query->where('key', $value);
        }
    }

    /**
     * 接收人
     * @param $value
     * @return mixed
     */
    public function searchReceiverAttr($query, $value)
    {
        if ($value) {
            $query->where('receiver', $value);
        }
    }

    /**
     * 创建时间搜索器
     * @param $value
     */
    public function searchCreateTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]) ;
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]) ;
        if($start_time > 0 && $end_time > 0){
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        }else if($start_time > 0 && $end_time == 0){
            $query->where([['create_time', '>=', $start_time]]);
        }else if($start_time == 0 && $end_time > 0){
            $query->where([['create_time', '<=', $end_time]]);
        }
    }

}
