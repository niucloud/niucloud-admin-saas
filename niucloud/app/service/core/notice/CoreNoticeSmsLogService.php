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

namespace app\service\core\notice;

use app\model\sys\SysNoticeSmsLog;
use core\base\BaseCoreService;

/**
 * 短信配置服务层
 * Class SmsService
 * @package app\service\admin\message
 */
class CoreNoticeSmsLogService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysNoticeSmsLog();
    }

    /**
     * 获取短信发送记录列表
     * @param int $site_id
     * @param array $where
     * @return array
     */
    public function getPage(int $site_id, array $where = [])
    {
        $field = 'id,mobile,sms_type,key,template_id,content,params,status,result,create_time,send_time,update_time';
        $order = 'create_time desc';
        $search_model = $this->model->where([['site_id', '=', $site_id]])->withSearch(['name', 'key', 'mobile', 'sms_type'], $where)->field($field)->order($order)->append(['name', 'sms_type_name', 'status_name']);
        return $this->pageQuery($search_model);
    }


    /**
     * 获取短信发送记录信息
     * @param int $site_id
     * @param int $id
     * @return array
     */
    public function getInfo(int $site_id, int $id)
    {
        $field = 'id, mobile,sms_type,key,template_id,content,params,status,result,create_time,send_time,update_time';
        return $this->model->field($field)->where([['id', '=', $id], ['site_id', '=', $site_id]])->append(['name', 'sms_type_name', 'status_name'])->findOrEmpty()->toArray();
    }

    /**
     * 添加短信发送记录
     * @param int $site_id
     * @param array $data
     * @return mixed|null
     */
    public function add(int $site_id, array $data)
    {
        $data['site_id'] = $site_id;
        $log = $this->model->create($data);
        return $log?->id;

    }

    /**
     * 短信发送记录编辑
     * @param int $site_id
     * @param int $id
     * @param array $data
     * @return true
     */
    public function edit(int $site_id, int $id, array $data)
    {
        $data['update_time'] = time();
        $this->model->where([['id', '=', $id], ['site_id', '=', $site_id]])->update($data);
        return true;
    }

    /**
     * 删除短信发送记录
     * @param int $site_id
     * @param int $id
     * @return bool
     */
    public function del(int $site_id, int $id)
    {
        return $this->model->where([['id', '=', $id], ['site_id', '=', $site_id]])->delete();
    }


}