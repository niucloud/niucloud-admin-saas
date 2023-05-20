import request from '@/utils/request'

//当前接口用户指系统整体用户管理，站内用户添加，编辑，详情，操作日志，请查看站点内部相关接口

/***************************************************** 用户 ****************************************************/

/**
 * 获取用户列表
 * @param params 
 * @returns 
 */
export function getUserList(params: Record<string, any>) {
    return request.get(`user/user`, { params })
}

/**
 * 获取用户详情
 * @param uid 用户uid
 * @returns 
 */
export function getUserInfo(uid: number) {
    return request.get(`user/user/${uid}`);
}

/**
 * 添加用户
 * @param params 
 * @returns 
 */
export function addUser(params: Record<string, any>) {
    return request.post('user/user', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 更新用户
 * @param id 
 * @param params 
 * @returns 
 */
export function editUser(params: Record<string, any>) {
    return request.put(`user/user/${params.uid}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

