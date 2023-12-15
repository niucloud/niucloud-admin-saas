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

namespace app\adminapi\controller\weapp;

use app\service\admin\weapp\WeappTemplateService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 微信小程序订阅消息
 */
class Template extends BaseAdminController
{

    /**
     * 订阅消息
     * @return Response
     */
    public function lists()
    {
        $wechat_template_service = new WeappTemplateService();
        return success($wechat_template_service->getList());
    }


    /**
     * 菜单信息
     * @return Response
     */
    public function sync()
    {
        $data = $this->request->params([
            ['keys', []]
        ]);
        $weapp_template_service = new WeappTemplateService();
        return success($weapp_template_service->syncAll($data['keys']));
    }

}
