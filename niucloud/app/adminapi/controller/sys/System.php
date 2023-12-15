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
use think\Response;

/**
 * 系统信息查询
 * Class System
 * @package app\adminapi\controller\sys
 */
class System extends BaseAdminController
{
    /**
     * 获取当前系统信息
     * @return Response
     */
    public function info()
    {
        return success((new SystemService())->getInfo());
    }

    /**
     * 获取当前url配置
     * @return Response
     */
    public function url()
    {
        return success((new SystemService())->getUrl());
    }

    /**
     * 获取系统环境配置
     * @return Response
     */
    public function getSystemInfo()
    {
        return success((new SystemService())->getSystemInfo());
    }

    /**
     * 清理缓存，更新菜单
     */
    public function schemaCache()
    {

        return success((new SystemService())->schemaCache());
    }

    /**
     * 校验消息队列是否正常运行
     * @return Response
     */
    public function checkJob()
    {
        return success(data: (new SystemService())->checkJob());
    }

    /**
     * 校验计划任务是否正常运行
     * @return Response
     */
    public function checkSchedule()
    {
        return success(data: (new SystemService())->checkSchedule());
    }

    /**
     * 获取布局
     * @return Response
     */
    public function layout() {
        $layouts = event('SiteLayout');
        if (count($layouts) > 1) {
            array_multisort(array_column($layouts, 'sort'), SORT_ASC, $layouts);
        }
        return success($layouts);
    }

    /**
     *
     * 设置布局
     * @return Response
     */
    public function setLayout(){
        $key = input('key', '');
        return success(data: (new SystemService())->setLayout($key));
    }

    /**
     * 环境变量查询
     * @return Response
     */
    public function getEnvInfo()
    {
        return success(['app_debug' => env('app_debug', false)]);
    }
}
