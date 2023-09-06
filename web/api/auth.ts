/**
 * 用户名登录
 */
export function usernameLogin(data: AnyObject) {
    return request.get('login', data)
}

/**
 * 手机验证码登录
 */
export function mobileLogin(data: AnyObject) {
    return request.post('login/mobile', data)
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
export function usernameRegister(data: AnyObject) {
    let url = 'register'
    data.pid && (url += `?pid=${data.pid}`)
    return request.post(url, data)
}

/**
 * 手机号注册
 */
export function mobileRegister(data: AnyObject) {
    let url = 'register/mobile'
    data.pid && (url += `?pid=${data.pid}`)
    return request.post(url, data)
}

/**
 * 微信公众号授权登录
 */
export function wechatLogin(data: AnyObject) {
    return request.post('wechat/login', data)
}

/**
 * 微信公众号授权登录
 */
export function weappLogin(data: AnyObject) {
    return request.post('weapp/login', data)
}

/**
 * 绑定手机号
 */
export function bind(data: AnyObject) {
    let url = 'bind'
    data.pid && (url += `?pid=${data.pid}`)
    return request.post(url, data)
}

/**
 * 扫码登录
 */
export function scanlogin() {
    return request.post('wechat/scanlogin')
}

/**
 * 校验扫码信息
 */
export function checkscan(data: AnyObject) {
    return request.get('checkscan', data)
}