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
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Response;

/**
 * 微信服务端通信以及网页授权
 */
class Pay extends BaseApiController
{

    /**
     * 接收消息并推送
     * @return void|null
     */
    public function notify($site_id, $channel, $type, $action)
    {
        return (new PayService())->notify($channel, $type, $action);
    }

    /**
     *  去支付
     * @return Response
     */
    public function pay()
    {

        $data = $this->request->params([
            ['type', ''],
//            ['out_trade_no', ''],
            ['trade_type', ''],//业务类型
            ['trade_id', ''],//业务id
            ['quit_url', ''],
            ['buyer_id', ''],
            ['return_url', ''],
            ['voucher', '']
        ]);

        return success('SUCCESS',(new PayService())->pay($data['type'], $data['trade_type'], $data['trade_id'], $data['return_url'], $data['quit_url'], $data['buyer_id'], $data['voucher']));
    }

    public function info($trade_type, $trade_id)
    {
        return success((new PayService())->getInfoByTrade($trade_type, $trade_id));
    }

    /**
     * 获取可用的支付方法
     * @param $trade_type
     * @return Response
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getPayType($trade_type){
        return success((new PayService())->getPayTypeByTrade($trade_type));
    }
}
