import request from '@/utils/request'

/**
 * 登录
 * @param params
 * @param app_type
 */
export function login(params: Record<string, any>, app_type: string) {
    return request.get(`login/${app_type}`, {params})
}

/**
 * 退出登录
 */
export function logout() {
    return request.put('auth/logout', {}, { showErrorMessage: false })
}

/**
 * 获取登录用户权限
 * @returns
 */
export function getAuthMenus(params: Record<string, any>) {
    return request.get('auth/authmenu', {params})
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

/**
 * 获取当前版本信息
 */
export function getVersions() {
    return request.get(`sys/info`)
}
