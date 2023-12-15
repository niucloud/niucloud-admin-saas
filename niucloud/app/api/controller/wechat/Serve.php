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

use app\service\api\wechat\WechatServeService;
use core\base\BaseController;
use EasyWeChat\Kernel\Exceptions\BadRequestException;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use EasyWeChat\Kernel\Exceptions\RuntimeException;
use ReflectionException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * 微信服务端通信以及网页授权
 */
class Serve extends BaseController
{

    /**
     * 接收消息并推送
     * @param $site_id
     * @return Response
     * @throws BadRequestException
     * @throws InvalidArgumentException
     * @throws RuntimeException
     * @throws ReflectionException
     * @throws Throwable
     */
    public function serve($site_id){

        return (new WechatServeService())->serve();
    }


}
