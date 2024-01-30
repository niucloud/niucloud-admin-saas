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

namespace app\api\controller\diy;

use app\service\api\diy\DiyConfigService;
use app\service\api\diy\DiyRouteService;
use app\service\api\diy\DiyService;
use core\base\BaseApiController;
use think\Response;

class Diy extends BaseApiController
{

    /**
     * 自定义页面信息
     * @return Response
     */
    public function info()
    {
        $params = $this->request->params([
            [ 'id', '' ],
            [ 'name', '' ]
        ]);
        return success((new DiyService())->getInfo($params));
    }

    /**
     * 底部菜单信息
     * @return Response
     */
    public function tabbar()
    {
        $params = $this->request->params([
            [ 'key', 'app' ],
        ]);
        return success((new DiyConfigService())->getBottomConfig($params[ 'key' ]));
    }

    /**
     * 分享内容
     * @return Response
     */
    public function share()
    {
        $data = $this->request->params([
            [ 'route', '' ],
            [ 'params', '' ]
        ]);
        return success((new DiyRouteService())->getShare($data));
    }
}
