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

namespace app\service\core\schedule;

use app\dict\sys\DateDict;
use app\model\sys\SysSchedule;
use core\base\BaseCoreService;
use core\dict\DictLoader;
use core\exception\CommonException;
use think\Container;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Log;
use think\helper\Str;
use think\Model;
use Throwable;

/**
 * 计划任务服务层
 */
class CoreScheduleService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysSchedule();
    }


    /**
     * 获取自动任务列表
     * @param array $where
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getList(array $where = [])
    {
        $field = 'id, addon, key, status, time, count, last_time, next_time, create_time, delete_time, update_time';
        $list = $this->model->withSearch(['key','status'],$where)->field($field)->order('id desc')->append(['status_name'])->select()->toArray();
        $template_list = array_column($this->getTemplateList(), null, 'key');
        foreach($list as &$item){
            $item = array_merge($template_list[$item['key']] ?? [], $item);
        }
        return $list;
    }

    /**
     * 任务分页列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id, addon, key, status, time, count, last_time, next_time, create_time, delete_time, update_time';
        $search_model = $this->model->withSearch(['key','status'],$where)->field($field)->order('id desc')->append(['status_name']);
        $template_list = array_column($this->getTemplateList(), null, 'key');
        return $this->pageQuery($search_model, function ($item, $key) use($template_list){
            $item['crontab_content'] = $this->getCrontabContent($item['time']);
            foreach($template_list[$item['key']] as $k => $v){
                if($k != 'time'){
                    $item->$k = $v;
                }
            }
        });
    }

    /**
     * 获取信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id, addon, key, status, time, count, last_time, next_time, create_time, delete_time, update_time';
        $info = $this->model->where([['id', '=', $id]])->field($field)->append(['status_name'])->findOrEmpty()->toArray();
        if(!empty($info)){
            $template_list = array_column($this->getTemplateList(), null, 'key');
            $info = array_merge($template_list[$info['key']], $info);
        }
        return $info;
    }

    /**
     * 计划任务模板
     * @return array|null
     */
    public function getTemplateList(string $addon = ''){
        $addon_load = new DictLoader('Schedule');
        return $addon_load->load([
            'addon' => $addon
        ]);
    }
    /**
     * 计划任务的时间间隔
     * @param $data
     * @return string
     */
    protected function getCrontabContent($data): string
    {
        $content = '';
        $type = $data['type'] ?? '';
        switch ($type) {
            case 'min':// 每隔几分
                $content = '每隔'.$data['min'].'分钟执行一次';
                break;
            case 'hour':// 每隔几时第几分钟执行
                $content = '每隔'.$data['hour'].'小时的'.$data['min'].'分执行一次';
                break;
            case 'day':// 每隔几日几时几分几秒执行
                $content = '每隔'.$data['day'].'天的'.$data['hour'].'时'.$data['min'].'分执行一次';
                break;
            case 'week':// 每周一次,周几具体时间执行
                $week_day = DateDict::getWeek()[$data['week']] ?? '';
                $content = '每周的'.$week_day.'的'.$data['hour'].'时'.$data['min'].'分执行一次';
                break;
            case 'month':// 每月一次,某日具体时间执行
                $content = '每月的'.$data['day'].'号的'.$data['hour'].'时'.$data['min'].'分执行一次';
                break;
        }
        return $content;
    }

    /**
     * 查询对象实例
     * @param int $id
     * @return SysSchedule|array|mixed|Model
     */
    public function find(int $id){
        return $this->model->findOrEmpty($id);
    }

    /**
     * 设置状态(启用和关闭)
     * @param int $id
     * @param $status
     * @return true
     */
    public function modifyStatus(int $id, $status){
        $schedule = $this->find($id);
        if($schedule->isEmpty()) throw new CommonException('SCHEDULE_NOT_EXISTS');
        $schedule->save([
            'status' => $status
        ]);
        return true;
    }


    /**
     * 添加任务
     * @param array $data
     * @return true
     */
    public function add(array $data)
    {
        $data[ 'create_time' ] = time();
        $this->model->create($data);
        return true;

    }

    /**
     * 任务编辑
     * @param int $id
     * @param array $data
     * @return true
     */
    public function edit(int $id, array $data)
    {
        $data[ 'update_time' ] = time();
        $this->model->where([ [ 'id', '=', $id ]])->update($data);
        return true;
    }

    /**
     * 删除任务
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        return $this->model->where([ [ 'id', '=', $id ]])->delete();
    }

    /**
     * 执行任务
     * @param array $schedule
     * @return true
     */
    public function execute(array $schedule){
        $class = $schedule['class'] ?: 'app\\job\\schedule\\'.Str::studly($schedule['key']);
        $function = $schedule['function'] ?: 'doJob';
        try {
            $result = Container::getInstance()->invoke([$class, $function ?? 'doJob']);
        }catch( Throwable $e){
            Log::write('计划任务:'.$schedule['name'].'发生错误, 错误原因:'.$e->getMessage());
        }
        $schedule = $this->find($schedule['id']);
        if(!$schedule->isEmpty()){
            $schedule->save([
                'last_time' => time(),
                'count' => $schedule['count'] + 1,
            ]);
        }
        return true;
    }
}