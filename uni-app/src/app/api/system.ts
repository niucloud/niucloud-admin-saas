import request from '@/utils/request'

/**
 * 获取验证码
 */
export function getCaptcha() {
    return request.get('captcha', {}, { showErrorMessage: true })
}

/**
 * 获取微信公众号授权码
 */
export function getWechatAuthCode(data : AnyObject) {
    return request.get('wechat/codeurl', data, { showErrorMessage: false })
}

/**
 * 同步微信信息
 */
export function wechatSync(data : AnyObject) {
    return request.post('wechat/sync', data)
}

/**
 * 获取协议信息
 */
export function getAgreementInfo(key : string) {
    return request.get(`agreement/${key}`)
}

/**
 * 重置密码
 */
export function resetPassword(data : AnyObject) {
    return request.post(`password/reset`, data, { showErrorMessage: true })
}

/**
 * 发送短信验证码
 */
export function sendSms(data : AnyObject) {
    return request.post(`send/mobile/${data.type}`, data, { showErrorMessage: true })
}

/**
 * 获取微信jssdk config
 */
export function getWechatSkdConfig(data : AnyObject) {
    return request.get('wechat/jssdkconfig', data, { showErrorMessage: false })
}

/**
 * 上传图片
 */
export function uploadImage(data : AnyObject) {
    return request.upload('file/image', data, { showErrorMessage: true })
}

/**
 * 拉取图片
 */
export function fetchImage(data : AnyObject) {
    return request.post('file/image/fetch', data)
}

/**
 * 拉取base64图片
 */
export function fetchBase64Image(data : AnyObject) {
    return request.post('file/image/base64', data)
}

/**
 * 获取站点信息
 */
export function getSiteInfo() {
    return request.get('site')
}

/**
 * 获取微信小程序订阅消息模板id
 */
export function getWeappTemplateId(keys: string) {
    return request.get('weapp/subscribemsg', { keys })
}

/**
 * 获取下级地址列表
 * @param pid
 */
export function getAreaListByPid(pid: number = 0) {
    return request.get(`area/list_by_pid/${pid}`)
}

/**
 * 获取地址树列表
 * @param level
 */
export function getAreatree(level: number = 1) {
    return request.get(`area/tree/${level}`)
}

/**
 * 获取地址
 * @param code
 */
export function getAreaByCode(code: number | string) {
    return request.get(`area/code/${code}`)
}

/**
 * 获取手机端首页列表
 */
export function getWapIndexList(data : AnyObject) {
    return request.get('wap_index', data)
}
