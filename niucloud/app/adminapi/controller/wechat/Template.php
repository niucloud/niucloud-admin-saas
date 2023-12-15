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

namespace app\adminapi\controller\wechat;

use app\service\admin\wechat\WechatTemplateService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 微信公众号管理菜单
 */
class Template extends BaseAdminController
{

    /**
     * 菜单信息
     * @return Response
     */
    public function sync()
    {
        $data = $this->request->params([
            ['keys', []]
        ]);
        $wechat_template_service = new WechatTemplateService();
        return success($wechat_template_service->syncAll($data['keys']));
    }

    /**
     * 模板消息
     * @return Response
     */
    public function lists()
    {
        $wechat_template_service = new WechatTemplateService();
        return success($wechat_template_service->getList());
    }


}
