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
use think\Response;


/**
 * 自定义配置相关
 * Class Config
 * @package app\adminapi\controller\diy
 */
class Config extends BaseAdminController
{
    /**
     * 获取底部导航列表
     * @return Response
     */
    public function getBottomList()
    {
        return success((new DiyConfigService())->getBottomList());
    }

    /**
     * 获取底部导航
     * @return Response
     */
    public function getBottomConfig()
    {
        $params = $this->request->params([
            [ 'key', 'app' ],
        ]);
        return success((new DiyConfigService())->getBottomConfig($params[ 'key' ]));
    }

    /**
     * 设置底部导航
     * @return Response
     */
    public function setBottomConfig()
    {
        $data = $this->request->params([
            [ 'value', [] ],
            [ 'key', 'app' ]
        ]);
        (new DiyConfigService())->setBottomConfig($data[ 'value' ], $data[ 'key' ]);
        return success();
    }

}
