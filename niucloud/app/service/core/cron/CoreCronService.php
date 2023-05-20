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

namespace app\service\core\cron;

use app\model\sys\SysCronTask;
use core\base\BaseCoreService;

/**
 * 计划任务服务层
 * Class CoreCronService
 * @package app\service\core\cron
 */
class CoreCronService extends BaseCoreService
{
    CONST CROND_LENGTH = 60;

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysCronTask();
    }

    public function add(int $site_id, array $data){
        $data['site_id'] = $site_id;
        return $this->model->create($data);
    }

    public function find(int $site_id, int $id){
        $where = array(
            ['site_id', '=', $site_id],
            ['id', '=', $id]
        );
        $cron = $this->model->where($where)->findOrEmpty();
        return $cron;
    }

    /**
     * 更新
     * @param $site_id
     * @param $id
     * @param $data
     * @return SysCronTask
     */
    public function edit(int $site_id, int $id, array $data){
        $where = array(
            ['site_id', '=', $site_id],
            ['id', '=', $id]
        );
        return $this->model->where($where)->update($data);
    }

    public function del(int $site_id, int $id){

    }
    public static function execute(){
        $now = time();
        $between = $now + 60;
        //查询未执行的任务
        $where = array(
            ['status', '=', 1],
            ['next_time', '<', $between]
        );
        $list = self::$model->where($where)->select()->toArray();
        if(!empty($list)){
            $job_handler_classname = 'app\job\sys\Cronexecute';

            foreach($list as $k => $v){
                $next_time = $v['next_time'];
                if($next_time < $now){
                    create_job($job_handler_classname, $v ?? []);
                }else{
                    create_job($job_handler_classname, $v ?? [], $next_time - time());
                }
            }
        }
        return true;
    }

    /**
     * 任务后续操作 根据任务的周期来计算下一次的任务
     * @param $data
     * @return void
     */
    public function after(array $data){
        $type = $data['cron'];
        $id = $data['id'];
        $site_id = $data['site_id'];
        $now = time();
        $next_time = $data['next_time'];
        $update_data = array(
            'last_time' => $next_time,
            'update_time' => $now
        );
        if($type == 'crond'){

            $crond_length = $data['crond_length'];
            //计算下次执行的时间
            switch ( $data[ 'crond_type' ] ) {
                case 'minute'://分

                    $execute_time = $next_time + $crond_length * 60;
                    break;
                case 1://天

                    $execute_time = strtotime('+' . $crond_length . 'day', $next_time);
                    break;
                case 2://周

                    $execute_time = strtotime('+' . $crond_length . 'week', $next_time);
                    break;
                case 3://月

                    $execute_time = strtotime('+' . $crond_length . 'month', $next_time);
                    break;
            }
            $update_data['next_time'] = $execute_time;
        }else{
            $update_data['delete_time'] = $now;
        }
        $this->edit($site_id, $id, $update_data);
    }



    /**
     * 获取自动任务列表
     * @param array $where
     * @return mixed
     */
    public function getPage(int $site_id, array $where)
    {
        $field = 'id, title, count, type, crond_type, crond_length, data, status_desc, last_time, next_time, create_time, delete_time, update_time, sort';
        $order = 'last_time desc';
        $search_model = $this->model->where('site_id', $site_id)->withSearch(['last_time', 'type', 'title'], $where)->field($field)->order($order)->append(['type_name', 'crond_type_name']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 任务详情
     * @param int $id
     * @return array
     */
    public function getInfo(int $site_id, int $id){
        $where = array(
            ['id', '=', $id],
            ['site_id', '=', $site_id]
        );
        $field = 'title, count, type, crond_type, crond_length, data, status_desc, last_time, next_time, create_time, delete_time, update_time, sort';
        $info = $this->model->where($where)->field($field)->findOrEmpty()->append(['type_name', 'crond_type_name'])->toArray();
        return $info;
    }
}