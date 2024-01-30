import request from '@/utils/request'

/***************************************************** 自定义页面 ****************************************************/

/**
 * 获取自定义页面分页列表
 * @param params
 * @returns
 */
export function getDiyPageList(params: Record<string, any>) {
    return request.get(`diy/diy`, {params})
}

/**
 * 获取自定义页面列表
 * @param params
 * @returns
 */
export function getDiyList(params: Record<string, any>) {
    return request.get(`diy/list`, {params})
}

/**
 * 获取自定义页面详情
 * @param id 自定义页面id
 * @returns
 */
export function getDiyPageInfo(id: number) {
    return request.get(`diy/diy/${id}`);
}

/**
 * 添加自定义页面
 * @param params
 * @returns
 */
export function addDiyPage(params: Record<string, any>) {
    return request.post('diy/diy', params, {showSuccessMessage: true})
}

/**
 * 编辑自定义页面
 * @param params
 */
export function editDiyPage(params: Record<string, any>) {
    return request.put(`diy/diy/${params.id}`, params, {showSuccessMessage: true})
}

/**
 * 设为使用
 * @param params
 */
export function setUseDiyPage(params: Record<string, any>) {
    return request.put(`diy/use`, params, {showSuccessMessage: true})
}

/**
 * 修改自定义页面分享内容
 * @param params
 */
export function editDiyPageShare(params: Record<string, any>) {
    return request.put(`diy/diy/share`, params, {showSuccessMessage: true})
}

/**
 * 删除自定义页面
 * @param id
 * @returns
 */
export function deleteDiyPage(id: number) {
    return request.delete(`diy/diy/${id}`, {showSuccessMessage: true})
}

/**
 * 获取自定义页面初始化数据
 */
export function initPage(params: Record<string, any>) {
    return request.get(`diy/init`, {params})
}

/**
 * 获取自定义链接列表
 */
export function getLink(params: Record<string, any>) {
    return request.get(`diy/link`, {params})
}

/**
 * 获取底部导航列表
 */
export function getDiyBottomList(params: Record<string, any>) {
    return request.get(`diy/bottom`, {params})
}

/**
 * 获取底部导航数据
 */
export function getDiyBottomConfig(params: Record<string, any>) {
    return request.get(`diy/bottom/config`, {params})
}

/**
 * 设置底部导航数据
 * @param params
 * @returns
 */
export function setDiyBottomConfig(params: Record<string, any>) {
    return request.post('diy/bottom', params, {showSuccessMessage: true})
}

/**
 * 获取页面模板类型
 */
export function getDiyTemplate(params: Record<string, any>) {
    return request.get(`diy/template`, {params})
}

/**
 * 获取模板页面列表
 */
export function getDiyTemplatePages(params: Record<string, any>) {
    return request.get(`diy/template/pages`, {params})
}

/**
 * 获取自定义路由列表
 * @param params
 * @returns
 */
export function getDiyRouteList(params: Record<string, any>) {
    return request.get(`diy/route`, {params})
}

/**
 * 获取路由列表（存在的应用插件列表）
 * @returns
 */
export function getDiyRouteAppList() {
    return request.get(`diy/route/apps`)
}

/**
 * 获取自定义路由信息
 * @param params
 */
export function getDiyRouteInfo(params: Record<string, any>) {
    return request.get(`diy/route/info`, {params});
}

/**
 * 修改路由页面分享内容
 * @param params
 */
export function editDiyRouteShare(params: Record<string, any>) {
    return request.put(`diy/route/share`, params, {showSuccessMessage: true})
}

/**
 * 获取自定义页面列表
 * @param params
 * @returns
 */
export function getDecoratePage(params: Record<string, any>) {
    return request.get(`diy/decorate`, {params})
}

/**
 * 切换模板
 * @param params
 * @returns
 */
export function changeTemplate(params: Record<string, any>) {
    return request.put(`diy/change`, params, {showSuccessMessage: true})
}

/**
 * 获取模板页面（存在的应用插件列表）
 * @param params
 * @returns
 */
export function getApps(params: Record<string, any>) {
    return request.get(`diy/apps`)
}