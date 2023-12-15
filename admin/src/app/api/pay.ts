import request from '@/utils/request'

/***************************************************** 账单列表 **************************************************/

/**
 * 获取账单列表
 * @param params
 * @returns
 */
export function getAccountList(params: Record<string, any>) {
    return request.get(`pay/account`, {params})
}

/**
 * 获取账单详情
 * @param id
 */
export function getAccountInfo(id: number) {
    return request.get(`pay/account/${id}`)
}

/**
 * 获取账单统计
 * @returns
 */
export function getAccountStat() {
    return request.get(`pay/account/stat`)
}

/**
 * 获取账单类型
 * @returns
 */
export function getAccountType() {
    return request.get(`pay/account/type`)
}

/***************************************************** 退款信息 **************************************************/

/**
 * 退款列表
 * @param params
 * @returns
 */
export function getPayRefundPages(params: Record<string, any>) {
    return request.get(`pay/refund`, {params})
}

/**
 * 获取退款详情
 * @param id
 */
export function getPayRefundInfo(refund_no: string) {
    return request.get(`pay/refund/${refund_no}`)
}

/**
 * 退款方式
 * @param id
 */
export function getRefundType() {
    return request.get(`pay/refund/type`)
}

/**
 * 退款转账
 * @param id
 */
export function getRefundTransfer(params: Record<string, any>) {
    return request.post(`pay/refund/transfer`, params, {showSuccessMessage: true})
}