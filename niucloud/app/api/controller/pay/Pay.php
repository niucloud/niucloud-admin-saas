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

namespace app\api\controller\pay;

use app\service\api\pay\PayService;
use core\base\BaseApiController;

/**
 * 微信服务端通信以及网页授权
 */
class Pay extends BaseApiController
{

    /**
     * 接收消息并推送
     * @return void
     */
    public function notify($site_id, $channel, $type, $action)
    {
        return (new PayService())->notify($channel, $type, $action);
    }

    /**
     *  去支付
     * @return \think\Response
     */
    public function pay()
    {

        $data = $this->request->params([
            ['type', ''],
            ['out_trade_no', ''],
            ['quit_url', ''],
            ['buyer_id', ''],
            ['return_url', '']
        ]);

        return success('SUCCESS',(new PayService())->pay($data['type'], $data['out_trade_no'], $data['return_url'], $data['quit_url'], $data['buyer_id']));
    }

    public function info($out_trade_no)
    {

        return success((new PayService())->getInfoByOutTradeNo($out_trade_no));

    }
}
