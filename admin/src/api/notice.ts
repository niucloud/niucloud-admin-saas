import request from '@/utils/request'

/***************************************************** 消息管理 ****************************************************/

/**
 * 消息列表
 * @returns 
 */
export function getNoticeList() {
    return request.get('notice/notice')
}

/**
 * 消息详情
 * @param params 
 * @returns 
 */
export function getNoticeInfo(key: string) {
    return request.get(`notice/notice/${key}`)
}

/**
 * 消息发送记录
 * @param params 
 * @returns 
 */
export function getNoticeLog(params: any) {
    return request.get(`notice/log`, { params })
}


/**
 * 消息启动与关闭
 * @param params 
 * @returns 
 */
export function editNoticeStatus(params: Record<string, any>) {
    return request.post(`notice/notice/editstatus`, params, { showSuccessMessage: true })
}

/**
 * 消息修改
 * @param params 
 * @returns 
 */
export function editNotice(params: Record<string, any>) {
    return request.post(`notice/notice/edit`, params, { showSuccessMessage: true })
}

/**
 * 短信配置列表
 * @returns 
 */
export function getSmsList() {
    return request.get('notice/notice/sms')
}

/**
 * 短信配置详情
 * @param sms_type 
 * @returns 
 */
export function getSmsInfo(sms_type: string) {
    return request.get(`notice/notice/sms/${sms_type}`,)
}

/**
 * 短信配置修改
 * @param sms_type 
 * @param params 
 * @returns 
 */
export function editSms(params: Record<string, any>) {
    return request.put(`notice/notice/sms/${params.sms_type}`, params, { showSuccessMessage: true })
}

/**
 * 短信发送记录
 * @param sms_type 
 * @param params 
 * @returns 
 */
export function getSmsLog(params: Record<string, any>) {
    return request.get(`notice/sms/log`, params)
}
