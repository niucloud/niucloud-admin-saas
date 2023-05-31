import request from '@/utils/request'

/**
 * 获取微信小程序配置
 * @returns 
 */
export function getWeappConfig() {
    return request.get('weapp/config')
}

/**
 * 编辑微信小程序配置
 * @param params 
 * @returns 
 */
export function setWeappConfig(params: Record<string, any>) {
    return request.put('weapp/config', params, { showSuccessMessage: true })
}

/**
 * 获取订阅消息列表
 * @returns 
 */
export function getTemplateList() {
    return request.get('weapp/template')
}

/**
 * 获取同步
 * @param params 
 * @returns 
 */
export function getBatchAcquisition(params: Record<string, any>) {
    return request.put('weapp/template/sync', params, { showSuccessMessage: true })
}
