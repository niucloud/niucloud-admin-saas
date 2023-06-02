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

/**
 * 微信服务端通信以及网页授权
 */
class Serve extends BaseController
{

    /**
     * 接收消息并推送
     * @return void
     */
    public function serve($site_id){

        return (new WechatServeService())->serve();
    }


}
