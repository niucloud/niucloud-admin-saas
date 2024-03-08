import request from '@/utils/request'

/**
 * 获取pc配置
 * @returns
 */
export function getPcConfig() {
    return request.get('channel/pc/config')
}

/**
 * 编辑h5配置
 * @param params
 * @returns
 */
export function setPcConfig(params: Record<string, any>) {
    return request.put('channel/pc/config', params, {showSuccessMessage: true})
}
