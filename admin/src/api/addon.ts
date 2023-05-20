import request from '@/utils/request'

/**
 * 本地下载的插件列表
 * @returns 
 */
export function getAddonLocal(params: Record<string, any>) {
    return request.get('addon/local', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 插件详情
 * @returns 
 */
export function getAddonDetial(id: number) {
    return request.get(`addon/${id}`)
}

/**
 * 安装插件
 * @param params
 * @returns
 */
export function installAddon(params: Record<string, any>) {
    return request.post(`addon/install/${params.addon}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 卸载插件
 * @param params 
 * @returns
 */
export function uninstallAddon(params: Record<string, any>) {
    return request.post(`addon/uninstall/${params.addon}`, params, { showErrorMessage: true, showSuccessMessage: true })
}