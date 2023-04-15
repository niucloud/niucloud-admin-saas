import request from '@/utils/request'

/***************************************************** 统计信息 **************************************************/
/**
 * 获取统计信息
 * @param params 
 * @returns 
 */
export function getStatInfo() {
    return request.get(`stat/index`)
}
/**
 * 获取站点统计信息
 * @param params 
 * @returns 
 */
export function getSiteStatInfo() {
    return request.get(`stat/siteindex`)
}

