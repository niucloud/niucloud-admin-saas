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

use app\service\admin\wechat\WechatMenuService;
use core\base\BaseAdminController;

/**
 * 微信公众号管理菜单
 */
class Menu extends BaseAdminController
{

    /**
     * 菜单信息
     * @return void
     */
    public function info(){
        $wechat_menu_service = new WechatMenuService();
        return success($wechat_menu_service->getInfo());
    }

    /**
     * 设置菜单
     * @return void
     */
    public function edit(){
        $wechat_menu_service = new WechatMenuService();
        $data = $this->request->params([
            ['button', []]
        ]);
        $wechat_menu_service->edit($data['button']);
        return success('EDIT_SUCCESS');
    }
}
