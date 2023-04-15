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

namespace app\adminapi\controller\channel;

use app\adminapi\controller\BaseAdminController;
use app\service\admin\channel\H5Service;
use app\service\admin\file\UploadService;
use app\service\admin\site\WebSiteConfigService;
use app\service\admin\wechat\WechatConfigService;
use think\Response;

class H5 extends BaseAdminController
{
    /**
     * 获取H5配置信息
     * @return Response
     */
    public function get(){
        return success((new H5Service())->getH5());
    }

    /**
     * 设置H5配置信息
     * @return Response
     */
    public function set(){
        $data = $this->request->params([
            ['is_open', 0],
        ]);

        (new H5Service())->setH5($data);
        return success(100016);
    }
}
