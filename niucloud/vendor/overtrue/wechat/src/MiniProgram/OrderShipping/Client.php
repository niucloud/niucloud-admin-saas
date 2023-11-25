<?php

/*
 * This file is part of the overtrue/wechat.
 *
 * (c) overtrue <i@overtrue.me>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace EasyWeChat\MiniProgram\OrderShipping;

use EasyWeChat\Kernel\BaseClient;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;

/**
 * 小程序发货信息管理服务
 * Class Client
 * @package EasyWeChat\MiniProgram\OrderShipping
 */
class Client extends BaseClient
{

    /**
     * 查询小程序是否已开通发货信息管理服务
     * 文档：https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/business-capabilities/order-shipping/order-shipping.html#七、查询小程序是否已开通发货信息管理服务
     * 返回结果：{"errcode":0,"errmsg":"ok","is_trade_managed":true}
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function isTradeManaged()
    {
        return $this->httpPostJson('wxa/sec/order/is_trade_managed', [ 'appid' => $this->app[ 'config' ]->app_id ]);
    }

    /**
     * 发货信息录入接口
     * 文档：https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/business-capabilities/order-shipping/order-shipping.html#一、发货信息录入接口
     * 用户交易后，默认资金将会进入冻结状态，开发者在发货后，需要在小程序平台录入相关发货信息，平台会将发货信息以消息的形式推送给购买的微信用户。
     * 如果你已经录入发货信息，在用户尚未确认收货的情况下可以通过该接口修改发货信息，但一个支付单只能更新一次发货信息，请谨慎操作。
     * 如暂时没有完成相关API的对接开发工作，你也可以登陆小程序的后台，通过发货信息管理页面手动录入发货信息。
     * 注意事项
     * 1、根据指定的订单单号类型，采用不同参数给指定订单上传物流信息：
     *      (1). 商户侧单号形式（枚举值1），通过下单商户号和商户侧单号确定一笔订单
     *      (2). 微信支付单号形式（枚举值2），通过微信支付单号确定一笔订单
     * 2、发货模式根据具体发货情况选择：
     *      (1). 统一发货（枚举值1），一笔订单统一发货，只有一个物流单号。
     *      (2). 分拆发货（枚举值2），一笔订单分拆发货，包括多个物流单号。
     * 3、物流公司编码，参见获取运力 id 列表get_delivery_list。
     *      https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/express/business/express_search.html#%E8%8E%B7%E5%8F%96%E8%BF%90%E5%8A%9Bid%E5%88%97%E8%A1%A8get-delivery-list
     * 4、上传时间，用于标识请求的先后顺序，如果要更新物流信息，上传时间必须比之前的请求更新，请按照 RFC 3339 格式填写。
     * 5、分拆发货仅支持使用物流快递发货，一笔支付单最多分拆成 10 个包裹。
     * 6、以下情况将视为重新发货，每笔支付单仅有一次重新发货机会。
     *      (1). 对已完成发货的支付单再次调用该 API。
     *      (2). 使用该 API 修改发货模式或物流模式。
     * @param array $params
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function uploadShippingInfo(array $params = [])
    {
        return $this->httpPostJson('wxa/sec/order/upload_shipping_info', $params);
    }

    /**
     * 发货信息合单录入接口
     * 文档：https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/business-capabilities/order-shipping/order-shipping.html#二、发货信息合单录入接口
     * 用户交易后，默认资金将会进入冻结状态，开发者在发货后，需要在小程序平台录入相关发货信息，平台会将发货信息以消息的形式推送给购买的微信用户。
     * 如果你已经录入发货信息，在用户尚未确认收货的情况下可以通过该接口修改发货信息，但一个支付单只能更新一次发货信息，请谨慎操作。
     * 如暂时没有完成相关API的对接开发工作，你也可以登陆小程序的后台，通过发货信息录入页面手动录入发货信息。
     * 注意事项
     * 1、根据指定的订单单号类型，采用不同参数给指定订单上传物流信息，注意子单和主单的订单单号类型必须一致：
     *      (1). 商户侧单号形式（枚举值1），通过下单商户号和商户侧单号确定一笔订单
     *      (2). 微信支付单号形式（枚举值2），通过微信支付单号确定一笔订单
     * 2、发货模式根据具体发货情况选择：
     *      (1). 统一发货（枚举值1），一笔订单统一发货，只有一个物流单号。
     *      (2). 分拆发货（枚举值2），一笔订单分拆发货，包括多个物流单号。
     * 3、物流公司编码，参见获取运力 id 列表get_delivery_list。
     * 4、上传时间，用于标识请求的先后顺序，如果要更新物流信息，上传时间必须比之前的请求更新，请按照RFC 3339格式填写。
     * 5、分拆发货仅支持使用物流快递发货，一笔支付单最多分拆成 10 个包裹。
     * 6、以下情况将视为重新发货，每笔支付单仅有一次重新发货机会。
     *      (1). 对已完成发货的支付单再次调用该 API。
     *      (2). 使用该 API 修改发货模式或物流模式。
     * @param array $params
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function uploadCombinedShippingInfo(array $params = [])
    {
        return $this->httpPostJson('wxa/sec/order/upload_combined_shipping_info', $params);
    }

    /**
     * 查询订单发货状态
     * 你可以通过交易单号或商户号+商户单号来查询该支付单的发货状态。
     * 文档：https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/business-capabilities/order-shipping/order-shipping.html#三、查询订单发货状态
     * @param array $params
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function getOrder(array $params = [])
    {
        return $this->httpPostJson('wxa/sec/order/get_order', $params);
    }

    /**
     * 查询订单列表
     * 你可以通过支付时间、支付者openid或订单状态来查询订单列表。
     * 文档：https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/business-capabilities/order-shipping/order-shipping.html#四、查询订单列表
     * @param array $params
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function getOrderList(array $params = [])
    {
        return $this->httpPostJson('wxa/sec/order/get_order_list', $params);
    }

    /**
     * 确认收货提醒接口
     * 文档：https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/business-capabilities/order-shipping/order-shipping.html#五、确认收货提醒接口
     * 如你已经从你的快递物流服务方获知到用户已经签收相关商品，可以通过该接口提醒用户及时确认收货，以提高资金结算效率，每个订单仅可调用一次。
     * 注意事项
     * 1、通过交易单号或商户号+商户单号来指定订单。
     * 2、只有物流类型为物流快递时才能进行提醒。
     * 3、签收时间由商户传入，在给用户发送提醒消息时会显示签收时间，签收时间必须在发货时间之后。
     * @param array $params
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function notifyConfirmReceive(array $params = [])
    {
        return $this->httpPostJson('wxa/sec/order/notify_confirm_receive', $params);
    }

    /**
     * 消息跳转路径设置接口
     * 如你已经在小程序内接入平台提供的确认收货组件，可以通过该接口设置发货消息及确认收货消息的跳转动作，用户点击发货消息时会直接进入你的小程序订单列表页面或详情页面进行确认收货，进一步优化用户体验。
     * 注意事项
     * 1、如设置为空路径或小程序中不存在的路径，将仍然跳转平台默认的确认收货页面，不会进入你的小程序。
     * 2、平台会在路径后面增加支付单的 transaction_id、merchant_id、merchant_trade_no 作为query参数，如果存在二级商户号则还会再增加 sub_merchant_id 参数,开发者可以在小程序中通过onLaunch等方式获取。
     * 3、如你需要在path中携带自定义的query参数，请注意与上面的参数进行区分
     * @param string $path 商户自定义跳转路径
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function setMsgJumpPath($path)
    {
        return $this->httpPostJson('wxa/sec/order/set_msg_jump_path', [ 'path' => $path ]);
    }

    /**
     * 获取物流公司，运力id列表get_delivery_list
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function getDeliveryList()
    {
        return $this->httpPostJson('cgi-bin/express/delivery/open_msg/get_delivery_list');
    }

}
