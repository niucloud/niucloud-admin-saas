import request from '@/utils/request'

/**
 * 登录
 * @param params 
 * @returns 
 */
export function login(params: Record<string, any>) {
    return request.get('login', { params, showErrorMessage: true })
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