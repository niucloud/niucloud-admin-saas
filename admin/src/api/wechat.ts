import request from '@/utils/request'

/**
 * 获取微信配置
 * @returns 
 */
export function getWechatConfig() {
    return request.get('wechat/config')
}

/**
 * 微信配置所需的静态信息
 * @param uid 用户uid
 * @returns 
 */
export function getWechatStatic() {
    return request.get('wechat/static');
}

/**
 * 编辑微信配置
 * @param params 
 * @returns 
 */
export function editWechatConfig(params: Record<string, any>) {
    return request.put('wechat/config', params, { showSuccessMessage: true })
}

/**
 * 获取微信菜单
 * @returns 
 */
export function getWechatMenu() {
    return request.get('wechat/menu')
}

/**
 * 编辑微信菜单
 * @param params 
 * @returns 
 */
export function editWechatMenu(params: Record<string, any>) {
    return request.put('wechat/menu', params, { showSuccessMessage: true })
}

/**
 * 获取消息模板列表
 * @returns 
 */
export function getTemplateList() {
    return request.get('wechat/template')
}


/**
 * 获取同步
 * @param params 
 * @returns 
 */
export function getBatchAcquisition(params: Record<string, any>) {
    return request.put('wechat/template/sync', params, { showSuccessMessage: true })
}




