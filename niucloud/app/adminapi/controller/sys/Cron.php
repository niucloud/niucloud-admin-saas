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

use app\adminapi\controller\BaseAdminController;
use app\enum\sys\CronEnum;
use app\service\admin\cron\CronService;

/**
 * 自动任务
 * Class System
 * @package app\adminapi\controller\sys
 */
class Cron extends BaseAdminController
{
    /**
     * 任务列表
     * @return \think\Response
     */
    public function lists(){
        $data = $this->request->params([
            ['last_time', []],
            ['type', ''],
            ['title', '']
        ]);
        $list = (new CronService())->getPage($data);
        return success($list);

    }

    /**
     * 任务详情
     * @param $id
     * @return Response
     */
    public function info($id){
        return success((new CronService())->getInfo($id));
    }

    /**
     * 获取任务模式
     * @return \think\Response
     */
    public function getType(){
        return success((new CronEnum())->getType());
    }
}
