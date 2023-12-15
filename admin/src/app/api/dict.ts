import request from '@/utils/request'

/**
 * 获取数据字典列表
 * @param params
 * @returns
 */
export function getDictList(params: Record<string, any>) {
    return request.get(`dict/dict`, {params})
}

/**
 * 获取数据字典详情
 * @param id 数据字典id
 * @returns
 */
export function getDictInfo(id: number) {
    return request.get(`dict/dict/${id}`);
}

/**
 * 添加数据字典
 * @param params
 * @returns
 */
export function addDict(params: Record<string, any>) {
    return request.post('dict/dict', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑数据字典
 * @param params
 * @returns
 */
export function addDictData(params: Record<string, any>) {
    return request.put(`dict/dict/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑数据字典
 * @param params
 * @returns
 */
export function editDict(params: Record<string, any>) {
    return request.put(`dict/dict/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除数据字典
 * @param id
 * @returns
 */
export function deleteDict(id: number) {
    return request.delete(`dict/dict/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}
/**
 * 编辑数据字典内容
 * @param id
 * @param params
 * @returns
 */
export function setDictData(id:number,params: Record<string, any>) {
    return request.put(`dict/dictionary/${id}`, params, { showErrorMessage: true,showSuccessMessage: true })
}
/**
 * 获取数据字典列表全部
 * @returns
 */
export function getDictAll() {
    return request.get(`dict/all`)
}

/**
 * 数据字典关键词查询
 * @param type
 * @returns
 */
export function useDictionary(type: string) {
    return request.get(`dict/dictionary/type/${type}`)
}

