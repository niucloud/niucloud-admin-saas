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

use app\adminapi\controller\BaseAdminController;
use app\service\admin\file\UploadService;
use app\service\admin\site\WebSiteConfigService;
use app\service\admin\wechat\WechatConfigService;
use think\Response;

class Config extends BaseAdminController
{
    /**
     * 获取微信配置信息
     * @return Response
     */
    public function get(){
        return success((new WechatConfigService())->getWechatConfig());
    }

    /**
     * 设置微信配置信息
     * @return Response
     */
    public function set(){
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
        return success(100016);
    }

    /**
     * 获取微信静态资源
     * @return Response
     */
    public function static(){
        return success((new WechatConfigService())->getWechatStaticInfo());
    }

    /**
     * 文件上传(默认不上云)
     * @return Response
     */
    public function document(){
        $data = $this->request->params([
            ['file', 'file'],
        ], true);
        $upload_service = new UploadService();
        return success($upload_service->document($data['file'], true));
    }

}
