import request from '@/utils/request'

/***************************************************** 代码生成 ****************************************************/

/**
 * 获取代码生成列表
 * @param params
 * @returns
 */
export function getGenerateTableList(params: Record<string, any>) {
    return request.get(`generator/generator`, {params})
}

/**
 * 获取代码生成详情
 * @param id 代码生成id
 * @returns
 */
export function getGenerateTableInfo(id: number) {
    return request.get(`generator/generator/${id}`);
}

/**
 * 添加代码生成
 * @param params
 * @returns
 */
export function addGenerateTable(params: Record<string, any>) {
    return request.post('generator/generator', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑代码生成
 * @param id
 * @param params
 * @returns
 */
export function updateGenerateTable(params: Record<string, any>) {
    return request.put(`generator/generator/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除代码生成
 * @param id
 * @returns
 */
export function deleteGenerateTable(id: number) {
    return request.delete(`generator/generator/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 代码生成
 * @param params
 * @returns
 */
export function generateCreate(params: Record<string, any>) {
    return request.post(`generator/download`, params)
}

/**
 * 数据表
 * @param file
 * @returns
 */
export function generateTable() {
    return request.get(`generator/table`)
}

