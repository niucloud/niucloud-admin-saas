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

namespace app\adminapi\controller\sys;

use app\dict\schedule\ScheduleDict;
use app\service\admin\schedule\ScheduleService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 自动任务
 */
class Schedule extends BaseAdminController
{
    /**
     * 任务列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['key', ''],
            ['status', ''],
        ]);
        return success(data: (new ScheduleService())->getPage($data));

    }

    /**
     * 计划任务模板
     * @return Response
     */
    public function template()
    {
        return success(data: (new ScheduleService())->getTemplateList());
    }

    /**
     * 获取任务模式
     * @return Response
     */
    public function getType()
    {
        return success(data: ScheduleDict::getType());
    }

    /**
     * 详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new ScheduleService())->getInfo($id));
    }

    /**
     * 添加
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            ['key', ''],
            ['time', []],
            ['status', ScheduleDict::OFF],
        ]);
        $this->validate($data, 'app\validate\sys\Schedule.add');
        (new ScheduleService())->add($data);
        return success('ADD_SUCCESS');
    }

    /**
     * 编辑
     * @param int $id
     * @return Response
     */
    public function edit(int $id)
    {
        $data = $this->request->params([
//            [ 'key', '' ],
            ['time', []],
            ['status', ScheduleDict::OFF],
        ]);
        (new ScheduleService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 启用或关闭
     * @param int $id
     * @return Response
     */
    public function modifyStatus(int $id)
    {
        $data = $this->request->params([
            ['status', ScheduleDict::OFF],
        ]);
        (new ScheduleService())->modifyStatus($id, $data['status']);
        return success('EDIT_SUCCESS');
    }

    /**
     * 删除
     * @param int $id
     * @return Response
     */
    public function del(int $id)
    {
        (new ScheduleService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 时间间隔类型
     * @return Response
     */
    public function getDateType()
    {
        return success(data: ScheduleDict::getDateType());
    }
}
