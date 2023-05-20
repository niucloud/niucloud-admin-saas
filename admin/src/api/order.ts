import request from '@/utils/request'

/***************************************************** 充值订单 ****************************************************/

/**
 * 获取充值订单列表
 * @param params
 * @returns
 */
export function getRechargeOrderList(params: Record<string, any>) {
    return request.get(`order/recharge`, { params })
}

/**
 * 获取充值订单详情
 * @param order_id
 * @returns
 */
export function getRechargeOrderInfo(order_id: number) {
    return request.get(`order/recharge/${order_id}`);
}
 
/**
 * 获取充值订单状态列表
 * @returns
 */
export function getRechargeOrderStatusList() {
    return request.get(`order/recharge/status`)
}

/**
 * 获取退款记录
 * @returns
 */
export function getRefund(params: Record<string, any>) {
    return request.get(`refund/refund`, { params })
}

/**
 * 获取退款状态
 * @returns
 */
export function getRefundStatus() {
    return request.get(`refund/status`)
}

/**
* 充值订单发起退款
 * @returns
 */
export function rechargeRefund(id) {
    return request.get(`order/recharge/refund/${id}`);
}