import request from '@/utils/request'

/**
 * 登录
 * @param params 
 * @returns 
 */
export function login(params: Record<string, any>, app_type: string) {
    return request.get(`login/${app_type}`, { params })
}

/**
 * 获取登录用户权限
 * @returns 
 */
export function getAuthMenus() {
    return request.get('auth/authmenu')
}

/**
 * 获取登录用户权限
 * @returns 
 */
export function getSiteInfo() {
    return request.get('auth/site')
}

/**
 * 获取登录配置信息
 * @returns 
 */
export function getLoginConfig() {
    return request.get('login/config')
}