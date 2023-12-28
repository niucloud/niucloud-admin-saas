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

namespace app\adminapi\controller\niucloud;

use app\service\core\niucloud\CoreCloudBuildService;
use core\base\BaseAdminController;

class Cloud extends BaseAdminController
{
    /**
     * 云编译
     * @return \think\Response
     */
    public function build() {
        return success(data:(new CoreCloudBuildService())->cloudBuild());
    }

    /**
     * 获取云编译日志
     * @return \think\Response
     */
    public function getBuildLog() {
        return success(data:(new CoreCloudBuildService())->getBuildLog());
    }

    /**
     * 获取云编译任务
     * @return \think\Response
     */
    public function getBuildTask() {
        return success(data:(new CoreCloudBuildService())->getBuildTask());
    }

    /**
     * 清除云编译任务
     * @return \think\Response
     */
    public function clearBuildTask() {
        return success(data:(new CoreCloudBuildService())->clearTask());
    }

    /**
     * 编译前环境检测
     * @return \think\Response
     */
    public function buildPreCheck() {
        return success(data:(new CoreCloudBuildService())->buildPreCheck());
    }
}
