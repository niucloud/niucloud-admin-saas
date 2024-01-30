import request from '@/utils/request'

/***************************************************** 插件开发 ****************************************************/
/**
 * 获取插件列表
 * @returns
 */
export function getAddonDevelop(params: Record<string, any>) {
    return request.get(`addon_develop`, {params});
}

/**
 * 获取插件类型配置
 * @returns
 */
export function getAddontype() {
    return request.get(`addontype`);
}

/**
 * 获取插件详情
 * @returns
 */
export function getAddonDevelopInfo(key: any) {
    return request.get(`addon_develop/${key}`)
}

/**
 * 获取插件key是否存在
 * @returns
 */
export function getAddonDevelopCheck(key: any) {
    return request.get(`addon_develop/check/${key}`)
}

/**
 * 添加插件
 * @param key
 * @param params
 * @returns
 */
export function addAddonDevelop(key: any, params: Record<string, any>) {
    return request.post(`addon_develop/${key}`, params)
}

/**
 * 编辑插件
 * @param key
 * @param params
 * @returns
 */
export function editAddonDevelop(key: any, params: Record<string, any>) {
    return request.put(`addon_develop/${key}`, params)
}

/**
 * 删除插件
 * @param key
 * @returns
 */
export function deleteAddonDevelop(key: any) {
    return request.delete(`addon_develop/${key}`, {showSuccessMessage: true})
}

/**
 * 打包插件
 * @returns
 */
export function addonDevelopBuild(key: any) {
    return request.post(`addon_develop/build/${key}`)
}

/**
 * 下载插件
 * @returns
 */
export function addonDevelopDownload(key: any) {
    return request.post(`addon_develop/download/${key}`, {})
}
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
    return request.post('generator/generator', params, {showSuccessMessage: true})
}

/**
 * 编辑代码生成
 * @param params
 */
export function editGenerateTable(params: Record<string, any>) {
    return request.put(`generator/generator/${params.id}`, params, {showSuccessMessage: true})
}

/**
 * 删除代码生成
 * @param id
 * @returns
 */
export function deleteGenerateTable(id: number) {
    return request.delete(`generator/generator/${id}`, {showSuccessMessage: true})
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
 * 代码生成预览
 * @param id
 * @returns
 */
export function generatePreview(id: number) {
    return request.get(`generator/preview/${id}`)
}

/**
 * 数据表
 */
export function generateTable() {
    return request.get(`generator/table`)
}

/**
 * 获取服务器环境配置
 */
export function getSystem() {
    return request.get(`sys/system`)
}

/**
 * 获取全部模型
 */
export function getGeneratorAllModel(params: any) {
    return request.get(`generator/all_model`, {params})
}

/**
 * 获取 表字段
 */
export function getGeneratorTableColumn(params: any) {
    return request.get(`generator/table_column`, {params})
}

/**
 * 同步校验
 */
export function generatorCheckFile(params: Record<string, any>) {
    return request.get(`generator/check_file`, {params})
}

/**
 * 根据模型获取表字段
 */
export function getGeneratorModelTableColumn(params: any) {
    return request.get(`generator/model_table_column`, {params})
}
