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

use app\model\sys\SysNoticeLog;
use core\base\BaseCoreService;

/**
 * 短信配置服务层
 * Class SmsService
 * @package app\service\admin\message
 */
class CoreNoticeLogService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysNoticeLog();
    }

    /**
     * 新增消息记录
     * @param int $site_id
     * @param array $data
     * @return void
     */
    public function add(int $site_id, array $data){
        $data['site_id'] = $site_id;
        $notice_log = $this->model->create($data);
        return $notice_log?->id;
    }


    public function getPage(int $site_id, array $where){
        $field = 'id, site_id, key, notice_type, uid, member_id, nickname, receiver, is_click, is_visit, visit_time, create_time, params, content';
        $search_model = $this->model->where([['site_id', '=', $site_id]])->withSearch(['key','receiver', 'create_time'], $where)->field($field)->order('create_time desc')->append(['name', 'notice_type_name']);
        return $this->pageQuery($search_model);
    }

    public function getInfo(int $site_id, int $id){
        $field = 'id, site_id, key, notice_type, uid, member_id, nickname, receiver, is_click, is_visit, visit_time, create_time, params, content';
        return $this->model->where([['site_id', '=', $site_id], ['id', '=', $id]])->field($field)->append(['name', 'notice_type_name'])->findOrEmpty()->toArray();
    }
}