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

namespace app\adminapi\controller\pay;

use app\dict\pay\PayDict;
use app\model\pay\PayConfigTemplate;
use app\service\admin\pay\PayChannelService;
use app\service\admin\pay\PayConfigTemplateService;
use core\base\BaseAdminController;
use think\Response;

class PayChannel extends BaseAdminController
{

    /**
     * 支付渠道设置
     * @return Response
     */
    public function set($channel, $type){
        $data = $this->request->params([
            ['is_default', 0],
            ['config', []],
            ['status', 0]
        ]);
        $data['config']['type'] = $type;
        $this->validate($data['config'], 'app\validate\pay\Pay.set');
        (new PayChannelService())->set($channel, $type, $data);
        return success('SET_SUCCESS');
    }


    /**
     * 支付渠道列表
     * @return Response
     */
    public function lists(){
         return success((new PayChannelService())->getChannelList());
    }

    /**
     * 通过渠道获取支付配置
     * @param $channel
     * @return Response
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getListByChannel($channel){
        return success((new PayChannelService())->getListByChannel($channel));
    }


    /**
     * 支付设置
     * @return Response
     */
    public function setTransfer(){
        $data = $this->request->params([
            ['wechatpay_config', []],
            ['alipay_config', []],
        ]);
        $this->validate(array_merge($data['wechatpay_config'], ['type' => PayDict::WECHATPAY]), 'app\validate\pay\Pay.set');
        $this->validate(array_merge($data['alipay_config'], ['type' => PayDict::ALIPAY]), 'app\validate\pay\Pay.set');
        (new PayChannelService())->setTransfer($data);
        return success('SET_SUCCESS');
    }

    /**
     * 多渠道支付设置
     * @return Response
     */
    public function setAll(){
        $data = $this->request->params([
            ['config', []],
        ]);
//        $this->validate(array_merge($data['wechatpay_config'], ['type' => PayDict::WECHATPAY]), 'app\validate\pay\Pay.set');
//        $this->validate(array_merge($data['alipay_config'], ['type' => PayDict::ALIPAY]), 'app\validate\pay\Pay.set');
        (new PayChannelService())->setAll($data['config']);
        return success('SET_SUCCESS');
    }
}
