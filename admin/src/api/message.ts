import request from '@/utils/request'
 
/***************************************************** 消息管理 ****************************************************/

/**
 * 消息列表
 * @returns 
 */
export function getMessageList() {
    return request.get('message/message')
}

/**
 * 消息详情
 * @param params 
 * @returns 
 */
export function getMessageInfo(key: string) {
    return request.get(`message/message/${key}`)
}

/**
 * 消息发送记录
 * @param params 
 * @returns 
 */
export function getMessageLog(params: any) {
    return request.get(`message/log`, { params })
}


/**
 * 消息启动与关闭
 * @param params 
 * @returns 
 */
export function updateMessageStatus(params: Record<string, any>) {
    return request.post(`message/message/updatestatus`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 消息修改
 * @param params 
 * @returns 
 */
export function updateMessage(params: Record<string, any>) {
    return request.post(`message/message/update`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 短信配置列表
 * @returns 
 */
export function getSmsList() {
    return request.get('message/message/sms')
}

/**
 * 短信配置详情
 * @param sms_type 
 * @returns 
 */
export function getSmsInfo(sms_type: string) {
    return request.get(`message/message/sms/${sms_type}`,)
}

/**
 * 短信配置修改
 * @param sms_type 
 * @param params 
 * @returns 
 */
export function updateSms(params: Record<string, any>) {
    return request.put(`message/message/sms/${params.sms_type}`, params, { showErrorMessage: true, showSuccessMessage: true })
}
