import request from '@/utils/request'

/**
 * 本地下载的插件列表
 * @returns 
 */
export function getAddonLocal(params: Record<string, any>) {
    return request.get('addon/local', params, { showSuccessMessage: true })
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
    return request.post(`addon/install/${params.addon}`, params)
}

/**
 * 卸载插件
 * @param params 
 * @returns
 */
export function uninstallAddon(params: Record<string, any>) {
    return request.post(`addon/uninstall/${params.addon}`, params, { showSuccessMessage: true })
}

/**
 * 插件安装前检测
 * @param addon 
 * @returns 
 */
export function preInstallCheck(addon: string) {
    return request.get(`addon/install/check/${addon}`, { timeout: 30 * 1000 })
}

/**
 * 获取插件安装任务执行状态
 * @param addon 
 * @param key 
 * @returns 
 */
export function getAddonInstallTaskState(addon: string, key: string) {
    return request.get(`addon/install/${addon}/status/${key}`)
}

/**
 * 执行安装任务
 * @param params 
 * @returns 
 */
export function executeInstall(addon: string) {
    return request.post(`addon/install/execute/${addon}`, {})
}