import request from '@/utils/request'

//包含站点管理，站点用户管理，站点操作日志

/***************************************************** 站点管理 ****************************************************/

/**
 * 获取站点列表
 * @param params
 * @returns
 */
export function getSiteList(params: Record<string, any>) {
    return request.get(`site/site`, {params})
}

/**
 * 获取站点详情
 * @param site_id
 */
export function getSiteInfo(site_id: number) {
    return request.get(`site/site/${site_id}`);
}

/**
 * 添加站点
 * @param params
 * @returns
 */
export function addSite(params: Record<string, any>) {
    return request.post('site/site', params, {showSuccessMessage: true})
}

/**
 * 更新站点
 * @param params
 */
export function editSite(params: Record<string, any>) {
    return request.put(`site/site/${params.site_id}`, params, {showSuccessMessage: true})
}

/**
 * 关闭站点
 * @param params
 */
export function closeSite(params: Record<string, any>) {
    return request.put(`site/closesite/${params.site_id}`, params, {showSuccessMessage: true})
}

/**
 * 打开站点
 * @param params
 */
export function openSite(params: Record<string, any>) {
    return request.put(`site/opensite/${params.site_id}`, params, {showSuccessMessage: true})
}

/**
 * 获取全部站点状态
 */
export function getStatusList() {
    return request.get(`site/statuslist`)
}


/***************************************************** 站点分组管理 ****************************************************/

/**
 * 获取站点分组列表
 * @param params
 * @returns
 */
export function getSiteGroupList(params: Record<string, any>) {
    return request.get(`site/group`, {params})
}

/**
 * 获取站点分组详情
 * @param site_id
 */
export function getSiteGroupInfo(site_id: number) {
    return request.get(`site/group/${site_id}`);
}

/**
 * 添加站点分组
 * @param params
 * @returns
 */
export function addSiteGroup(params: Record<string, any>) {
    return request.post('site/group', params, {showSuccessMessage: true})
}

/**
 * 更新站点分组
 * @param params
 */
export function editSiteGroup(params: Record<string, any>) {
    return request.put(`site/group/${params.group_id}`, params, {showSuccessMessage: true})
}

/**
 * 删除站点分组
 * @param group_id
 */
export function deleteSiteGroup(group_id: number) {
    return request.delete(`site/group/${group_id}`, {showSuccessMessage: true});
}

/**
 * 获取全部站点分组
 * @param params
 * @returns
 */
export function getSiteGroupAll(params: Record<string, any>) {
    return request.get(`site/group/all`, params)
}

/***************************************************** 当前站点用户 *************************************************/

/**
 * 获取站点用户列表
 * @param params
 * @returns
 */
export function getUserList(params: Record<string, any>) {
    return request.get(`site/user`, {params})
}

/**
 * 获取站点用户详情
 * @param uid
 */
export function getUserInfo(uid: number) {
    return request.get(`site/user/${uid}`);
}

/**
 * 添加用户
 * @param params
 * @returns
 */
export function addUser(params: Record<string, any>) {
    return request.post('site/user', params, {showSuccessMessage: true})
}

/**
 * 编辑用户
 * @param params
 */
export function editUser(params: Record<string, any>) {
    return request.put(`site/user/${params.uid}`, params, {showSuccessMessage: true})
}

/**
 * 删除用户
 * @param uid
 * @returns
 */
export function deleteUser(uid: number) {
    return request.delete(`site/user/${uid}`, {showSuccessMessage: true})
}


/**
 * 锁定用户
 * @param uid
 * @returns
 */
export function lockUser(uid: number) {
    return request.put(`site/user/lock/${uid}`)
}


/**
 * 解锁用户
 * @param uid
 * @returns
 */
export function unlockUser(uid: number) {
    return request.put(`site/user/unlock/${uid}`)
}


/***************************************************** 操作日志 **************************************************/

/**
 * 获取操作日志列表
 * @param params
 * @returns
 */
export function getLogList(params: Record<string, any>) {
    return request.get(`site/log`, {params})
}

/**
 * 获取操作日志详情
 * @param id
 */
export function getLogInfo(id: number) {
    return request.get(`site/log/${id}`)
}

/***************************************************** 账单列表 **************************************************/

/**
 * 获取账单列表
 * @param params
 * @returns
 */
export function getAccountList(params: Record<string, any>) {
    return request.get(`site/account`, {params})
}

/**
 * 获取账单详情
 * @param id
 */
export function getAccountInfo(id: number) {
    return request.get(`site/account/${id}`)
}

/**
 * 获取账单统计
 * @returns
 */
export function getAccountStat() {
    return request.get(`site/account/stat`)
}

/**
 * 获取账单类型
 * @returns
 */
export function getAccountType() {
    return request.get(`site/account/type`)
}