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

use app\enum\sys\SmsEnum;
use core\base\BaseModel;

/**
 * 系统短信消息发送记录
 * Class SysMessageLog
 * @package app\model\sys
 */
class SysNoticeSmsLog extends BaseModel
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
    protected $name = 'sys_notice_sms_log';

    protected $type = [
        'send_time'  =>  'timestamp',
    ];

    // 设置json类型字段
    protected $json = ['params', 'result'];
    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 结果
     * @param $value
     * @param $data
     * @return string
     */
    public function getResultAttr($value,$data)
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
        $temp = \app\enum\notice\NoticeEnum::getNotice()[$data['key'] ?? ''];
        return  $temp['name'] ?? '';
    }

    /**
     * 状态名称
     * @param $value
     * @param $data
     * @return string
     */
    public function getStatusNameAttr($value,$data)
    {
        return SmsEnum::getStatusType()[$data['status'] ?? ''] ?? '';
    }

    /**
     * 短信方式名称
     * @param $value
     * @param $data
     * @return string
     */
    public function getSmsTypesNameAttr($value,$data)
    {
        $temp = SmsEnum::getType()[$data['sms_type'] ?? ''] ?? [];
        return $temp['name'] ?? '';
    }
    /**
     * 短信方式
     * @param $value
     * @return mixed
     */
    public function searchSmsTypeAttr($query, $value)
    {
        if ($value) {
            $query->where('sms_type', $value);
        }
    }

    /**
     * 手机号
     * @param $value
     * @return mixed
     */
    public function searchMobileAttr($query, $value)
    {
        if ($value) {
            $query->where('mobile', $value);
        }
    }


}
