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

namespace app\service\api\wechat;

use app\service\core\wechat\CoreWechatServeService;
use core\base\BaseApiService;
use EasyWeChat\Kernel\Exceptions\BadRequestException;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use EasyWeChat\Kernel\Exceptions\RuntimeException;
use Psr\Http\Message\ResponseInterface;
use ReflectionException;
use Throwable;

/**
 * 微信配置模型
 * Class WechatConfigService
 * @package app\service\core\wechat
 */
class WechatServeService extends BaseApiService
{

    public $core_wechat_serve_service;
    public function __construct()
    {
        parent::__construct();
        $this->core_wechat_serve_service = new CoreWechatServeService();
    }

    /**
     * 消息与时间推送
     * @return ResponseInterface
     * @throws BadRequestException
     * @throws InvalidArgumentException
     * @throws RuntimeException
     * @throws ReflectionException
     * @throws Throwable
     */
    public function serve(){
        return $this->core_wechat_serve_service->serve($this->site_id);
    }

}