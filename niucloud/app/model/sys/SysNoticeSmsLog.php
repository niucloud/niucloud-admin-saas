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
use app\dict\sys\SmsDict;
use core\base\BaseModel;

/**
 * 系统短信消息发送记录
 * Class SysNoticeSmsLog
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
        'send_time' => 'timestamp',
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
    public function getResultAttr($value, $data)
    {
        if ($value) {
            $temp = json_decode($value, true);
        }
        if (empty($temp)) {
            $temp = $value;
        }
        return $temp ?? '';
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
     * 状态名称
     * @param $value
     * @param $data
     * @return string
     */
    public function getStatusNameAttr($value, $data)
    {
        $name = '';
        if (!empty($data['status'])) {
            $name = SmsDict::getStatusType()[$data['status']] ?? '';
        }
        return $name;
    }

    /**
     * 短信方式名称
     * @param $value
     * @param $data
     * @return string
     */
    public function getSmsTypesNameAttr($value, $data)
    {
        if (empty($data['sms_type'])) return '';
        $temp = SmsDict::getType()[$data['sms_type']] ?? [];
        return $temp['name'] ?? '';
    }

    /**
     * 消息标识
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
     * 短信方式
     * @param $query
     * @param $value
     * @return void
     */
    public function searchSmsTypeAttr($query, $value)
    {
        if ($value) {
            $query->where('sms_type', $value);
        }
    }

    /**
     * 手机号
     * @param $query
     * @param $value
     * @return void
     */
    public function searchMobileAttr($query, $value)
    {
        if ($value) {
            $query->where('mobile', $value);
        }
    }


}
