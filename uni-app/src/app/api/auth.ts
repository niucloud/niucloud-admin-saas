import request from '@/utils/request'

/**
 * 用户名登录
 */
export function usernameLogin(data : AnyObject) {
    return request.get('login', data, { showErrorMessage: true })
}

/**
 * 手机验证码登录
 */
export function mobileLogin(data : AnyObject) {
    return request.post('login/mobile', data, { showErrorMessage: true })
}

/**
 * 获取登录配置
 */
export function getConfig() {
    return request.get('login/config')
}

/**
 * 退出登录
 */
export function logout() {
    return request.put('auth/logout')
}

/**
 * 用户名注册
 */
export function usernameRegister(data : AnyObject) {
    let url = 'register'
    data.pid && (url += `?pid=${data.pid}`)
    return request.post(url, data, { showErrorMessage: true })
}

/**
 * 手机号注册
 */
export function mobileRegister(data : AnyObject) {
    let url = 'register/mobile'
    data.pid && (url += `?pid=${data.pid}`)
    return request.post(url, data, { showErrorMessage: true })
}

/**
 * 微信公众号授权登录
 */
export function wechatLogin(data : AnyObject) {
    return request.post('wechat/login', data, { showErrorMessage: false })
}

/**
 * 微信公众号授权登录
 */
export function weappLogin(data : AnyObject) {
    return request.post('weapp/login', data, { showErrorMessage: false })
}

/**
 * 绑定手机号
 */
export function bind(data : AnyObject) {
    let url = 'bind'
    data.pid && (url += `?pid=${data.pid}`)
    return request.post(url, data, { showErrorMessage: true })
}

/**
 * 记录会员访问日志
 */
export function memberLog(data : AnyObject) {
    return request.post('member/log', data, { showErrorMessage: false })
}
