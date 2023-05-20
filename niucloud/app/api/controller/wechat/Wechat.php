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

namespace app\api\controller\wechat;

use app\service\api\wechat\WechatAuthService;
use core\base\BaseController;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use think\Response;

class Wechat extends BaseController
{

    //todo  csrf  验证也需要
    /**
     * 获取跳转获取code
     * @return Response
     * @throws InvalidArgumentException
     */
    public function getCodeUrl(){
        $data = $this->request->params([
            ['url', ''],
            ['scopes', '']
        ]);
        $wechat_auth_service = new WechatAuthService();
        return success($wechat_auth_service->authorization($data['url'], $data['scopes']));
    }

    /**
     * 授权登录
     * @return void
     */
    public function login(){
        $data = $this->request->params([
            ['code', ''],
        ]);
        $wechat_auth_service = new WechatAuthService();
        return success($wechat_auth_service->loginByCode($data['code']));
    }

    /**
     * 注册
     * @return Response
     * @throws InvalidArgumentException
     */
    public function register(){
        $data = $this->request->params([
            ['openid', ''],
            ['mobile', ''],
        ]);
        //参数验证
        $this->validate($data, [
            'mobile' => 'mobile'
        ]);
        $wechat_auth_service = new WechatAuthService();
        return success($wechat_auth_service->register($data['openid'], $data['mobile']));
    }

    /**
     * 同步
     * @return Response
     * @throws InvalidArgumentException
     */
    public function sync(){
        $data = $this->request->params([
            ['code', ''],
        ]);
        $wechat_auth_service = new WechatAuthService();
        return success($wechat_auth_service->sync($data['code']));
    }

    /**
     * 获取jssdk config
     * @return Response
     */
    public function jssdkConfig(){
        $data = $this->request->params([
            ['url', ''],
        ]);
        $wechat_auth_service = new WechatAuthService();
        return success($wechat_auth_service->jssdkConfig($data['url']));
    }

    /**
     * 扫码登录
     * @return void
     */
    public function scanLogin(){
        $wechat_auth_service = new WechatAuthService();
        return success($wechat_auth_service->scanLogin());

    }
}
