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

use app\service\admin\sys\SystemService;
use core\base\BaseAdminController;

/**
 * 系统信息查询
 * Class System
 * @package app\adminapi\controller\sys
 */
class System extends BaseAdminController
{
    /**
     * 获取当前系统信息
     * @return array|mixed
     */
    public function info()
    {
        return success((new SystemService())->getInfo());
    }

    /**
     * 获取当前url配置
     * @return array|mixed
     */
    public function url()
    {
        return success((new SystemService())->getUrl());
    }

    /**
     * 获取系统环境配置
     * @return \think\Response
     */
    public function getSystemInfo(){
        return success((new SystemService())->getSystemInfo());
    }

    /**
     * 清理缓存，更新菜单
     */
    public function schemaCache(){

        return success((new SystemService())->schemaCache());
    }

    /**
     * 校验消息队列是否正常运行
     * @return \think\Response
     */
    public function checkJob(){
        return success(data:(new SystemService())->checkJob());
    }

    /**
     * 校验计划任务是否正常运行
     * @return \think\Response
     */
    public function checkSchedule(){
        return success(data:(new SystemService())->checkSchedule());
    }
}
