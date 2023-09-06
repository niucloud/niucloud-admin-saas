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

use app\service\admin\wechat\WechatConfigService;
use core\base\BaseAdminController;
use think\Response;

class Config extends BaseAdminController
{
    /**
     * 获取微信配置信息
     * @return Response
     */
    public function get()
    {
        return success((new WechatConfigService())->getWechatConfig());
    }

    /**
     * 设置微信配置信息
     * @return Response
     */
    public function set()
    {
        $data = $this->request->params([
            ['wechat_name', ''],
            ['wechat_original', ''],
            ['app_id', ''],
            ['app_secret', ''],
            ['token', ''],
            ['encoding_aes_key', ''],
            ['qr_code', ''],
            ['encryption_type', '']
        ]);
        $this->validate($data, 'app\validate\channel\Wechat.set');
        (new WechatConfigService())->setWechatConfig($data);
        return success('SET_SUCCESS');
    }

    /**
     * 获取微信静态资源
     * @return Response
     */
    public function static()
    {
        return success((new WechatConfigService())->getWechatStaticInfo());
    }

}
