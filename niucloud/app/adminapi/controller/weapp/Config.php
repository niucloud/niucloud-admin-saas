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

use app\service\admin\weapp\WeappConfigService;
use core\base\BaseAdminController;
use think\Response;

class Config extends BaseAdminController
{
    /**
     * 获取微信小程序配置信息
     * @return Response
     */
    public function get()
    {
        return success((new WeappConfigService())->getWeappConfig());
    }

    /**
     * 设置微信小程序配置信息
     * @return Response
     */
    public function set()
    {
        $data = $this->request->params([
            ['weapp_name', ''],
            ['weapp_original', ''],
            ['app_id', ''],
            ['app_secret', ''],
            ['token', ''],
            ['encoding_aes_key', ''],
            ['qr_code', ''],
            ['encryption_type', '']
        ]);
        $this->validate($data, 'app\validate\channel\Weapp.set');
        (new WeappConfigService())->setWeappConfig($data);
        return success('SET_SUCCESS');
    }


}
