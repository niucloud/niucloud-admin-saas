import request from '@/utils/request'

/**
 * 获取支付宝小程序配置
 * @returns 
 */
export function getAliappConfig() {
    return request.get('aliapp/config')
}

/**
 * 编辑支付宝小程序配置
 * @param params 
 * @returns 
 */
export function setAliappConfig(params: Record<string, any>) {
    return request.put('aliapp/config', params, { showSuccessMessage: true })
}

/**
 * 获取支付宝小程序静态资源
 * @returns 
 */
export function getAliappStatic() {
    return request.get('aliapp/static')
}
