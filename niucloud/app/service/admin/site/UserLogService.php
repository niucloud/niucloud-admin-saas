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

namespace app\service\admin\site;



use app\model\sys\SysUserLog;
use core\base\BaseAdminService;
use Exception;

/**
 * 操作日志
 * Class UserLogService
 * @package app\service\admin\site
 */
class UserLogService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
       $this->model = new SysUserLog();
    }

    /**
     * 获取用户日志
     * @param array $where
     * @return mixed
     */
    public function getPage(array $where)
    {
        $field = 'id, ip, site_id, uid, username, url, params, type, create_time';
        $order = 'create_time desc';
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(['username', 'create_time', 'uid', 'ip', 'type', 'url'], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 日志详情
     * @param int $id
     * @return array
     */
    public function getInfo(int $id){
        $where = array(
            ['id', '=', $id],
            ['site_id', '=', $this->site_id]
        );
        $field = 'id, ip, site_id, uid, username, url, params, type, create_time';
        $info = $this->model->where($where)->field($field)->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加用户（添加用户，不添加站点）
     * @param array $data
     * @return bool
     * @throws Exception
     */
    public function add(array $data){
        $data['site_id'] = $this->site_id;
        $res = $this->model->create($data);
        return $res->id;
    }
}