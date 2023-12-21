import request from '@/utils/request'

/**
 * 获取授权信息
 */
export function getAuthinfo() {
    return request.get('niucloud/authinfo', { showErrorMessage: false })
}

/**
 * 设置 授权配置
 */
export function setAuthinfo(params: Record<string, any>) {
    return request.post('niucloud/authinfo', params, {showSuccessMessage: true})
}

/**
 * 获取 授权配置
 */
export function getAdminAuthinfo() {
    return request.get('niucloud/admin/authinfo')
}



/**
 * 获取授权插件列表
 * @returns
 */
export function getModule() {
    return request.get('niucloud/module')
}

/**
 * 获取插件版本
 * @param params
 * @returns
 */
export function getModuleVersion() {
    return request.get(`niucloud/module`)
}

/**
 * 下载版本
 * @param params
 * @returns
 */
export function downloadVersion(params: Record<string, any>) {
    return request.post(`addon/download/${params.addon}`, params, { showSuccessMessage: true })
}

/**
 * 获取框架最新版本
 * @param params
 * @returns
 */
export function getFrameworkNewVersion() {
    return request.get(`niucloud/framework/newversion`)
}
