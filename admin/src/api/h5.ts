import request from '@/utils/request'

/**
 * 获取h5配置
 * @returns 
 */
export function getH5Config() {
    return request.get('channel/h5/config')
}

/**
 * 编辑h5配置
 * @param params 
 * @returns 
 */
export function setH5Config(params: Record<string, any>) {
    return request.put('channel/h5/config', params, { showErrorMessage: true, showSuccessMessage: true })
}
