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
     * @return mixed
     */
    public function getPage(int $site_id, array $where = [])
    {

        $field = 'mobile, sms_type, key, content, data, status, result, create_time, send_time, update_time';
        $order = 'create_time desc';
        $search_model = $this->model->where([['site_id', '=', $site_id]])->withSearch(['name'], $where)->field($field)->order($order)->append(['name', 'app_type_name', 'status_name']);
        $list = $this->pageQuery($search_model);
        return $list;
    }



    /**
     * 获取短信发送记录信息
     * @param int $id
     */
    public function getInfo(int $site_id, int $id)
    {
        $field = 'mobile, sms_type, key, content, data, status, result, create_time, send_time, update_time';
        $info = $this->model->field($field)->where([['id', '=', $id], ['site_id', '=', $site_id]])->findOrEmpty()->append(['name', 'app_type_name', 'status_name'])->toArray();
        return $info;
    }

    /**
     * 添加短信发送记录
     * @param int $site_id
     * @param array $data
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
     */
    public function edit(int $site_id, int $id, array $data)
    {
        $data['update_time'] = time();
        $this->model->where([['id', '=', $id], ['site_id', '=', $site_id]])->update($data);
        return true;
    }

    /**
     * 删除短信发送记录
     * @param int $id
     */
    public function del(int $site_id, int $id)
    {
        $res = $this->model->where([['id', '=', $id], ['site_id', '=', $site_id]])->delete();
        return $res;
    }


}