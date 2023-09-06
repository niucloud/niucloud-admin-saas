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
    return request.put('weapp/config', params, {showSuccessMessage: true})
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
    return request.put('weapp/template/sync', params, {showSuccessMessage: true})
}

/***************************************************** 管理端 ****************************************************/

/**
 * 上传文件
 * @param params
 * @returns
 */
export function uploadVersion(params: Record<string, any>) {
    return request.put('applet/upload', params, {showSuccessMessage: true})
}

/**
 * 添加版本
 * @param params
 * @returns
 */
export function addVersion(params: Record<string, any>) {
    return request.post('applet/version', params, {showSuccessMessage: true})
}

/**
 * 版本列表
 * @param params
 * @returns
 */
export function getVersionList(params: Record<string, any>) {
    return request.get('applet/version', {params})
}

/**
 * 版本详情
 * @param params
 * @returns
 */
export function getVersionInfo(id: string) {
    return request.get(`applet/version/${id}`)
}

/**
 * 编辑版本
 * @param params
 * @returns
 */
export function editVersion(params: Record<string, any>) {
    return request.put(`applet/version/${params.id}`, params, {showSuccessMessage: true})
}

/**
 * 版本删除
 * @param params
 * @returns
 */
export function deleteVersion(id: string) {
    return request.delete(`applet/version/${id}`)
}

/**
 * 版本下载
 * @param params
 * @returns
 */
export function versionDown(id: string) {
    return request.get(`applet/version/download/${id}`, { "responseType": "blob" })
}