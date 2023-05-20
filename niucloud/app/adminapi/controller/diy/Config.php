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

namespace app\adminapi\controller\diy;

use app\service\admin\diy\DiyConfigService;
use core\base\BaseAdminController;


/**
 * 自定义配置相关
 * Class Config
 * @package app\adminapi\controller\diy
 */
class Config extends BaseAdminController
{
    /**
     * 获取底部导航
     * @return \think\Response
     */
    public function getBottom()
    {
        return success(( new DiyConfigService() )->getBottomConfig());
    }

    /**
     * 设置底部导航
     * @return \think\Response
     */
    public function setBottom()
    {
        $data = $this->request->params([
            [ 'menu', [] ]
        ]);
        ( new DiyConfigService() )->setBottomConfig($data[ 'menu' ]);
        return success('SUCCESS');
    }

}
