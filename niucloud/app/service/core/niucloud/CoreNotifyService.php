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

namespace app\service\core\niucloud;

use app\service\admin\niucloud\NiucloudService;
use core\util\niucloud\BaseNiucloudClient;
use core\util\niucloud\http\Response;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Http\Message\ResponseInterface;

/**
 * 官网授权管理服务层
 */
class CoreNotifyService extends BaseNiucloudClient
{

    /**
     * 官网消息推送
     * @return void
     */
    public function notify(){
        //校验证书
        $this->validateSignature();
        $message = request()->param('Message');
        $message_type = request()->param('MsgType');
        switch($message_type){
            case 'auth':
                $this->setAccessToken($message['AccessToken']['token']);
                break;
        }
        return success();
    }



}