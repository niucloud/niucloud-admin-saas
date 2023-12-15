import request from '@/utils/request'

/**
 * 支付
 */
export function pay(data : AnyObject) {
    return request.post(`pay`, data, { showErrorMessage: true })
}

/**
 * 获取支付信息
 */
export function getPayInfo(tradeType : string, tradeId : number) {
    return request.get(`pay/info/${tradeType}/${tradeId}`, {}, { showErrorMessage: true })
}