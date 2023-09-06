import request from '@/utils/request'

/***************************************************** 充值订单 ****************************************************/

/**
 * 获取充值订单列表
 * @param params
 * @returns
 */
export function getRechargeOrderList(params: Record<string, any>) {
    return request.get(`order/recharge`, {params})
}

/**
 * 获取充值订单统计
 * @param params
 * @returns
 */
export function getRechargeStat(params: Record<string, any>) {
    return request.get(`order/recharge/stat`, {params})
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
export function getRechargeRefund(params: Record<string, any>) {
    return request.get(`order/recharge/refund`, {params})
}

/**
 * 获取退款状态
 * @returns
 */
export function getRechargeRefundStatus() {
    return request.get(`order/recharge/refund/status`)
}

/**
 * 充值订单发起退款
 * @returns
 */
export function rechargeRefund(id: number) {
    return request.put(`order/recharge/refund/${id}`, {}, {showSuccessMessage: true});
}

/**
 * 获取退款统计
 * @returns
 */
export function getRechargeRefundStat() {
    return request.get(`order/recharge/refund/stat`);
}