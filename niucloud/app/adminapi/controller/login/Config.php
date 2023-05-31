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

namespace app\adminapi\controller\login;

use app\service\admin\auth\ConfigService;
use core\base\BaseAdminController;
use think\Response;


class Config extends BaseAdminController
{


    /**
     * 获取登录设置
     * @return Response
     */
    public function getConfig()
    {
        return success(( new ConfigService() )->getConfig());
    }

    /**
     * 注册与登录设置
     * @return Response
     */
    public function setConfig()
    {
        $data = $this->request->params([
            [ 'is_captcha', 0 ],
            [ 'is_site_captcha', 0 ],
            [ 'bg', '' ],
            [ 'site_bg', '' ],
        ]);
        ( new ConfigService() )->setConfig($data);
        return success('MODIFY_SUCCESS');
    }
}
