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

namespace app\listener\scan;

use app\dict\scan\ScanDict;
use app\service\api\wechat\WechatAuthService;
use Throwable;

/**
 * 支付异步回调事件
 * Class PayNotify
 * @package app\listener\pay
 */
class ScanListener
{
    public function handle(array $data)
    {
        $action = $data['action'];
        switch ($action) {
            case ScanDict::WECHAT_LOGIN:
                try {
                    $wechat_auth_service = new WechatAuthService();
                    $data['login_data'] = $wechat_auth_service->login($data['openid']);
                    $data['status'] = ScanDict::SUCCESS;
                } catch ( Throwable $e ) {
                    $data['status'] = ScanDict::FAIL;
                    $data['fail_reason'] = get_lang($e->getMessage());
                }
                unset($data['openid']);
                break;
        }

        return $data;
    }
}