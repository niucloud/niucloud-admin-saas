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

namespace app\adminapi\controller\aliapp;

use app\adminapi\controller\BaseAdminController;
use app\service\admin\aliapp\AliappConfigService;
use app\service\admin\site\WebSiteConfigService;
use think\Response;

class Config extends BaseAdminController
{
    /**
     * 获取支付宝配置信息
     * @return Response
     */
    public function get(){
        return success((new AliappConfigService())->getAliappConfig());
    }

    /**
     * 设置支付宝配置信息
     * @return Response
     */
    public function set(){
        $data = $this->request->params([
            ['name', ''],
            ['app_id', ''],
            ['private_key', ''],
            ['aes_key', ''],
            ['public_key_crt', ''],
            ['alipay_public_key_crt', ''],
            ['alipay_with_crt', ''],
            ['qrcode', '']
        ]);
//        $this->validate($data, 'app\validate\channel\Aliapp.set');
        (new AliappConfigService())->setAliappConfig($data);
        return success(100016);
    }

    /**
     * 静态资源
     * @return Response
     */
    public function static(){
        return success((new AliappConfigService())->static());
    }
}
