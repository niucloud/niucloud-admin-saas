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

namespace app\api\controller\weapp;

use app\service\api\notice\NoticeService;
use app\service\api\weapp\WeappAuthService;
use core\base\BaseApiController;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use think\Response;

class Weapp extends BaseApiController
{

    /**
     * 授权登录
     * @return Response
     */
    public function login(){
        $data = $this->request->params([['code', '']]);
        $weapp_auth_service = new WeappAuthService();
        return success($weapp_auth_service->login($data['code']));
    }

    /**
     * 注册
     * @return Response
     */
    public function register(){
        $data = $this->request->params([
            ['openid', ''],
            ['mobile_code', ''],
            ['mobile', ''],
        ]);

        $weapp_auth_service = new WeappAuthService();
        return success($weapp_auth_service->register($data['openid'], $data['mobile'], $data['mobile_code']));
    }


    public function subscribeMessage(){
        $data = $this->request->params([ ['keys', ''] ]);
        return success((new NoticeService())->getWeappNoticeTemplateId($data['keys']));
    }
}
