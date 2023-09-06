import request from '@/utils/request'

/**
 * 获取支付设置
 * @returns
 */
export function getUserInfo(type: string) {
    return request.get(`auth/get`)
}

/**
 * 配置支付
 * @returns
 */
export function setUserInfo(params: Record<string, any>) {
    return request.put(`auth/edit`, params, {showSuccessMessage: true});
}

