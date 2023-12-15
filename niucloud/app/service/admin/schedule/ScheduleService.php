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

namespace app\service\admin\schedule;


use app\service\core\schedule\CoreScheduleService;
use core\base\BaseAdminService;


/**
 * 计划任务服务层
 * Class CoreCronService
 * @package app\service\core\cron
 */
class ScheduleService extends BaseAdminService
{


    public function __construct()
    {
        parent::__construct();
    }


    /**
     * 获取自动任务列表
     * @param array $data
     * @return array
     */
    public function getPage(array $data = [])
    {
        return (new CoreScheduleService())->getPage($data);
    }

    /**
     * 获取信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id){
        return (new CoreScheduleService())->getInfo($id);
    }
    /**
     * 启用或关闭
     * @param int $id
     * @param $status
     * @return true
     */
    public function modifyStatus(int $id, $status)
    {
        return (new CoreScheduleService())->modifyStatus($id, $status);
    }

    /**
     * 添加
     * @param array $data
     * @return true
     */
    public function add(array $data)
    {
        $res = (new CoreScheduleService())->add($data);
        return true;

    }

    /**
     * 编辑
     * @param int $id
     * @param array $data
     * @return true
     */
    public function edit(int $id, array $data)
    {
        (new CoreScheduleService())->edit($id, $data);
        return true;
    }

    /**
     * 删除
     * @param int $id
     * @return true
     */
    public function del(int $id)
    {
        (new CoreScheduleService())->del($id);
        return true;
    }

    /**
     * 计划任务模板
     * @return array|null
     */
    public function getTemplateList(){
        return (new CoreScheduleService())->getTemplateList();
    }
}