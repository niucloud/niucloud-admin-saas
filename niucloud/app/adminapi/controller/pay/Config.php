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

namespace app\adminapi\controller\pay;

use app\adminapi\controller\BaseAdminController;
use app\service\admin\pay\PayConfigService;
use think\Response;

class Config extends BaseAdminController
{

    /**
     * 获取支付设置
     * @return Response
     */
    public function get($type){
        return success((new PayConfigService())->getConfigByType($type));
    }

    /**
     * 支付设置
     * @return Response
     */
    public function set($type){
        $data = $this->request->params([
            ['status', 0],
            //支付宝配置
            ['app_id', ''],
            ['app_secret_cert', ''],
            ['app_public_cert_path', ''],
            ['alipay_public_cert_path', ''],
            ['alipay_root_cert_path', ''],
            //微信配置
            ['mch_id', ''],
            ['mch_secret_key', ''],
            ['mch_secret_cert', ''],
            ['mch_public_cert_path', ''],

        ]);
        $this->validate(array_merge($data, ['type' => $type]), 'app\validate\pay\Pay.set');
        (new PayConfigService())->setConfigByType($type, $data);
        return success();
    }

    /**
     * 支付方式列表
     * @return Response
     */
    public function lists(){
         return success((new PayConfigService())->getPayConfigList());
    }


}
